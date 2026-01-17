---
title: MC导航
layoutClass: mc-nav-layout
outline: [2, 3, 4]
description: MC导航网，由MincraftHub提供，致力于为大家提供好用的Minecraft导航
---

<script setup>
import { NAV_DATA } from './data'
</script>
<style src="./main.scss"></style>

# Minecraft导航

> 此页面已重新设计，提高了导航内容的可读性和易用性。<br />
> 因页面重做，目前还在持续优化中，后续会添加更多的导航站点。<br />
> 大部分导航的图标缺失，查阅体验稀烂，图标正在摆烂式添加中 :D...

目前已收录 236 个资源站点

<McNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br />