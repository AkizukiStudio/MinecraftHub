<template>
  <div class="toc-float" :class="{ 'toc-collapsed': isCollapsed }">
    <!-- 折叠/展开按钮 -->
    <div class="toc-toggle" @click="toggleCollapse">
      <span class="toggle-icon">{{ isCollapsed ? '▶' : '▼' }}</span>
      <span class="toggle-text">{{ isCollapsed ? '目录' : '隐藏' }}</span>
    </div>
    
    <!-- 目录内容 -->
    <div v-show="!isCollapsed" class="toc-content">
      <div class="toc-header">
        <h4 class="toc-title">页面导航</h4>
      </div>
      
      <div class="toc-list">
        <div 
          v-for="heading in headings" 
          :key="heading.id"
          class="toc-item"
          :class="{
            'toc-h2': heading.level === 2,
            'toc-h3': heading.level === 3,
            'toc-active': heading.id === activeHeading
          }"
          :style="{ paddingLeft: `${(heading.level - 2) * 16 + 12}px` }"
        >
          <a 
            :href="`#${heading.id}`" 
            class="toc-link"
            @click.prevent="scrollToHeading(heading.id)"
          >
            <span class="toc-text">{{ heading.text }}</span>
          </a>
        </div>
        
        <div v-if="headings.length === 0" class="toc-empty">
          此页面无可导航的内容
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TocFloat',
  data() {
    return {
      isCollapsed: false,
      headings: [],
      activeHeading: '',
      observer: null,
      mutationObserver: null,
      refreshTimer: null
    }
  },
  mounted() {
    this.initToc()
    
    // 监听路由变化
    this.$router.afterEach(() => {
      setTimeout(() => {
        this.initToc()
      }, 100)
    })
  },
  beforeDestroy() {
    this.cleanupObservers()
  },
  methods: {
    // 初始化目录
    initToc() {
      this.cleanupObservers()
      this.extractHeadings()
      this.setupIntersectionObserver()
      this.setupMutationObserver()
    },
    
    // 清理所有观察器
    cleanupObservers() {
      if (this.observer) {
        this.observer.disconnect()
        this.observer = null
      }
      if (this.mutationObserver) {
        this.mutationObserver.disconnect()
        this.mutationObserver = null
      }
      if (this.refreshTimer) {
        clearTimeout(this.refreshTimer)
        this.refreshTimer = null
      }
    },
    
    // 提取页面中的h2和h3标题
    extractHeadings() {
      const headingElements = document.querySelectorAll('h2, h3')
      this.headings = Array.from(headingElements)
        .filter(heading => {
          // 如果标题没有ID，尝试生成一个
          if (!heading.id) {
            const text = heading.textContent || heading.innerText
            heading.id = this.generateHeadingId(text)
          }
          return heading.id
        })
        .map(heading => ({
          id: heading.id,
          text: heading.textContent || heading.innerText,
          level: parseInt(heading.tagName.substring(1))
        }))
    },
    
    // 为标题生成ID
    generateHeadingId(text) {
      return text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '')
    },
    
    // 设置DOM变化观察器
    setupMutationObserver() {
      this.mutationObserver = new MutationObserver((mutations) => {
        let shouldRefresh = false
        
        mutations.forEach((mutation) => {
          // 检查新增的节点
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // 检查是否是h2或h3标题
              if (node.tagName && (node.tagName.toLowerCase() === 'h2' || node.tagName.toLowerCase() === 'h3')) {
                shouldRefresh = true
              }
              // 检查子节点中是否有h2或h3标题
              if (node.querySelectorAll) {
                const headings = node.querySelectorAll('h2, h3')
                if (headings.length > 0) {
                  shouldRefresh = true
                }
              }
            }
          })
          
          // 检查属性变化（比如ID的变化）
          if (mutation.type === 'attributes' && 
              (mutation.target.tagName === 'H2' || mutation.target.tagName === 'H3') &&
              mutation.attributeName === 'id') {
            shouldRefresh = true
          }
        })
        
        // 防抖刷新
        if (shouldRefresh) {
          if (this.refreshTimer) {
            clearTimeout(this.refreshTimer)
          }
          this.refreshTimer = setTimeout(() => {
            this.extractHeadings()
            this.setupIntersectionObserver()
          }, 300)
        }
      })
      
      // 开始观察整个文档的DOM变化
      this.mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['id']
      })
    },
    
    // 设置交叉观察器来跟踪当前活跃的标题
    setupIntersectionObserver() {
      if (this.observer) {
        this.observer.disconnect()
      }
      
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.activeHeading = entry.target.id
            }
          })
        },
        {
          rootMargin: '-20% 0px -70% 0px',
          threshold: 0
        }
      )
      
      // 观察所有标题元素
      this.headings.forEach(heading => {
        const element = document.getElementById(heading.id)
        if (element) {
          this.observer.observe(element)
        }
      })
    },
    
    // 滚动到指定标题
    scrollToHeading(id) {
      const element = document.getElementById(id)
      if (element) {
        const yOffset = -80 // 考虑固定导航栏的偏移
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        })
        
        // 更新URL哈希（不触发滚动）
        history.replaceState(null, null, `#${id}`)
      }
    },
    
    // 强制刷新目录
    forceRefresh() {
      this.extractHeadings()
      this.setupIntersectionObserver()
    },
    
    // 切换折叠状态
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
      
      // 保存状态到localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('tocFloatCollapsed', this.isCollapsed.toString())
      }
    }
  }
}
</script>

