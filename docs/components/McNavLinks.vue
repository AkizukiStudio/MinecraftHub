<script setup lang="ts">
import McNavLink from './McNavLink.vue'
import type { NavLink } from '@/.vitepress/theme/types'

const props = defineProps<{
  title: string
  items: NavLink[]
}>()

// 改进的 slugify 函数，支持中文标题
const slugify = (text: string): string => {
  return text
    .toString()
    .normalize('NFKD') // 将字符分解为基本字符和组合标记
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // 将空格替换为连字符
    .replace(/[^\p{L}\p{N}\-]/gu, '') // 保留字母、数字和连字符（支持Unicode）
    .replace(/\-\-+/g, '-') // 将多个连字符替换为单个
    .replace(/^-+/, '') // 移除开头的连字符
    .replace(/-+$/, '') // 移除结尾的连字符
}

// 直接使用函数而不是computed
const formatTitle = () => {
  return slugify(props.title)
}
</script>

<template>
  <div class="m-nav-section">
    <h2 v-if="title" :id="formatTitle()" tabindex="-1">
      {{ title }}
      <a class="header-anchor" :href="`#${formatTitle()}`" aria-hidden="true"></a>
    </h2>
    <div class="m-nav-links">
      <McNavLink
        v-for="{ icon, title, desc, link } in items"
        :key="link"
        :icon="icon"
        :title="title"
        :desc="desc"
        :link="link"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-nav-section {
  margin-bottom: 2rem;
}

.m-nav-links {
  --m-nav-gap: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-row-gap: var(--m-nav-gap);
  grid-column-gap: var(--m-nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    --m-nav-gap: 12px;
  }
}

@media (max-width: 480px) {
  .m-nav-links {
    grid-template-columns: 1fr;
    --m-nav-gap: 8px;
  }
}
</style>