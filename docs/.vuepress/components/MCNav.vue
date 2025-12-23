<template>
  <div class="mc-nav">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">加载失败: {{ error }}</div>
    
    <!-- 菜单浮窗 - 参考TocFloat.vue设计 -->
    <div v-else class="nav-float" :class="{ 'nav-collapsed': isMenuCollapsed }">
      <!-- 折叠/展开按钮 -->
      <div class="nav-toggle" @click="toggleMenuCollapse">
        <span class="toggle-icon">{{ isMenuCollapsed ? '▶' : '▼' }}</span>
        <span class="toggle-text">{{ isMenuCollapsed ? '导航' : '隐藏' }}</span>
      </div>
      
      <!-- 菜单内容 -->
      <div v-show="!isMenuCollapsed" class="nav-content">
        <div class="nav-header">
          <h4 class="nav-title">Minecraft 导航</h4>
        </div>
        
        <!-- 分类菜单栏 -->
        <div class="category-menu">
          <div class="menu-grid">
            <button
              v-for="categoryName in visibleCategories"
              :key="categoryName"
              :class="['menu-item', { active: activeCategory === categoryName }]"
              @click="switchCategory(categoryName)"
            >
              {{ formatCategoryName(categoryName) }}
              <span class="item-count" v-if="getCategoryItemCount(categoryName) > 0">
                {{ getCategoryItemCount(categoryName) }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 当前分类内容 -->
      <div v-if="activeCategory" class="category-content">
        <!-- 分类标题 -->
        <h2 class="category-title">
          {{ formatCategoryName(activeCategory) }}
          <span class="total-count">(共 {{ getCategoryItemCount(activeCategory) }} 项)</span>
        </h2>

        <!-- 项目列表 -->
        <div v-if="hasValidItems(currentCategoryData)" class="items-container">
          <!-- 项目网格 -->
          <div class="items-grid">
            <div
              v-for="(item, index) in validItems"
              :key="`${activeCategory}-${index}`"
              class="item"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <a 
                v-if="item.name && item.link" 
                href="javascript:void(0)" 
                @click="showLinkConfirmation(item, activeCategory)"
                class="link"
              >
                <!-- 图标显示 -->
                <div class="item-icon-container">
                  <img 
                    v-if="item.icon && isVisible[`${activeCategory}-${index}`]" 
                    :src="item.icon" 
                    :alt="item.name + ' 图标'"
                    class="item-icon"
                    @error="handleIconError"
                    @load="handleIconLoad"
                  />
                  <img 
                    v-else-if="!item.icon" 
                    src="/api/img/logo.svg" 
                    :alt="'默认图标'"
                    class="item-icon default-icon"
                  />
                  <div v-else class="icon-placeholder"></div>
                </div>
                <div class="item-content">
                  <span class="item-name">{{ truncateText(item.name, 14) }}</span>
                  <span v-if="item.abstract" class="item-abstract">
                    {{ truncateText(item.abstract, 16) }}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- 无数据提示 -->
        <div v-else class="no-items">
          该分类暂无数据
        </div>
      </div>

      <!-- 无分类数据提示 -->
      <div v-else-if="Object.keys(navData).length === 0" class="no-categories">
        暂无分类数据
      </div>
    </div>

    <!-- 自定义确认对话框 -->
    <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-content" @click.stop>
        <div class="dialog-header">
          <h4 class="dialog-title">网址跳转确认</h4>
        </div>
        <div class="dialog-body">
          <div class="info-item">
            <strong>类别：</strong>
            <span class="no-select">{{ formatCategoryName(currentCategory) }}</span>
          </div>
          <div class="info-item">
            <strong>名称：</strong>
            <span class="no-select">{{ currentItem.name }}</span>
          </div>
          <div class="info-item" v-if="currentItem.abstract">
            <strong>介绍：</strong>
            <span class="no-select">{{ currentItem.abstract }}</span>
          </div>
          <div class="info-item">
            <strong>网址：</strong>
            <span class="no-select link-text">{{ currentItem.link }}</span>
          </div>
          <div class="warning-text no-select">
            您正在尝试访问外部网站，是否确认跳转？
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn btn-confirm" @click="confirmRedirect">确认</button>
          <button class="btn btn-cancel" @click="closeDialog">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MCNav',
  data() {
    return {
      navData: {},
      loading: true,
      error: null,
      showDialog: false,
      currentItem: null,
      currentCategory: null,
      isVisible: {},
      observer: null,
      // 添加缺失的折叠功能相关属性
      isMenuCollapsed: false,
      itemsPerRow: 0
    }
  },
  computed: {
    // 当前分类的数据
    currentCategoryData() {
      return this.activeCategory ? this.navData[this.activeCategory] : []
    },
    
    // 当前分类的有效项目
    validItems() {
      if (!Array.isArray(this.currentCategoryData)) return []
      return this.currentCategoryData.filter(item => 
item && item.name && item.link && item.name.trim() !== '' && item.link.trim() !== ''
      )
    },
    
    // 当前激活的分类
    activeCategory() {
      return this.currentCategory || (Object.keys(this.navData).length > 0 ? Object.keys(this.navData)[0] : null)
    },
// 是否显示折叠按钮（当分类数量超过一行时显示）
    shouldShowCollapse() {
      return Object.keys(this.navData).length > this.itemsPerRow
    },
    
    // 可见的分类（折叠时只显示第一行）
    visibleCategories() {
      const allCategories = Object.keys(this.navData)
      if (this.isMenuCollapsed) {
        // 折叠时只显示第一行的分类
        return allCategories.slice(0, this.itemsPerRow)
      }
      return allCategories
    }
  },
  watch: {
    // 当切换分类时重置页码（移除分页相关逻辑）
    activeCategory() {
      this.$nextTick(() => {
        this.setupLazyLoading()
      })
    }
  },
  async mounted() {
    await this.loadNavData()
    this.$nextTick(() => {
      this.setupLazyLoading()
    })
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    // 切换菜单折叠状态
    toggleMenuCollapse() {
      this.isMenuCollapsed = !this.isMenuCollapsed
    },
    
    // 处理图标加载完成
    handleIconLoad(event) {
      // 图标加载完成后的处理
      event.target.classList.remove('loading')
    },
    
    // 处理图标加载错误
    handleIconError(event) {
      console.warn('图标加载失败:', event.target.src)
      event.target.src = '/api/img/logo.svg'
      event.target.classList.add('default-icon')
      event.target.classList.remove('loading')
    },
    
    // 切换分类
    switchCategory(categoryName) {
      this.currentCategory = categoryName
    },
    
    // 获取分类项目数量
    getCategoryItemCount(categoryName) {
      const category = this.navData[categoryName]
      if (!Array.isArray(category)) return 0
      return category.filter(item => 
        item && item.name && item.link && item.name.trim() !== '' && item.link.trim() !== ''
      ).length
    },
    
    // 移除分页导航方法
    // 设置懒加载
    setupLazyLoading() {
      if (this.observer) {
        this.observer.disconnect()
      }
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const key = entry.target.dataset.key
            this.$set(this.isVisible, key, true)
            this.observer.unobserve(entry.target)
          }
        })
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      })

      this.$nextTick(() => {
        const items = this.$el.querySelectorAll('.item')
        items.forEach((item, index) => {
          const key = `${this.activeCategory}-${index}`
          item.dataset.key = key
          this.observer.observe(item)
        })
      })
    },
    
    // 显示链接确认对话框
    showLinkConfirmation(item, categoryName) {
      this.currentItem = item
      this.currentCategory = categoryName
      this.showDialog = true
    },
    
    // 关闭对话框
    closeDialog() {
      this.showDialog = false
      this.currentItem = null
      // this.currentCategory = null
    },
    
    // 确认跳转
    confirmRedirect() {
      if (this.currentItem && this.currentItem.link) {
        window.open(this.currentItem.link, '_blank', 'noopener,noreferrer')
      }
      this.closeDialog()
    },
    
    async loadNavData() {
      try {
        this.loading = true
        this.error = null
        
        const response = await fetch('/api/data/McNav.json')
if (!response.ok) {
throw new Error(`HTTP错误: ${response.status}`)
        }
        
        const jsonData = await response.json()
        
        if (!jsonData || !jsonData['mc-nav']) {
          throw new Error('JSON文件格式不正确或缺少mc-nav数据')
        }
        
        this.navData = jsonData['mc-nav']
        this.loading = false
        
      } catch (error) {
        console.error('加载导航数据失败:', error)
        this.error = `无法加载JSON文件: ${error.message}`
        this.loading = false
        this.navData = {}
}
    },

    // 截断文本
    truncateText(text, maxLength) {
      if (!text || this.calcTextLength(text) <= maxLength) {
        return text
      }
      
      let length = 0
      let result = ''
      
      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        if (/[a-zA-Z0-9]/.test(char) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(char)) {
          length += 0.5
        } else {
length += 1
        }
        
        if (length <= maxLength) {
          result += char
        } else {
          break
        }
      }
      
      return result + '...'
    },

    // 计算文本长度
    calcTextLength(text) {
      let length = 0
      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        if (/[a-zA-Z0-9]/.test(char) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(char)) {
          length += 0.5
        } else {
          length += 1
        }
      }
      return length
    },
    
    // 生成ID
    generateId(categoryName) {
      const idMap = {
        'official': '官方网站',
        'community': '社区论坛',
        'encyclopedia': '百科wiki',
        'tools': '在线工具',
        'software': '实用软件',
        'panel': '面板',
        'launcher': '启动器',
        'servers': '服务端',
        'resources': '资源',
        'studio': '工作室',
        'hacker-client': '黑客端',
        'server-portal': '服务器门户',
        'server': '服务器'
      }
      return idMap[categoryName] || this.slugify(categoryName)
    },
    
    // 转换为URL友好格式
    slugify(text) {
return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    },
    
    // 格式化分类名称
    formatCategoryName(categoryName) {
      const nameMap = {
        'official': '官方网站',
        'community': '社区论坛',
        'encyclopedia': '百科wiki',
        'tools': '在线工具',
        'software': '实用软件',
        'panel': '面板',
        'launcher': '启动器',
        'servers': '服务端',
        'resources': '资源',
        'studio': '工作室',
        'hacker-client': '黑客端',
        'server-portal': '服务器门户',
        'server': '服务器'
      }
      return nameMap[categoryName] || categoryName
    },
    
    // 检查是否有有效项目
    hasValidItems(category) {
      return Array.isArray(category) && category.some(item => 
        item && item.name && item.link && item.name.trim() !== '' && item.link.trim() !== ''
      )
    }
  }
}
</script>

