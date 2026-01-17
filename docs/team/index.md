---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: '/akiba_cat.jpg',
    name: 'AkibaCat',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/AkibaCat' },
      { icon: 'twitter', link: 'https://twitter.com/akiba_cat' }
    ]
  },
  {
    avatar: '/cx330.jpg',
    name: 'CX330',
    title: 'Member',
    links: [
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      AkizukiStudio
    </template>
    <template #lead>
      AkizukiStudio 自2022年创建以来的成员
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>