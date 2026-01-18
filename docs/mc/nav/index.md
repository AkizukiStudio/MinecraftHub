---
title: MC导航
layoutClass: mc-nav-layout
outline: [2, 3, 4]
description: MC导航网，由MincraftHub提供，致力于为大家提供好用的Minecraft导航
---

<script setup>
import { NAV_DATA } from './data'
</script>
<style src="./index.scss" lang="scss"></style>

# Minecraft导航

> 此页面已重新设计，提高了导航内容的可读性和易用性。<br />
> 因页面重做，目前还在持续修改中...<br />
> 大部分导航的图标缺失，查阅体验超级稀烂，图标正在摆烂式添加中 :D...

目前已收录 238 个资源站点 | 图标补齐进度 66/238 - 27.7% 

<br />

<Search
  placeholder="搜索内容..." 
  :card-selector="'.mc-nav-link'"
  :search-fields="['data-title', 'data-description']"
  :initial-search="currentSearch"
/>

<McNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br />