<style scoped lang="stylus">
// 颜色变量定义
$primary = #007acc
$primary-light = #007acc24
$primary-medium = #007accaa
$primary-hover = #007aff
$primary-hover-light = #007aff44
$text-highlight = #0099ff
$gray-text = #666
$gray-light = #999
$link-text = #aaa
$error-red = #ff4444
$border = #5a5a5a5a
$bg-dark = #161b2224
$warning-bg = #007affaa
$warning-text = #efefef
$btn-gray = #6c757d
$text-light = #efefef
$text-medium = #007acc
$menu-bg = #1e1e1e66
$menu-border = #333
$menu-hover = #2a2a2a

.mc-nav
  max-width 100%
  margin 0 auto

// 导航浮窗样式 - 参考TocFloat.vue设计
.nav-float
  position fixed
  top 80px
  right 40px
  width 260px
  max-height calc(100vh - 180px)
  background #161b2224
  border 1px solid $border
  border-radius 8px
  box-shadow 0 4px 16px rgba(0, 0, 0, 0.2)
  z-index 1000
  transition all 0.3s ease
  overflow hidden
  backdrop-filter blur(10px)
  
  &.nav-collapsed
    width 100px
    
    .nav-content
      display none

.nav-toggle
  display flex
  align-items center
  padding 12px 16px
  background $primary-light
  cursor pointer
  user-select none
  transition background-color 0.2s ease
  
  &:hover
    background $primary-hover-light
  
  .toggle-icon
    font-size 12px
    margin-right 8px
    color $primary
    font-weight bold
  
  .toggle-text
    font-size 14px
    color $text-light
    font-weight 500

