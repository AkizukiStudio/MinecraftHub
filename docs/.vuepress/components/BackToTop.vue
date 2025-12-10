<template>
  <transition name="back-to-top">
    <button
      v-if="visible"
      class="back-to-top-btn"
      :class="{ 'scrolling': isScrolling }"
      @click="scrollToTop"
      :style="buttonStyle"
      aria-label="返回顶部"
    >
      <svg class="back-to-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 19V5M5 12l7-7 7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="back-to-top-text">返回顶部</span>
    </button>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      visible: false,
      isScrolling: false,
      scrollY: 0,
      scrollThreshold: 500, // 滚动超过300px显示按钮
      scrollTimer: null
    }
  },
  computed: {
    buttonStyle() {
      return {
        '--scroll-progress': Math.min(this.scrollY / 500, 1)
      }
    }
  },
  mounted() {
    this.bindScrollEvent()
  },
  beforeUnmount() {
    this.unbindScrollEvent()
  },
  methods: {
    bindScrollEvent() {
      window.addEventListener('scroll', this.handleScroll, { passive: true })
    },
    unbindScrollEvent() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    handleScroll() {
      this.scrollY = window.scrollY || document.documentElement.scrollTop
      
      // 显示/隐藏逻辑
      this.visible = this.scrollY > this.scrollThreshold
      
      // 滚动状态指示
      this.isScrolling = true
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(() => {
        this.isScrolling = false
      }, 150)
    },
    scrollToTop() {
      // 平滑滚动到顶部
      const startPosition = window.scrollY || document.documentElement.scrollTop
      const startTime = performance.now()
      const duration = 600 // 动画持续时间
      
      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)
      
      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeProgress = easeOutQuart(progress)
        
        window.scrollTo(0, startPosition * (1 - easeProgress))
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }
      
      requestAnimationFrame(animateScroll)
    }
  }
}
</script>

<style scoped lang="stylus">
// 颜色变量定义
$primary = #007acc
$primary-dark = #161b22aa 
$primary-light = #007acc24
$primary-hover = #007aff
$text-light = #efefef
$bg-dark = #161b2224
$border = #5a5a5a5a

.back-to-top-btn
  position fixed
  bottom 40px
  right 40px
  width 56px
  height 56px
  background $primary-dark
  border 2px solid $primary-light
  border-radius 5px
  cursor pointer
  display flex
  flex-direction column
  align-items center
  justify-content center
  box-shadow 0 4px 20px rgba(0, 122, 204, 0.3)
  transition all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
  z-index 999
  overflow hidden
  opacity calc(0.7 + 0.3 * var(--scroll-progress, 0))
  transform scale(calc(0.9 + 0.1 * var(--scroll-progress, 0)))
  
  // 发光效果
  &::before
    content ''
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)
    opacity 0
    transition opacity 0.3s ease
  
  &:hover
    background $primary-hover
    box-shadow 0 6px 25px rgba(0, 122, 255, 0.4)
    opacity 1
    
    &::before
      opacity 1
    
    .back-to-top-icon
      transform translateY(-2px)
    
    .back-to-top-text
      opacity 1
      transform translateY(0)
  
  &.scrolling
    animation pulse 1.5s ease-in-out infinite
  
  // 点击效果
  &:active
    transform scale(0.95)
    transition transform 0.1s ease

.back-to-top-icon
  width 24px
  height 24px
  color $text-light
  transition transform 0.3s ease
  filter drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))

.back-to-top-text
  font-size 10px
  color $text-light
  font-weight 500
  margin-top 2px
  opacity 0.7
  transform translateY(5px)
  transition all 0.3s ease
  text-shadow 0 1px 2px rgba(0, 0, 0, 0.2)

// 进入/离开动画
.back-to-top-enter-active,
.back-to-top-leave-active
  transition all 0.5s cubic-bezier(0.4, 0, 0.2, 1)

.back-to-top-enter-from
  opacity 0
  transform translateY(50px) scale(0.8)

.back-to-top-leave-to
  opacity 0
  transform translateY(400px) scale(0.8)

// 脉冲动画
@keyframes pulse
  0%
    box-shadow 0 4px 20px rgba(0, 122, 204, 0.3)
  50%
    box-shadow 0 4px 35px rgba(0, 122, 204, 0.5)
  100%
    box-shadow 0 4px 20px rgba(0, 122, 204, 0.3)

// 响应式设计
@media (max-width 768px)
  .back-to-top-btn
    bottom 200px
    right 40px
    width 65px
    height 65px
    
    .back-to-top-icon
      width 20px
      height 20px
    
    .back-to-top-text
      font-size 12px

@media (max-width 480px)
  .back-to-top-btn
    bottom 120px
    right 30px
    width 54px
    height 54px
    
    .back-to-top-icon
      width 20px
      height 20px
    
    .back-to-top-text
      display none // 在小屏幕上隐藏文字
</style>