<style scoped lang="stylus">
// 颜色变量
$primary-color = #007acc
$primary-light = #007acc24
$primary-hover = #007aff
$text-color = #efefef
$text-light = #6a8bad
$border-color = #5a5a5a5a
$bg-color = #ffffff
$shadow-color = rgba(0, 0, 0, 0.1)
$active-bg = #007acc14
  

.toc-float
  position fixed
  top 100px
  right 20px
  width 280px
  max-height calc(100vh - 200px)
  background #161b2224
  border 1px solid $border-color
  border-radius 5px
  box-shadow 0 4px 12px $shadow-color
  z-index 1000
  transition all 0.3s ease
  overflow hidden
  backdrop-filter blur(10px)
  
  &.toc-collapsed
    width 100px
    
    .toc-content
      display none

.toc-toggle
  display flex
  align-items center
  padding 12px 16px
  background $primary-light
  cursor pointer
  user-select none
  transition background-color 0.2s ease
  
  &:hover
    background $active-bg
  
  .toggle-icon
    font-size 12px
    margin-right 8px
    color $primary-color
    font-weight bold
  
  .toggle-text
    font-size 14px
    color $text-color
    font-weight 500

.toc-content
  max-height calc(100vh - 330px)
  overflow-y auto
  
  &::-webkit-scrollbar
    width 4px
  
  &::-webkit-scrollbar-track
    background transparent
  
  &::-webkit-scrollbar-thumb
    background $border-color
    border-radius 2px

.toc-header
  display flex
  justify-content space-between
  align-items center
  padding 16px 16px 12px
  border-bottom 1px solid $border-color
  
  .toc-title
    margin 0
    font-size 16px
    font-weight 600
    color $text-color
  
  .toc-refresh
    background none
    border none
    cursor pointer
    font-size 14px
    padding 4px 8px
    border-radius 4px
    transition background-color 0.2s ease
    
    &:hover
      background $primary-light

.toc-list
  padding 8px 0

.toc-item
  margin 2px 0
  transition all 0.2s ease
  border-radius 4px
  
  &.toc-active
    background $active-bg
    
    .toc-link
      color $primary-color
      font-weight 500
  
  &.toc-h2
    font-size 14px
    font-weight 500
  
  &.toc-h3
    font-size 13px
    color $text-light

.toc-link
  display block
  padding 8px 16px
  text-decoration none
  color $text-color
  transition all 0.2s ease
  line-height 1.4
  
  &:hover
    color $primary-hover
    background $active-bg

.toc-text
  display block
  white-space nowrap
  overflow hidden
  text-overflow ellipsis

.toc-empty
  padding 20px
  text-align center
  color $text-light
  font-size 14px

// 响应式设计
@media (max-width: 1200px)
  .toc-float
    width 240px
    right 15px

@media (max-width: 768px)
  .toc-float
    top auto
    right 40px
    width 240px
    margin 20px 0
    border-radius 3px
    
    &.toc-collapsed
      right 10px
      width 100px
      
    .toc-content
      max-height 300px

  .toc-item
    &.toc-h2
      font-size 16px
    
    &.toc-h3
      font-size 15px
    

// 动画效果
@keyframes fadeIn
  from
    opacity 0
    transform translateY(-10px)
  to
    opacity 1
    transform translateY(0)

.toc-float
  animation fadeIn 0.3s ease
</style>