.nav-content
  max-height calc(100vh - 250px)
  overflow-y auto
  
  &::-webkit-scrollbar
    width 4px
  
  &::-webkit-scrollbar-track
    background transparent
  
  &::-webkit-scrollbar-thumb
    background $border
    border-radius 2px

.nav-header
  display flex
  justify-content space-between
  align-items center
  padding 16px 16px 12px
  border-bottom 1px solid $border
  
  .nav-title
    margin 0
    font-size 16px
    font-weight 600
    color $text-light
// 分类菜单栏样式 - 修改为浮窗内布局
.category-menu
  background transparent
  border-radius 0
  padding 15px
  border none
  transition all 0.3s ease
  position relative
  
  &.collapsed
    max-height 120px
    overflow hidden

.menu-grid
  display grid
  grid-template-columns 1fr
  gap 8px
  justify-items stretch

// 折叠按钮容器
.collapse-container
  display flex
  justify-content center
  margin-top 15px
  padding-top 15px
  border-top 1px solid rgba(255, 255, 255, 0.1)
  position relative
  z-index 10

.collapse-btn
  background rgba(255, 255, 255, 0.1)
  border 1px solid rgba(255, 255, 255, 0.2)
  border-radius 20px
  color $text-light
  padding 8px 16px
  cursor pointer
  display flex
  align-items center
  gap 8px
  transition all 0.3s ease
  font-size 0.9em
  position relative
  z-index 20

  &:hover
    background rgba(255, 255, 255, 0.2)
    border-color $primary
    color $text-highlight

