<template>
  <div class="creator-list">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">加载失败: {{ error }}</div>
    <div v-else>
      <div v-for="platform in platforms" :key="platform.id" class="platform">
        <h2 :id="platform.id" class="platform-title">
          {{ platform.name }}
        </h2>
        <div v-if="platform.creators.length" class="creators">
          <div v-for="creator in platform.creators" :key="creator.id" class="creator">
            <a 
              href="javascript:void(0)" 
              @click="showCreatorDialog(creator, platform)"
              class="creator-link"
            >
              <!-- 简化图片加载逻辑，移除懒加载 -->
              <div class="creator-avatar-container">
                <img 
                  v-if="creator.hasCustomAvatar" 
                  :src="creator.avatar" 
                  :alt="creator.name + ' 头像'"
                  class="creator-avatar"
                  @error="handleAvatarError($event, creator, platform.icon)"
                  loading="lazy"
                />
                <img 
                  v-else 
                  :src="platform.icon" 
                  :alt="platform.name + ' 图标'"
                  class="creator-avatar platform-avatar"
                  loading="lazy"
                />
              </div>
              <div class="creator-content">
                <span class="creator-name">{{ creator.name }}</span>
                <span v-if="creator.abstract" class="creator-abstract">
                  {{ creator.abstract }}
                </span>
              </div>
            </a>
          </div>
        </div>
        <div v-else class="no-creators">
          暂无创作者
        </div>
      </div>
    </div>
    
    <!-- 创作者链接确认对话框 -->
    <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-content" @click.stop>
        <div class="dialog-header">
          <h4 class="dialog-title">跳转到创作者主页</h4>
        </div>
        <div class="dialog-body">
          <div class="dialog-creator-info">
            <div class="dialog-avatar-container">
              <img 
                :src="currentCreator.avatar" 
                :alt="currentCreator.name + ' 头像'"
                class="dialog-avatar"
                @error="handleDialogAvatarError"
              />
            </div>
            <div class="dialog-info-details">
              <div class="info-item">
                <strong>平台：</strong>
                <span class="no-select">{{ currentPlatform.name }}</span>
              </div>
              <div class="info-item">
                <strong>名称：</strong>
                <span class="no-select">{{ currentCreator.name }}</span>
              </div>
              <div class="info-item" v-if="currentCreator.abstract">
                <strong>介绍：</strong>
                <span class="no-select">{{ currentCreator.abstract }}</span>
              </div>
            </div>
          </div>
          <div class="info-item">
            <strong>链接：</strong>
            <span class="no-select link-text">{{ currentCreator.link }}</span>
          </div>
          <div class="warning-text no-select">
            即将跳转到外部网站，请注意网络安全
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn btn-cancel" @click="closeDialog">留在本站</button>
          <button class="btn btn-confirm" @click="confirmRedirect">继续访问</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 平台配置
const PLATFORM_CONFIG = {
  Bilibili: {
    name: '哔哩哔哩',
    icon: '/MinecraftHub/img/bilibili-icon.svg',
    id: 'bilibili',
    order: 1
  },
  Youtube: {
    name: 'YouTube',
    icon: '/MinecraftHub/img/youtube-icon.svg',
    id: 'youtube',
    order: 2
  },
  TikTok: {
    name: '抖音/TikTok',
    icon: '/MinecraftHub/img/tiktok-icon.svg',
    id: 'tiktok',
    order: 3
  },
  Twitch: {
    name: 'Twitch',
    icon: '/MinecraftHub/img/twitch-icon.svg',
    id: 'twitch',
    order: 4
  },
  Twitter: {
    name: 'Twitter',
    icon: '/MinecraftHub/img/twitter-icon.svg',
    id: 'twitter',
    order: 5
  }
}

// 常量定义
const DEFAULT_AVATAR = '/MinecraftHub/img/logo.svg'
const CREATOR_DATA_PATH = '/MinecraftHub/manifes/McCreator.json'

