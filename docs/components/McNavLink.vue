<script setup lang="ts">
import { withBase } from 'vitepress'

import type { NavLink } from '@/.vitepress/theme/types'

const props = defineProps<{
  icon?: NavLink['icon']
  title?: NavLink['title']
  desc?: NavLink['desc']
  link: NavLink['link']
}>()

// slugify 函数，支持中文标题
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
  if (!props.title) {
    return ''
  }
  return slugify(props.title)
}

const getSvg = () => {
  if (typeof props.icon === 'object') return props.icon.svg
  return ''
}

// 判断是否为外部链接
const isExternalLink = () => {
  return props.link.startsWith('http') || props.link.startsWith('//')
}

// 处理链接
const getProcessedLink = () => {
  return isExternalLink() ? props.link : withBase(props.link)
}

// 链接属性
const getLinkProps = () => {
  if (isExternalLink()) {
    return {
      href: getProcessedLink(),
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  } else {
    return {
      href: getProcessedLink()
    }
  }
}
</script>

<template>
  <a class="m-nav-link" v-bind="getLinkProps()">
    <article class="box">
      <div class="box-header">
        <div v-if="getSvg()" class="icon" v-html="getSvg()"></div>
        <div v-else-if="icon && typeof icon === 'string'" class="icon">
          <img
            :src="withBase(icon)"
            :alt="title"
            onerror="this.parentElement.style.display='none'"
          />
        </div>
        <h5 v-if="title" :id="formatTitle()" class="title">{{ title }}</h5>
      </div>
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>

<style lang="scss" scoped>
.m-nav-link {
  --m-nav-icon-box-size: 48px;
  --m-nav-icon-size: 28px;
  --m-nav-box-gap: 16px;

  display: block;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  height: 100%;
  text-decoration: none;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.25s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--vp-shadow-3);
    border-color: var(--vp-c-brand);
    background-color: var(--vp-c-bg);
  }

  .box {
    display: flex;
    flex-direction: column;
    padding: var(--m-nav-box-gap);
    height: 100%;
    color: var(--vp-c-text-1);
    
    &-header {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    border-radius: 8px;
    width: var(--m-nav-icon-box-size);
    height: var(--m-nav-icon-box-size);
    font-size: var(--m-nav-icon-size);
    background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-brand));
    color: white;
    
    :deep(svg) {
      width: var(--m-nav-icon-size);
      height: var(--m-nav-icon-size);
      fill: currentColor;
    }
    
    :deep(img) {
      border-radius: 6px;
      width: var(--m-nav-icon-size);
      height: var(--m-nav-icon-size);
      object-fit: cover;
    }
  }

  .title {
    overflow: hidden;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.2;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  .desc {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    line-height: 1.5;
    font-size: 14px;
    color: var(--vp-c-text-2);
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .m-nav-link {
    --m-nav-icon-box-size: 40px;
    --m-nav-icon-size: 24px;
    --m-nav-box-gap: 12px;

    .title {
      font-size: 16px;
    }
    
    .desc {
      font-size: 13px;
    }
  }
}

@media (max-width: 480px) {
  .m-nav-link {
    --m-nav-icon-box-size: 36px;
    --m-nav-icon-size: 20px;
    --m-nav-box-gap: 10px;

    .title {
      font-size: 15px;
    }
  }
}
</style>