.collapse-text
  font-weight 500

.collapse-icon
  transition transform 0.3s ease
  font-size 0.8em

  &.rotated
    transform rotate(180deg)

.menu-item
  padding 12px 16px
  background transparent
  border 1px solid rgba(255, 255, 255, 0.1)
  border-radius 6px
  color $text-light
  cursor pointer
  transition all 0.3s ease
  display flex
  align-items center
  justify-content space-between
  font-size 0.95em
  text-align left
  min-height 44px

  &:hover
    background rgba(255, 255, 255, 0.1)
    border-color $primary
    color $text-highlight
    transform translateY(-1px)
    box-shadow 0 4px 12px rgba(0, 122, 204, 0.2)

  &.active
    background $primary
    border-color $primary
    color white
    box-shadow 0 4px 16px rgba(0, 122, 204, 0.3)

.item-count
  background rgba(255, 255, 255, 0.2)
  border-radius 12px
  padding 4px 8px
  font-size 0.8em
  font-weight 600
  min-width 24px
  text-align center
  transition all 0.3s ease

.menu-item.active .item-count
  background rgba(255, 255, 255, 0.3)
  border-radius 10px
  padding 2px 6px
  font-size 0.8em
  min-width 20px
  text-align center

// 主要内容区域
.main-content
  margin-right 360px // 为浮窗留出空间
  padding-top 20px

// 加载和错误状态样式
.loading, .error
  text-align center
  padding 40px 20px
  font-size 1.1em
  color $text-light
  background rgba(0, 0, 0, 0.1)
  border-radius 8px
  margin 20px

.error
  color $error-red
  background rgba(255, 0, 0, 0.1)

// 无数据提示样式
.no-items, .no-categories
  text-align center
  padding 40px 20px
  color $gray-light
  font-size 1em
  background rgba(0, 0, 0, 0.05)
  border-radius 8px
  margin 20px 0

// 分类内容区域
.category-content
  flex 1
.category-title
  font-size 1.3em
  font-weight bold
  margin-bottom 20px
  padding-bottom 10px
  border-bottom 2px solid $primary
  display flex
  align-items center
  gap 10px

.total-count
  font-size 0.8em
  color $gray-light
  font-weight normal

// 项目容器
.items-container
  width 110%
  display flex
  flex-direction column
  gap 20px

.items-grid
  display grid
  grid-template-columns repeat(auto-fill, minmax(300px, 1fr))
  gap 20px
  max-width 100%

.item
  background-color $primary-light
  border-left 0.2rem solid $primary-medium
  transition all 0.3s ease
  animation fadeInUp 0.6s ease-out forwards
  opacity 0
  transform translateY(20px)

.item:hover
  background-color $primary-hover-light
  border-left 0.2rem solid $primary-hover
  transition all 0.5s ease
  transform translateY(-2px)
  box-shadow 0 8px 25px rgba(0, 122, 204, 0.15)

.item:hover .item-name
  color $text-highlight