export default {
  name: 'CreatorList',
  
  data() {
    return {
      platforms: [],
      loading: true,
      error: null,
      showDialog: false,
      currentCreator: null,
      currentPlatform: null,
      avatarErrorCache: new Set(), // 缓存已失败的头像URL
      iconErrorCache: new Set()     // 缓存已失败的图标URL
    }
  },
  
  async mounted() {
    await this.loadCreatorData()
  },
  
  methods: {
    // 加载创作者数据
    async loadCreatorData() {
      try {
        this.loading = true
        this.error = null
        
        const response = await fetch(CREATOR_DATA_PATH)
        
        if (!response.ok) {
          throw new Error(`HTTP错误: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (!data?.Creator) {
          throw new Error('数据格式不正确：缺少Creator字段')
        }
        
        // 格式化平台数据
        this.platforms = this.formatPlatformsData(data.Creator)
        
      } catch (error) {
        console.error('加载创作者数据失败:', error)
        this.error = `无法加载创作者信息: ${error.message}`
        this.platforms = []
      } finally {
        this.loading = false
      }
    },
    
    // 格式化平台数据
    formatPlatformsData(creatorData) {
      return Object.entries(creatorData)
        .map(([platformKey, creators]) => {
          const config = PLATFORM_CONFIG[platformKey] || this.createDefaultConfig(platformKey)
          
          return {
            id: config.id,
            key: platformKey,
            name: config.name,
            icon: config.icon,
            order: config.order || 99,
            creators: this.formatCreatorsData(creators, config)
          }
        })
        .filter(platform => platform.creators.length > 0)
        .sort((a, b) => a.order - b.order)
    },
    
    // 格式化创作者数据
    formatCreatorsData(creators, platformConfig) {
      if (!Array.isArray(creators)) return []
      
      return creators
        .filter(creator => this.isValidCreator(creator))
        .map((creator, index) => ({
          id: `${platformConfig.id}-${index}-${this.slugify(creator.name)}`,
          name: creator.name.trim(),
          // 检查头像URL是否已失败，如果失败则直接使用平台图标
          avatar: (creator.img?.trim() && !this.avatarErrorCache.has(creator.img.trim())) 
                  ? creator.img.trim() 
                  : platformConfig.icon,
          abstract: creator.abstract?.trim() || '',
          link: creator.link.trim(),
          hasCustomAvatar: !!creator.img?.trim(),
          platformIcon: platformConfig.icon
        }))
    },
    
    // 验证创作者数据
    isValidCreator(creator) {
      return creator && 
             creator.name && 
             creator.name.trim() && 
             creator.link && 
             creator.link.trim()
    },
    
    // 显示创作者对话框
    showCreatorDialog(creator, platform) {
      this.currentCreator = creator
      this.currentPlatform = platform
      this.showDialog = true
    },
    
    // 关闭对话框
    closeDialog() {
      this.showDialog = false
      this.currentCreator = null
      this.currentPlatform = null
    },
    
    // 确认跳转
    confirmRedirect() {
      if (this.currentCreator && this.currentCreator.link) {
        window.open(this.currentCreator.link, '_blank', 'noopener,noreferrer')
      }
      this.closeDialog()
    },
    
    // 处理头像加载错误 - 简化版本
    handleAvatarError(event, creator, platformIcon) {
      const img = event.target
      const originalSrc = img.src
      
      // 如果已经在使用平台图标但仍然失败
      if (originalSrc === platformIcon || originalSrc.includes('bilibili-icon') || 
          originalSrc.includes('youtube-icon') || originalSrc.includes('tiktok-icon') ||
          originalSrc.includes('twitch-icon') || originalSrc.includes('twitter-icon')) {
        
        // 将失败的图标URL加入缓存
        if (!this.iconErrorCache.has(originalSrc)) {
          this.iconErrorCache.add(originalSrc)
          console.warn('平台图标加载失败:', originalSrc)
        }
        
        // 直接使用默认头像
        img.src = DEFAULT_AVATAR
        img.onerror = null // 移除错误监听，避免循环
        return
      }
      
      // 如果是自定义头像失败
      if (!this.avatarErrorCache.has(originalSrc)) {
        this.avatarErrorCache.add(originalSrc)
        console.warn('自定义头像加载失败，切换到平台图标:', originalSrc)
      }
      
      // 切换到平台图标
      img.src = platformIcon
      // 移除旧的错误监听，添加新的（处理平台图标可能也失败的情况）
      img.onerror = (e) => this.handleAvatarError(e, creator, platformIcon)
    },
    
    // 处理对话框头像错误
    handleDialogAvatarError(event) {
      const img = event.target
      const originalSrc = img.src
      
      // 直接使用默认头像，避免循环
      img.src = DEFAULT_AVATAR
      img.onerror = null // 移除错误监听
      
      console.warn('对话框头像加载失败，已替换为默认头像:', originalSrc)
    },
    
    // 默认平台配置
    createDefaultConfig(platformName) {
      const slug = this.slugify(platformName)
      return {
        name: platformName,
        icon: DEFAULT_AVATAR,
        id: slug,
        order: 99
      }
    },
    
    // slugify工具函数
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
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

.creator-list
  max-width 100%
  margin 0 auto

.platform
  margin-bottom 30px
  border-radius 8px
  padding 5px

.platform-title
  font-size 1.2em
  font-weight bold
  margin-bottom 15px
  padding-bottom 10px
  border-bottom 2px solid $primary

.creators
  display grid
  grid-template-columns repeat(auto-fill, minmax(300px, 1fr))
  gap 15px

.creator
  background linear-gradient(to right, $primary-light, transparent 40%)
  border-left 0.2rem solid $primary-medium
  transition all 0.3s ease

.creator:hover
  background linear-gradient(to right, $primary-hover-light, transparent 50%)
  border-left 0.2rem solid $primary-hover
  transition all 0.5s ease

.creator:hover .creator-name
  color $text-highlight

.creator-link
  display flex
  align-items center
  padding 15px
  text-decoration none
  color transparent
  transition all 0.3s ease

// 头像容器样式
.creator-avatar-container
  flex-shrink 0
  margin-right 12px
  display flex
  align-items center
  justify-content center

.creator-avatar
  width 48px
  height 48px
  object-fit cover
  border-radius 50%
  border 2px solid $border
  background $bg-dark
  transition all 0.3s ease

.platform-avatar
  border-radius 8px
  filter grayscale(30%)
  opacity 0.8

.creator-link:hover .creator-avatar
  transform scale(1.1)
  margin-right 5px

.creator-link:hover .platform-avatar
  opacity 1
  filter grayscale(0%)

// 内容区域样式
.creator-content
  flex 1
  min-width 0

.creator-name
  display block
  font-weight bold
  color $primary
  margin-bottom 5px
  font-size 1.1em
  line-height 1.2

.creator-abstract
  display block
  color $gray-text
  font-size 0.9em
  line-height 1.4
  display -webkit-box
  -webkit-line-clamp 2
  -webkit-box-orient vertical
  overflow hidden
  text-overflow ellipsis

.no-creators
  text-align center
  color $gray-light
  font-style italic
  padding 20px

.loading, .error
  text-align center
  padding 40px
  font-size 1.1em

.loading
  color $primary

.error
  color $error-red

// 对话框样式
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

.dialog-creator-info
  display flex
  align-items flex-start
  margin-bottom 20px
  gap 20px

.dialog-avatar-container
  flex-shrink 0

.dialog-avatar
  width 80px
  height 80px
  border-radius 50%
  object-fit cover
  border 3px solid $primary-medium

.dialog-info-details
  flex 1
  min-width 0

.info-item
  margin-bottom 15px
  line-height 1.6
  display flex
  align-items flex-start

.info-item strong
  color $text-medium
  display inline-block
  min-width 50px
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

.btn-confirm
  background-color #007aff
  color #fff

.btn-confirm:hover
  background-color #007affcc
  color #ffffffcc

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

@media (max-width 768px)
  .platform-title
    font-size 1.3em
  
  .creator-list
    padding 10px
  
  .creators
    grid-template-columns repeat(auto-fill, minmax(250px, 1fr))
  
  .dialog-content
    width 95%
    margin 10px
  
  .dialog-footer
    flex-direction column
  
  .btn
    width 100%
    margin-bottom 8px
  
  .dialog-creator-info
    flex-direction column
    align-items center
    text-align center
  
  .dialog-info-details .info-item
    flex-direction column
    align-items center
  
  .dialog-info-details .info-item strong
    margin-bottom 5px
    min-width auto
  
  .creator-avatar-container
    margin-right 10px
  
  .creator-avatar
    width 40px
    height 40px
  
  .creator-name
    font-size 1em
  
  .creator-abstract
    font-size 0.85em
</style>