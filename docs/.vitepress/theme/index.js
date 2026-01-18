import DefaultTheme from 'vitepress/theme'
import McNavLinks from './components/McNavLinks.vue'
import McNavLink from './components/McNavLink.vue'
import Search from './components/Search.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('McNavLinks', McNavLinks)
    app.component('McNavLink', McNavLink)
    app.component('Search', Search)
  }
}