.link
  display flex
  align-items center
  padding 15px
  text-decoration none
  color transparent
  transition all 0.3s ease
  position relative
  overflow hidden

// 图标容器样式
.item-icon-container
  flex-shrink 0
  margin-right 12px
  display flex
  align-items center
  justify-content center
  position relative

.item-icon
  width 36px
  height 36px
  object-fit contain
  border-radius 3px
  border 1px solid $border
  background $bg-dark
  transition all 0.3s ease
  animation iconBounce 0.8s ease-out

  // 图标加载时的旋转动画
  &.loading
    animation iconSpin 1s linear infinite

.icon-placeholder
  width 24px
  height 24px
  border-radius 4px
  background linear-gradient(45deg, $primary-light, transparent)
  animation pulse 1.5s ease-in-out infinite

.default-icon
  opacity 0.7
  filter grayscale(30%)

.link:hover .item-icon
  transform scale(1.1) rotate(5deg)
  margin-right 5px
.link:hover .default-icon
  opacity 0.9
  filter grayscale(0%)

// 内容区域样式
.item-content
  flex 1
  min-width 0
  animation slideInRight 0.5s ease-out
.item-name
  display block
  font-weight bold
  color $primary
  margin-bottom 5px
  font-size 1.1em
  line-height 1.2
  transition all 0.3s ease
  position relative
  overflow hidden

.item-abstract
  display block
  color $gray-text
  font-size 0.9em
  line-height 1.4
  animation fadeIn 0.6s ease-out 0.2s forwards
  opacity 0

// 分页控件样式
.pagination
  display flex
  justify-content center
  align-items center
  gap 20px
  margin-top 30px
  padding 20px
  background $menu-bg
  border-radius 8px
  border 1px solid $menu-border

.page-btn
  padding 10px 20px
  background $primary
  color white
  border none
  border-radius 4px
  cursor pointer
  transition all 0.3s ease
  min-width 100px

  &:hover:not(.disabled)
    background $primary-hover
    transform translateY(-1px)
&.disabled
    background $gray-light
    cursor not-allowed
    opacity 0.6

.page-info
  color $text-light
  font-size 0.9em

// 提示信息样式
.no-items, .no-categories
  text-align center
  color $gray-light
  font-style italic
  padding 40px
  font-size 1.1em

.loading, .error
  text-align center
  padding 40px
  font-size 1.1em

.loading
  color $primary

.error
  color $error-red

// 对话框样式（保持不变）
.dialog-overlay
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color rgba(0, 0, 0, 0.6)
  display flex
  align-items center
  justify-content center
  z-index 1000
  animation fadeIn 0.2s ease
  user-select none

.dialog-content
  background $bg-dark
  backdrop-filter blur(3px)
  border-radius 5px
  border 1px solid $border
  box-shadow 0 10px 40px rgba(0, 0, 0, 0.2)
  max-width 500px
  width 90%
  max-height 80vh
  overflow-y auto
  animation slideIn 0.3s ease

.dialog-header
  display flex
  justify-content center
  align-items center
  padding 20px 20px 15px
  border-bottom 1px solid $border

.dialog-title
  margin 0
  color $text-light
  font-size 1.3em
  font-weight 600

.dialog-body
  padding 20px
  user-select none

.info-item
  margin-bottom 15px
  line-height 1.6
  display flex
  align-items flex-start

.info-item strong
  color $text-medium
  display inline-block
  min-width 70px
  margin-right 10px
  flex-shrink 0
  user-select none

.info-item span
  color $text-light
  word-break break-all
  flex 1

.no-select
  user-select none
  -webkit-user-select none
  -moz-user-select none
  -ms-user-select none
  cursor default

.link-text
  color $link-text !important
  font-family Consolas, 'Courier New', monospace

.warning-text
  background-color $warning-bg
  border-radius 6px
  padding 12px
  margin-top 15px
  color $warning-text
  font-size 0.9em
  text-align center

.dialog-footer
  display flex
  justify-content space-evenly
  gap 12px
  padding 15px 20px
  border-top 1px solid $border
  background-color $bg-dark
  border-bottom-left-radius 12px
  border-bottom-right-radius 12px

.btn
  padding 10px 20px
  border none
  border-radius 4px
  cursor pointer
  font-size 14px
  font-weight 500
  transition all 0.2s ease
  min-width 180px
  user-select none

.btn-cancel
  background-color #eee
  color #5a5a5a

.btn-cancel:hover
  background-color #eeeeeecc
  color #6b6b6b
  font-size 0.8rem

.btn-cancel:hover::after
  content '，继续浏览本站'

.btn-confirm
  background-color #007aff
  color #fff

.btn-confirm:hover
  background-color #007affcc
  color #ffffffcc
  font-size 0.8rem

.btn-confirm:hover::after
  content '，继续访问此链接'
@keyframes textReveal
  from
    transform translateX(-100%)
  to
    transform translateX(100%)

@keyframes iconBounce
  0%
    transform scale(0.8) rotate(-10deg)
    opacity 0
  50%
    transform scale(1.1) rotate(5deg)
  100%
    transform scale(1) rotate(0deg)
    opacity 1

@keyframes iconSpin
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)
@keyframes fadeInUp
  from
    opacity 0
    transform translateY(20px)
  to
    opacity 1
    transform translateY(0)

@keyframes slideInRight
  from
    opacity 0
    transform translateX(20px)
  to
    opacity 1
    transform translateX(0)

@keyframes fadeIn
  from
    opacity 0
  to
    opacity 1

@keyframes slideIn
  from
    opacity 0
    transform translateY(-20px) scale(0.95)
  to
    opacity 1
    transform translateY(0) scale(1)

@keyframes pulse
  0%
    opacity 0.6
  50%
    opacity 0.3
  100%
    opacity 0.6

// 响应式设计
@media (max-width 768px)
  .nav-float
    position fixed
    top 120px
    right 20px
    width 280px
    max-height 400px
    margin 0
    
    &.nav-collapsed
      width 100px
      height 40px
      bottom 20px
      right 20px
    
    .nav-content
      max-height 350px

  .main-content
    margin-right 0
    padding-top 15px
    margin-bottom 100px // 为底部浮窗留出空间

  .category-menu
    border-radius 6px
    padding 12px
    
    &.collapsed
      max-height 100px

  .menu-grid
    grid-template-columns 1fr
    gap 8px

  .menu-item
    padding 10px 12px
    font-size 0.9em
    min-height 40px
    display flex
    justify-content space-between
    align-items center
    gap 5px

  .item-count
    font-size 0.75em
    padding 3px 6px
    min-width 20px

  .category-title
    font-size 1.6em
    align-items center
    gap 5px

  .total-count
    font-size 0.75em

  .items-grid
    grid-template-columns repeat(auto-fill, minmax(350px, 1fr))
    gap 12px
    font-size 1.2em

  .link
    padding 12px

  .item-icon-container
    margin-right 10px

  .item-icon
    width 42px
    height 42px

  .items-container
    width 100%

  // 移动端动画优化
  .item
    animation fadeInUp 0.4s ease-out forwards

  .pagination
    flex-direction column
    gap 15px
    padding 15px

  .page-btn
    min-width 120px
    width 100%

  .dialog-content
    width 95%
    margin 10px

  .dialog-footer
    flex-direction column

  .btn
    width 100%
    margin-bottom 8px

  .info-item
    flex-direction column
    align-items flex-start

  .info-item strong
    margin-bottom 5px
    min-width auto

@media (max-width 480px)
  .nav-float
    width 240px
    right 10px
    
    &.nav-collapsed
      width 80px
      right 10px
      bottom 10px

  .menu-grid
    grid-template-columns 1fr
    gap 6px

  .menu-item
    padding 8px 10px
    font-size 0.85em
    min-height 36px

  .main-content
    padding-top 15px

  .category-menu.collapsed
    max-height 80px

  .items-grid
    grid-template-columns 1fr

  .item-count
    font-size 0.7em
    padding 1px 4px
    min-width 16px

  .item-content
    width 80%

  // 小屏幕动画优化
  .item
    animation fadeInUp 0.3s ease-out forwards

// 浮窗动画效果
@keyframes floatIn
  from
    opacity 0
    transform translateY(-20px) scale(0.95)
  to
    opacity 1
    transform translateY(0) scale(1)

.nav-float
  animation floatIn 0.3s ease
</style>