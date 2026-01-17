import type { NavLink } from '../../.vitepress/theme/types'

type NavData = {
  id: string
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  {
    id: '01',
    title: '官方网站',
    items: [
      {
        icon: '/mc/nav/01-01.png',
        title: 'Minecraft',
        desc: 'Minecraft我的世界官方网站',
        link: 'https://www.minecraft.net/'
      },
      {
        icon: '/mc/nav/01-02.jpg',
        title: '网易我的世界',
        desc: '网易我的世界官方网站',
        link: 'https://mc.163.com/'
      },
      {
        icon: '/mc/nav/01-03.png',
        title: 'Minecraft Classic',
        desc: 'Cassic经典原始网页版Minecraft在线游戏',
        link: 'https://classic.minecraft.net/'
      },
      {
        icon: '/mc/nav/01-04.png',
        title: 'Mojang Jira',
        desc: 'Mojang官方Bug反馈/提交建议',
        link: 'https://bugs.mojang.com/'
      },
      {
        icon: '/mc/nav/01-05.png',
        title: 'FindMCServer',
        desc: '官方Minecraft服务器列表',
        link: 'https://findmcserver.com/'
      },
      {
        icon: 'https://mc.netease.com/favicon.ico',
        title: '网易我的世界论坛',
        desc: '中国版官方论坛',
        link: 'https://mc.netease.com/'
      }
    ]
  },
  {
    id: '02',
    title: '社区论坛',
    items: [
      {
        icon: '/mc/nav/02-01.jpg',
        title: 'MineBBS',
        desc: '我的世界中文论坛',
        link: 'https://www.minebbs.com/'
      },
      {
        icon: 'https://klpwiki.com/favicon.ico',
        title: '苦力怕论坛 KLPBBS',
        desc: '我的世界苦力怕论坛',
        link: 'https://klpbbs.com/'
      },
      {
        icon: '/mc/nav/02-02.jpg',
        title: 'MCBBS纪念版',
        desc: 'Minecraft中文论坛',
        link: 'https://www.mcbbs.co/'
      },
      {
        icon: '/mc/nav/02-03.png',
        title: 'MCFlare论坛',
        desc: '一个新兴的Minecraft技术交流社区',
        link: 'https://forum.mcflare.com/'
      },
      {
        icon: '/mc/nav/02-04.jpg',
        title: '最MC论坛',
        desc: '一个服务于《我的世界》（Minecraft）中文玩家及服务器运营者的综合社区平台',
        link: 'https://www.zuimc.com/'
      },
      {
        icon: '/mc/nav/02-05.jpg',
        title: 'Bangbang93论坛',
        desc: '十分著名的下载源国内镜像站 BMCLAPI',
        link: 'https://www.bangbang93.com/'
      },
      {
        icon: '/mc/nav/02-06.jpg',
        title: '小僵尸论坛',
        desc: '国内的我的世界中文论坛',
        link: 'https://www.zitbbs.com/'
      },
      {
        icon: '/mc/nav/02-07.jpg',
        title: 'himc论坛',
        desc: '国内的我的世界中文论坛，主营java版',
        link: 'https://www.himcbbs.com/'
      },
      {
        icon: '/mc/nav/02-08.jpg',
        title: 'UTCBBS',
        desc: '一个专门讨论Minecraft游戏Java版本的论坛',
        link: 'https://bbs.mcutc.cn/'
      },
      {
        icon: '/mc/nav/02-09.jpg',
        title: '我的世界黑曜石论坛',
        desc: '一个国内新兴的论坛，主营java版',
        link: 'https://mcobs.cn/'
      },
      {
        icon: '/mc/nav/02-10.jpg',
        title: 'Minecraft Forum',
        desc: 'Minecraft原官方论坛',
        link: 'https://www.minecraftforum.net/'
      },
      {
        icon: '/mc/nav/02-11.jpg',
        title: 'Minecraft-HK',
        desc: '我的世界香港社区',
        link: 'https://www.minecraft-hk.com/'
      },
      {
        icon: '/mc/nav/02-12.jpg',
        title: '我的世界教育版中文论坛',
        desc: '在课程中融入寓教于乐的体验，让学生乐“学”其中',
        link: 'https://www.mceebbs.com/'
      },
      {
        icon: '/mc/nav/02-13.jpg',
        title: 'Minecraft吧',
        desc: '百度minecraft吧',
        link: 'https://tieba.baidu.com/minecraft'
      }
    ]
  },
  {
    id: '03',
    title: '百科wiki',
    items: [
      {
        icon: '/mc/nav/03-01.jpg',
        title: '中文 Minecraft Wiki',
        desc: 'Minecraft最著名、最权威的非官方百科网站',
        link: 'https://zh.minecraft.wiki/'
      },
      {
        icon: '/mc/nav/03-02.jpg',
        title: '我的世界玩家WIKI',
        desc: 'Bilibili玩家攻略WIKI',
        link: 'https://wiki.biligame.com/mcplayer/'
      },
      {
        icon: '/mc/nav/03-03.jpg',
        title: 'MCBE 官方创作者文档',
        desc: '微软官方MCBE创作者文档',
        link: 'https://learn.microsoft.com/minecraft/creator/?view=minecraft-bedrock-stable'
      },
      {
        icon: '/mc/nav/03-04.jpg',
        title: 'MCMOD',
        desc: 'Minecraft中文Mod百科',
        link: 'https://www.mcmod.cn/'
      },
      {
        icon: '/mc/nav/03-05.jpg',
        title: '基岩版开发Wiki',
        desc: 'Minecraft基岩版开发WIki',
        link: 'https://wiki.mcbe-dev.net/'
      },
      {
        icon: '/mc/nav/03-06.jpg',
        title: 'DigMinecraft',
        desc: '一个强大的MC百科平台',
        link: 'https://www.digminecraft.com/'
      },
      {
        icon: '/mc/nav/03-07.jpg',
        title: 'Minecraft Parkour Wiki',
        desc: '一个记录 Minecraft 跑酷知识以及玩家运动机制的 wiki',
        link: 'https://www.mcpk.wiki/wiki/Main_Page/zh'
      },
      {
        icon: '/mc/nav/03-08.jpg',
        title: 'Bedrock Wiki',
        desc: '一个基岩技术的知识分享网站，包含文档、教程和一般的操作信息。',
        link: 'https://wiki.bedrock.dev/'
      },
      {
        icon: '/mc/nav/03-09.jpg',
        title: 'Minecraft插件百科',
        desc: '服务器插件百科Wiki',
        link: 'https://mineplugin.org/'
      },
      {
        icon: '/mc/nav/03-10.jpg',
        title: 'NitWikit 笨蛋文档',
        desc: '详细且全面的开服教程',
        link: 'https://nitwikit.8aka.org/'
      },
      {
        icon: '/mc/nav/03-11.jpg',
        title: 'MC都市传说百科',
        desc: 'MC阴间玩意儿大合集',
        link: 'https://minecraftcreepypasta.fandom.com/wiki/Category:Browse'
      }
    ]
  },
  {
    id: '04',
    title: '资源站',
    items: [
      {
        icon: '/mc/nav/04-01.jpg',
        title: 'Github-Minecraft 话题',
        desc: 'Github的Minecraft标签',
        link: 'https://github.com/topics/minecraft'
      },
      {
        icon: '/mc/nav/04-02.jpg',
        title: 'Minecraft中文下载站',
        desc: '我的世界中文资源下载站',
        link: 'https://oss.minecraftxz.com/'
      },
      {
        icon: '/mc/nav/04-03.jpg',
        title: '我的世界中文站',
        desc: '又一个MC中文资源站',
        link: 'https://www.minecraftzw.com/'
      },
      {
        icon: '/mc/nav/04-04.jpg',
        title: 'ResourcePack',
        desc: '丰富的资源包列表',
        link: 'https://resourcepack.net/'
      },
      {
        icon: '/mc/nav/04-05.jpg',
        title: 'Planet Minecraft',
        desc: 'MC游戏资源分享站',
        link: 'https://www.planetminecraft.com/'
      },
      {
        icon: '/mc/nav/04-06.jpg',
        title: 'Minecraft Schematics',
        desc: 'Minecraft 创世神蓝图文件大全',
        link: 'https://www.minecraft-schematics.com/'
      },
      {
        icon: '/mc/nav/04-07.jpg',
        title: 'MinecraftYard',
        desc: 'Minecraft mod和资源包下载站',
        link: 'https://www.minecraftyard.com/'
      },
      {
        icon: '/mc/nav/04-08.jpg',
        title: 'MCPEDL',
        desc: '基岩版游戏资源站',
        link: 'https://mcpedl.com/'
      },
      {
        icon: '/mc/nav/04-09.jpg',
        title: 'MCVersions',
        desc: 'Minecraft&Java版全版本jar下载网站',
        link: 'https://mcversions.net/'
      },
      {
        icon: '/mc/nav/04-10.jpg',
        title: 'CurseForge',
        desc: 'Minecraft模组分享站',
        link: 'https://www.curseforge.com/minecraft/'
      },
      {
        icon: '/mc/nav/04-11.jpg',
        title: 'Texture Packs',
        desc: '丰富的纹理包资源分享站',
        link: 'https://texture-packs.com/'
      },
      {
        icon: '/mc/nav/04-12.jpg',
        title: 'TITAIKE',
        desc: '整合及翻译国内外基岩版地图',
        link: 'https://www.titaike.cn/'
      },
      {
        icon: '/mc/nav/04-13.jpg',
        title: 'Redstone Games',
        desc: 'Minecraft Java、基岩版。资源包、模组、着色器、数据包',
        link: 'https://www.redstonegames.com.br/'
      },
      {
        icon: '/mc/nav/04-14.jpg',
        title: 'Resource-Packs',
        desc: '非常强大的材质资源网站！',
        link: 'https://www.resource-packs.com/'
      },
      {
        icon: '/mc/nav/04-15.jpg',
        title: 'MCModels',
        desc: '高质量模型资源网站',
        link: 'https://mcmodels.net/'
      },
      {
        icon: '/mc/nav/04-16.jpg',
        title: 'Modpack Index',
        desc: '一个简约强大的模组包索引网站',
        link: 'https://www.modpackindex.com/'
      },
      {
        icon: '/mc/nav/04-17.jpg',
        title: 'Minecraft Polska',
        desc: '具有 Minecraft 资源和新闻的国外站点',
        link: 'https://minecraft.org.pl/'
      },
      {
        icon: '/mc/nav/04-18.jpg',
        title: 'Minecraft Shaders',
        desc: '是一个海外着色器评论、教程、更新和下载站点',
        link: 'https://minecraftshader.com/'
      },
      {
        icon: '/mc/nav/04-19.jpg',
        title: 'Minecraft for Windows 版本库',
        desc: 'Minecraft Windows 基岩版全版本下载站',
        link: 'https://www.mcappx.com/'
      },
      {
        icon: '/mc/nav/04-20.jpg',
        title: 'MCPE-Planet',
        desc: '一个海外MCPE资源站',
        link: 'https://mcpe-planet.com/'
      },
      {
        icon: '/mc/nav/04-21.jpg',
        title: 'Modrinth',
        desc: 'Java版模组资源分享站',
        link: 'https://modrinth.com/'
      },
      {
        icon: '/mc/nav/04-22.jpg',
        title: 'MinecraftCapes',
        desc: '免费披风斗篷站。在游戏中穿任何你想要的斗篷和披风',
        link: 'https://minecraftcapes.net/'
      },
      {
        icon: '/mc/nav/04-23.jpg',
        title: '投影工坊',
        desc: '里面有很多生电使用的机器',
        link: 'https://www.mcimg.com/'
      },
      {
        icon: '/mc/nav/04-24.jpg',
        title: 'For-Minecraft',
        desc: '一个海外MC资源站',
        link: 'https://for-minecraft.com/'
      },
      {
        icon: '/mc/nav/04-25.jpg',
        title: 'Block Models',
        desc: '一个可以上传，分享和推广你的Minecraft方块模型的网站。',
        link: 'https://blockmodels.com/'
      },
      {
        icon: '/mc/nav/04-26.jpg',
        title: 'BolckMinecraft',
        desc: 'MCJE资源分享网站',
        link: 'https://www.blockminecraft.com/'
      },
      {
        icon: '/mc/nav/04-27.jpg',
        title: 'MC藏宝阁',
        desc: 'b站up开发的资源网站',
        link: 'https://mcbank.charhoo.cn/'
      },
      {
        icon: '/mc/nav/04-28.jpg',
        title: 'MGC中文图形站',
        desc: '共同探索MC图形学的无限可能。',
        link: 'https://minegraph.cn/'
      },
      {
        icon: '/mc/nav/04-29.jpg',
        title: 'AXDA 插件平台',
        desc: 'Nukkit插件平台，致敬传奇插件站ZXDA',
        link: 'https://axda.net/'
      },
      {
        icon: '/mc/nav/04-30.jpg',
        title: '公共蓝图库',
        desc: '存储公共蓝图，支持机械动力，建筑小帮手，投影蓝图，创世神蓝图，mcSchematic',
        link: 'https://www.mcschematic.top/'
      },
      {
        icon: '/mc/nav/04-31.jpg',
        title: '红石中继站',
        desc: '一个简洁轻快的Minecraft资源社区',
        link: 'https://www.mczwlt.net/'
      },
      {
        icon: '/mc/nav/04-32.jpg',
        title: '我的世界下载站',
        desc: '最全面的Minecraft资源站（自称）。',
        link: 'https://www.9minecraft.cn/'
      },
      {
        icon: '/mc/nav/04-33.jpg',
        title: 'Luna HD',
        desc: 'Luna HD资源包官网',
        link: 'https://www.lunahd.com/'
      },
      {
        icon: '/mc/nav/04-34.jpg',
        title: '像素茶艺地图站',
        desc: '简洁易用的MC地图资源站',
        link: 'https://pixelmap.minegraph.cn/'
      },
      {
        icon: '/mc/nav/04-35.jpg',
        title: 'Reden',
        desc: '在线生成世吞以及其他各类机器',
        link: 'https://redenmc.com/'
      },
      {
        icon: '/mc/nav/04-36.jpg',
        title: 'AtomResource',
        desc: '一个轻量的资源下载站',
        link: 'https://res.nullatom.com/'
      },
      {
        icon: '/mc/nav/04-37.jpg',
        title: 'AquaSource - 甘泉',
        desc: 'Minecraft版本库、联机软件，社区资源网页端',
        link: 'https://mc.mcscode.com/'
      },
      {
        icon: '/mc/nav/04-38.jpg',
        title: 'BBSMC',
        desc: '我的世界资源社区',
        link: 'https://bbsmc.net/'
      },
      {
        icon: '/mc/nav/04-39.jpg',
        title: '9Minecraft',
        desc: '国外的Minecraft免费资源网站',
        link: 'https://www.9minecraft.cn/'
      },
      {
        icon: '/mc/nav/04-40.jpg',
        title: 'Resourepacks24',
        desc: 'Minecraft材质包',
        link: 'https://resourepacks24.de/'
      },
      {
        icon: '/mc/nav/04-41.jpg',
        title: 'Geyser 间歇泉',
        desc: '允许 Minecraft 基岩版中的客户端加入到 Minecraft Java版服务器中',
        link: 'https://geysermc.org/'
      },
      {
        icon: '/mc/nav/04-42.jpg',
        title: 'Minecraft 版本库',
        desc: 'Minecraft 基岩版全版本下载站',
        link: 'https://zihao.fengqingwu.top/'
      }
    ]
  },
  {
    id: '05',
    title: '在线工具',
    items: [
      {
        icon: '/mc/nav/05-01.jpg',
        title: 'titleMC',
        desc: '用户名历史与皮肤查询',
        link: 'https://titlemc.com/'
      },
      {
        icon: '/mc/nav/05-02.jpg',
        title: 'MCID',
        desc: '查询游戏物品的各个版本的ID',
        link: 'http://mcid.lingningyu.cn/'
      },
      {
        icon: '/mc/nav/05-03.jpg',
        title: 'LittleSkin',
        desc: '知名老牌皮肤站，海量皮肤和披风',
        link: 'https://littleskin.cn/?ref=mcnav'
      },
      {
        icon: '/mc/nav/05-04.jpg',
        title: 'Code.org Minecraft',
        desc: '海外MC可视化编程平台',
        link: 'https://code.org/minecraft'
      },
      {
        icon: '/mc/nav/05-05.jpg',
        title: 'Pixilart',
        desc: '在线像素画工具',
        link: 'https://www.pixilart.com/'
      },
      {
        icon: '/mc/nav/05-06.jpg',
        title: 'Minecraft Skin Search',
        desc: '一个根据用户名查询皮肤的网站',
        link: 'https://mcskinsearch.com/'
      },
      {
        icon: '/mc/nav/05-07.jpg',
        title: 'Microsoft MakeCode for Minecraft',
        desc: '微软MakeCode项目的MC版，代码制作器',
        link: 'https://minecraft.makecode.com/'
      },
      {
        icon: '/mc/nav/05-08.jpg',
        title: 'Minecraft Servers',
        desc: '国外较为有名的服务器列表站',
        link: 'https://minecraftservers.org/'
      },
      {
        icon: '/mc/nav/05-09.jpg',
        title: 'MCRMB',
        desc: '自动处理服务器捐助',
        link: 'http://www.mcrmb.com/'
      },
      {
        icon: '/mc/nav/05-10.jpg',
        title: 'MinecraftTools',
        desc: '各种MC工具合集',
        link: 'https://minecraft.tools/'
      },
      {
        icon: '/mc/nav/05-11.jpg',
        title: 'HelloSkin皮肤站',
        desc: '免费、快捷的MC皮肤站',
        link: 'https://helloskin.cn/'
      },
      {
        icon: '/mc/nav/05-12.jpg',
        title: 'GetBukkit',
        desc: '快捷获取Bukkit及Spigot',
        link: 'https://getbukkit.org/'
      },
      {
        icon: '/mc/nav/05-13.jpg',
        title: 'ChunkBase',
        desc: '区块查询/种子地图',
        link: 'https://www.chunkbase.com/apps/'
      },
      {
        icon: '/mc/nav/05-14.jpg',
        title: '2M短域名',
        desc: '公益、免费、简单的Minecraft短域名获取工具',
        link: 'https://2m.pub/'
      },
      {
        icon: '/mc/nav/05-15.jpg',
        title: '我的世界服务器查询网',
        desc: '我的世界服务器查询网，这是Minecraft服务器状态查询网站，这里可以查询到来自全球各地大部分我的世界服务器',
        link: 'https://list.mczfw.cn/'
      },
      {
        icon: '/mc/nav/05-16.jpg',
        title: 'TextCraft',
        desc: 'MC风格文字Logo生成网站',
        link: 'https://textcraft.net/'
      },
      {
        icon: '/mc/nav/05-17.jpg',
        title: 'sandclocks',
        desc: '一个自制数据包的网站',
        link: 'https://www.sandclocks.cn/'
      },
      {
        icon: '/mc/nav/05-18.jpg',
        title: 'Seeder',
        desc: '快速查询种子地图/结构位置',
        link: 'https://www.mcseeder.com/'
      },
      {
        icon: '/mc/nav/05-19.jpg',
        title: 'Spritecraft',
        desc: '生成像素画',
        link: 'https://autosaved.org/Spritecraft'
      },
      {
        icon: '/mc/nav/05-20.jpg',
        title: 'PocketMine Tools',
        desc: '支持打包解包、API注入、Poggit检索等各种各样PM功能！',
        link: 'https://pmt.nathfreder.dev/'
      },
      {
        icon: '/mc/nav/05-21.jpg',
        title: 'PHAR 在线存档',
        desc: '在线phar打包解包服务',
        link: 'https://phar.scer.io/'
      },
      {
        icon: '/mc/nav/05-22.jpg',
        title: 'NovaSkin',
        desc: '自定义皮肤生成壁纸',
        link: 'http://minecraft.novaskin.me/wallpapers'
      },
      {
        icon: '/mc/nav/05-23.jpg',
        title: 'MC Map Item Tool',
        desc: '想在 Minecraft 地图上拥有自己的图像？只需使用这个工具！',
        link: 'https://mc-map.djfun.de/#'
      },
      {
        icon: '/mc/nav/05-24.jpg',
        title: 'MCUUID',
        desc: '查找、转换和解析 Minecraft 用户名和 UUID 的最简单方式！',
        link: 'https://mcuuid.net/'
      },
      {
        icon: '/mc/nav/05-25.jpg',
        title: 'McSounds',
        desc: '丰富的MC音效在线收听！',
        link: 'http://o.xbottle.top/mcsounds/'
      },
      {
        icon: '/mc/nav/05-26.jpg',
        title: 'Minotar',
        desc: '非常快速和简单的 Minecraft 头像 API',
        link: 'https://minotar.net/'
      },
      {
        icon: '/mc/nav/05-27.jpg',
        title: 'MapartCraft',
        desc: '像素画生成器',
        link: 'https://rebane2001.com/mapartcraft/zh-Hans'
      },
      {
        icon: '/mc/nav/05-28.jpg',
        title: 'Minecraft Heads',
        desc: 'MC装饰头颅收集站，Minecraft Heads是一个有趣的网站，它收集了大量Minecraft装饰性头颅',
        link: 'https://minecraft-heads.com/'
      },
      {
        icon: '/mc/nav/05-29.jpg',
        title: 'GameGeeks',
        desc: '一个有很多实用工具的minecraft站',
        link: 'https://www.gamergeeks.net/apps/minecraft'
      },
      {
        icon: '/mc/nav/05-30.jpg',
        title: 'MCCAG',
        desc: '轻松制作出可爱的MC头像',
        link: 'https://mccag.cn/'
      },
      {
        icon: '/mc/nav/05-31.jpg',
        title: 'Celestia Skin',
        desc: '多年历史的皮肤站，长期运营，快如闪电！',
        link: 'https://celestia.skin/'
      },
      {
        icon: '/mc/nav/05-32.jpg',
        title: 'Colorize FUN',
        desc: 'Minecraft像素风格多彩文本生成器，一个简单好用、功能强大的Minecraft像素风格多彩文本生成器',
        link: 'https://colorize.fun/minecraft'
      },
      {
        icon: '/mc/nav/05-33.jpg',
        title: 'BedRock Dev',
        desc: '一个简洁好用的Minecraft基岩版文档站',
        link: 'https://bedrock.dev/'
      },
      {
        icon: '/mc/nav/05-34.jpg',
        title: 'BlackBE',
        desc: '我的世界基岩版云黑名单系统',
        link: 'https://blackbe.work/'
      },
      {
        icon: '/mc/nav/05-35.jpg',
        title: 'MC.JS 网页版 MC 中文优化版',
        desc: '在临时电脑上快速体验 MC 中文版，不用下载直接玩！',
        link: 'https://www.mc.js.cool/'
      },
      {
        icon: '/mc/nav/05-36.jpg',
        title: 'mclo.gs MC日志分析',
        desc: '快速分析你的各类MC错误日志！',
        link: 'https://mclo.gs/'
      },
      {
        icon: '/mc/nav/05-37.jpg',
        title: 'Webmc Launcher',
        desc: '简洁好用的网页版MC',
        link: 'https://webmc.xyz/'
      },
      {
        icon: '/mc/nav/05-38.jpg',
        title: 'Seed Map Viewer',
        desc: '在线Minecraft种子地图查看器和种子查找器',
        link: 'https://mcseedmap.net/'
      },
      {
        icon: '/mc/nav/05-39.jpg',
        title: 'Minecraft艺术',
        desc: '为你快速生成各种MC艺术作品，辅助制作像2D素画、3D雕像、以及红石音乐',
        link: 'https://mcpixelart.com/'
      },
      {
        icon: '/mc/nav/05-40.jpg',
        title: 'Custom Totem Skin',
        desc: '一个制作不死图腾材质包的网站',
        link: 'https://spea.cc/totem/'
      },
      {
        icon: '/mc/nav/05-41.jpg',
        title: 'Minecraft Skins',
        desc: '有着丰富的皮肤资源，以及一些使用的皮肤工具',
        link: 'https://mcskins.top/'
      },
      {
        icon: '/mc/nav/05-42.jpg',
        title: '3D Minecraft 风格 Logo 生成',
        desc: '3D Minecraft 风格 Logo 生成，一个可以便捷生成 3D Minecraft 风格 Logo 的网站',
        link: 'https://3dtext.easecation.net/'
      },
      {
        icon: '/mc/nav/05-43.jpg',
        title: 'Minecraft PFP',
        desc: '一个开源的MC像素头像生成器，可以切换背景，保存到电脑或者下载',
        link: 'https://www.minecraftpfp.com/'
      },
      {
        icon: '/mc/nav/05-44.jpg',
        title: 'Minecraft Server Status',
        desc: '快速获取任何Minecraft服务器的状态',
        link: 'https://mcstatus.io/'
      },
      {
        icon: '/mc/nav/05-45.jpg',
        title: '方块字标志牌生成器',
        desc: '为告示牌文字生成较大的字体，还在因为看不清告示牌上蚂蚁般的字而烦恼？这个网站可以解决这个困扰玩家许久的问题！',
        link: 'https://kqakqakqa.github.io/utf-block-sign-art/'
      },
      {
        icon: '/mc/nav/05-46.jpg',
        title: 'SkinMC',
        desc: '我的世界皮肤检索平台',
        link: 'https://skinmc.net/'
      },
      {
        icon: '/mc/nav/05-47.jpg',
        title: 'ArmorTrims',
        desc: '盔甲纹饰预览，可以预览盔甲锻造纹饰',
        link: 'https://armortrims.com/'
      },
      {
        icon: '/mc/nav/05-48.jpg',
        title: 'MC 服务器状态查询',
        desc: '一个强大的Minecrft服务器状态查询工具站',
        link: 'https://motd.minebbs.com/'
      },
      {
        icon: '/mc/nav/05-49.jpg',
        title: 'McIcons',
        desc: 'minecraft图像下载网站，MCICONS是一个丰富的MC图库网站。在这里，你不仅可以下载到原版MC及其衍生作的物品、结构、标题以及背景板等等的图标，而且还可以自定义编辑图像和MC皮肤图像渲染然后获取相关图像',
        link: 'https://mcicons.ccleaf.com/'
      },
      {
        icon: '/mc/nav/05-50.jpg',
        title: 'GMCT 我的世界命令生成器',
        desc: '甘小蔗我的世界命令生成器，我的世界命令生成器，支持自定义背景，更新成书 JON 与实体骑乘!深色主题支持，再也不怕亮瞎眼啦!',
        link: 'https://mc.metamo.cn/gmct/?v=5.3'
      },
      {
        icon: '/mc/nav/05-51.jpg',
        title: 'flags.sh',
        desc: 'Java 版服务器生成启动脚本，flags.sh.cn 为你的 Minecraft Java 版服务器生成启动脚本。它具有上手即用的简单配置、许多用于优化的参数类型和预制的参数！',
        link: 'http://flags.sh.cn/'
      },
      {
        icon: '/mc/nav/05-52.jpg',
        title: 'Minecraft Skin Editor',
        desc: '简洁易用的在线皮肤编辑器！在这里，您可以免费编辑或下载Minecraft的皮肤。 在该网站上，您不仅可以为Minecraft创建皮肤，还可以与我们的大型游戏社区共享您的皮肤。',
        link: 'https://minecraft-skin-editor.com/cn/'
      },
      {
        icon: '/mc/nav/05-53.jpg',
        title: 'Aternos 免费服务器',
        desc: '一个制作服务器的网站，有点卡，只有性能好的人才能承受',
        link: 'https://aternos.org/:zh-CN/'
      },
      {
        icon: '/mc/nav/05-54.jpg',
        title: 'MC Map Item Tool',
        desc: '通过地图来实现在我的世界中的自定义图片！使用图片生成Minecraft地图！',
        link: 'https://mc-map.djfun.de/'
      },
      {
        icon: '/mc/nav/05-55.jpg',
        title: '史莱姆区块查找',
        desc: '还在为找不到史莱姆区块烦恼？这个网站为你解决问题!',
        link: 'https://mclt.cn/'
      },
      {
        icon: '/mc/nav/05-56.jpg',
        title: 'UUID生成器',
        desc: '一款简单好用的UUID 生成器。',
        link: 'https://uuid.yunser.com/gen/'
      },
      {
        icon: '/mc/nav/05-57.jpg',
        title: 'MCBEID表',
        desc: '一款可以查询 Minecraft 基岩版命令相关ID的网站',
        link: 'https://ca.projectxero.top/idlist/'
      }
    ]
  },
  {
    id: '06',
    title: '实用软件',
    items: [
      {
        icon: '/mc/nav/06-01.jpg',
        title: 'Sakura Frp',
        desc: '好用的内网穿透，这是一位叫 Akkariin 的大佬开发的作品。并它为用户提供类似花生壳、路由侠的内网穿透服务，并且免费。它可以帮助我们用自己的家用宽带来搭建服务器、创办网站，或是用于远程管理家中的设备',
        link: 'https://www.natfrp.com/'
      },
      {
        icon: '/mc/nav/06-02.jpg',
        title: 'OptFine',
        desc: 'MC显示优化模组，OptiFine 是一个 Minecraft 优化模组。它允许 Minecraft 运行得更快，看起来更好，完全支持高清纹理和许多配置选项。',
        link: 'https://optifine.net/'
      },
      {
        icon: '/mc/nav/06-03.jpg',
        title: 'WorldPainter',
        desc: 'MC地形制作软件，WorldPainter 是 Minecraft 的交互式地图生成器。它允许您使用与常规绘画程序类似的工具“绘制”风景',
        link: 'https://www.worldpainter.net/'
      },
      {
        icon: '/mc/nav/06-04.jpg',
        title: 'Replay Mod 录像回放',
        desc: '一个 Minecraft Mod，用于记录、重温和分享您的体验。',
        link: 'https://www.replaymod.com/'
      },
      {
        icon: '/mc/nav/06-05.jpg',
        title: 'Radmin LAN',
        desc: '类似hamachi的虚拟局域网软件，同一局域网支持100台设备。',
        link: 'https://www.radmin.com/'
      },
      {
        icon: '/mc/nav/06-06.jpg',
        title: 'Panda Frp',
        desc: '免费的Frp内网穿透',
        link: 'https://tryzth.com/'
      },
      {
        icon: '/mc/nav/06-07.jpg',
        title: '木韩内网穿透',
        desc: '免费的frp内网穿透网站，一共22个免费节点，公益frp内网穿透软件',
        link: 'https://muhanfrp.cn/'
      },
      {
        icon: '/mc/nav/06-08.jpg',
        title: 'MCEdit',
        desc: 'MC存档世界编辑器，MCEdit是一个为Minecraft保存的游戏编辑器。',
        link: 'https://www.mcedit.net/'
      },
      {
        icon: '/mc/nav/06-09.jpg',
        title: 'Mine-imator',
        desc: 'MC动画制作软件',
        link: 'https://www.mineimator.com/'
      },
      {
        icon: '/mc/nav/06-10.jpg',
        title: 'MCreator',
        desc: '模组制作软件，MCreator 是开源软件，用于使用直观易学的界面或集成代码编辑器制作 Minecraft Java 版模组、基岩版附加组件和数据包。',
        link: 'https://mcreator.net/'
      },
      {
        icon: '/mc/nav/06-11.jpg',
        title: 'Hamachi',
        desc: '组建虚拟局域网，Hamachi是一种桌面工具，可在多个远程计算机之间创建和管理 VPN（虚拟专用网络）。',
        link: 'https://hamachi.en.softonic.com/'
      },
      {
        icon: '/mc/nav/06-12.jpg',
        title: 'Amulate 世界编辑器',
        desc: '新时代MC世界编辑、转换器， 支持自 Java 1.12 和基岩 1.7 以来的每一个版本。',
        link: 'https://www.amuletmc.com/'
      },
      {
        icon: '/mc/nav/06-13.jpg',
        title: 'Universal Minecraft Tool',
        desc: '转换和编辑 Minecraft 世界',
        link: 'https://www.universalminecraftconverter.com/'
      },
      {
        icon: '/mc/nav/06-14.jpg',
        title: 'OPENNBS',
        desc: '开源nbs音乐编辑，Minecraft Note Block Studio的一个开源延续，具有令人兴奋的新功能!',
        link: 'https://opennbs.org/'
      },
      {
        icon: '/mc/nav/06-15.jpg',
        title: 'Minecraft 命令行客户端',
        desc: 'Minecraft虚拟玩家(Fake Player)客户端',
        link: 'https://mccteam.github.io/l10n/zh-Hans/'
      },
      {
        icon: '/mc/nav/06-16.jpg',
        title: 'Iris Shaders 开源光影模组',
        desc: '新一代的开源光影模组，与Sodium兼容的光影前置模组Iris的官网！',
        link: 'https://irisshaders.dev/'
      },
      {
        icon: '/mc/nav/06-17.jpg',
        title: 'HAL 联机工具',
        desc: '免费，开放接入，公益的联机模块',
        link: 'https://hal.xizh.cn/'
      },
      {
        icon: '/mc/nav/06-18.jpg',
        title: 'Chunker',
        desc: '强大的 Minecraft 世界转换器',
        link: 'https://chunker.app/'
      },
      {
        icon: '/mc/nav/06-19.jpg',
        title: 'Chunky 地图渲染器',
        desc: 'Chunky 是一个强大的地图渲染器，可以制作非常精美的游戏渲染图，尤其在制作一些宏大场景的渲染图时十分方便。',
        link: 'https://chunky.lemaik.de/'
      },
      {
        icon: '/mc/nav/06-20.jpg',
        title: 'BlueMap',
        desc: '一种 Minecraft 映射工具，用于创建 Minecraft 世界的 3D 模型并将其显示在 Web 查看器中。',
        link: 'https://bluemap.bluecolored.de/'
      },
      {
        icon: '/mc/nav/06-21.jpg',
        title: 'ServerPackCreator',
        desc: '快速轻松地生成您最喜欢的 Minecraft 整合包的服务器包',
        link: 'https://serverpackcreator.de/#/'
      },
      {
        icon: '/mc/nav/06-22.jpg',
        title: 'World Machine 进阶3D地形生成器',
        desc: '进阶版Minecraft地形编辑器',
        link: 'https://www.world-machine.com/'
      },
      {
        icon: '/mc/nav/06-23.jpg',
        title: 'Minecraft Server Launcher',
        desc: '易用的MC开服器，我的世界开服器，一键式开服，简单快捷！',
        link: 'https://www.mslmc.cn/'
      },
      {
        icon: '/mc/nav/06-24.jpg',
        title: 'MineBackup – 存档时光机',
        desc: '强大的存档备份及管理工具，以其丰富的功能和通用性著称',
        link: 'https://github.com/Leafuke/MineBackup'
      },
      {
        icon: '/mc/nav/06-25.jpg',
        title: 'MCSTools',
        desc: '功能强大的蓝图辅助工具，支持 香草结构 建筑小帮手 建筑投影 创世神,提供分割，转换，方块替换等功能',
        link: 'https://docs.mcschematic.top/zh/'
      },
      {
        icon: '/mc/nav/06-26.jpg',
        title: 'Blockbench',
        desc: '免费、强大的模型编辑软件！',
        link: 'https://www.blockbench.net/'
      },
      {
        icon: '/mc/nav/06-27.jpg',
        title: 'OpenFrp 开放映射',
        desc: '免费开放、高效便捷的内网穿透工具',
        link: 'https://www.openfrp.net/'
      },
      {
        icon: '/mc/nav/06-28.jpg',
        title: 'NatGo 端口映射',
        desc: '免费且不报毒的内网穿透，自主研发的免费内网穿透，和花生壳一样自带软件防火墙，监控系统，已通过各家杀毒软件的认证，并且入驻联想应用商店',
        link: 'https://www.natgo.cn/'
      },
      {
        icon: '/mc/nav/06-29.jpg',
        title: 'MCSkinn Legacy',
        desc: '适用于 Windows 的现代化 Minecraft 3D 皮肤管理器/编辑器',
        link: 'https://apps.microsoft.com/detail/9n8sjt329hh1?hl=zh-cn&gl=CN'
      },
      {
        icon: '/mc/nav/06-30.jpg',
        title: 'Mod Manager',
        desc: '一个基于Qt的Minecraft Mod管理器，可以管理、更新与下载Mod。',
        link: 'https://github.com/kaniol-lck/modmanager'
      }
    ]
  },
  {
    id: '07',
    title: '面板',
    items: [
      {
        icon: '/mc/nav/07-01.jpg',
        title: 'Serein',
        desc: '新时代极简服务器面板，极简、极强兼容性的新时代面板',
        link: 'https://serein.cc/'
      },
      {
        icon: '/mc/nav/07-02.jpg',
        title: 'Pterodactyl',
        desc: '强大开源安全免费的游戏面板',
        link: 'https://pterodactyl.io/'
      },
      {
        icon: '/mc/nav/07-03.jpg',
        title: 'Multicraft',
        desc: '强大的服务器面版',
        link: 'https://multicraft.org/'
      },
      {
        icon: '/mc/nav/07-04.jpg',
        title: 'MCSManager',
        desc: '优秀的服务端面板，稳定可靠 ，轻量级和开箱即用的 Minecraft 服务端管理面板',
        link: 'http://mcsmanager.com/'
      },
      {
        icon: '/mc/nav/07-05.jpg',
        title: 'EasilyPanel5',
        desc: '新一代服务器管理工具，跨平台通用游戏服务器管理工具。一个功能强大、易于使用的游戏服务器管理面板，支持 Minecraft服务端下载哦、内网穿透、Java环境管理等功能。',
        link: 'https://ep.easilymc.fun/'
      }
    ]
  },
  {
    id: '08',
    title: '启动器&客户端',
    items: [
      {
        icon: '/mc/nav/08-01.jpg',
        title: 'HMCL',
        desc: 'Hello Minecraft! Launcher 一个强大的MC启动器',
        link: 'https://hmcl.huangyuhui.net/'
      },
      {
        icon: '/mc/nav/08-02.jpg',
        title: 'PCL2 – Plain Craft Launcher 2 启动器',
        desc: '下载极快的启动器',
        link: 'https://ifdian.net/p/e5c821a4b1ab11eb879b52540025c377'
      },
      {
        icon: '/mc/nav/08-03.jpg',
        title: 'PCL2 CE - PCL社区版',
        desc: '基于龙腾猫跃 PCL2 构建的社区版本，为 Minecraft 玩家提供最好的游戏体验。',
        link: 'https://pclce-web.demo.fis.ink/'
      },
      {
        icon: '/mc/nav/08-04.jpg',
        title: 'Multimc',
        desc: '轻松管理 Minecraft 实例。必须使用正版登录的启动器，其优秀的多整合包管理系统，以及合理的更目录设计不同于hmcl的目录，更加便于管理。',
        link: 'https://multimc.org/'
      },
      {
        icon: '/mc/nav/08-05.jpg',
        title: 'LunarCilent',
        desc: '知名Mod客户端，LunarCilent 是一个一体式的模组包，可用于 Minecraft 的所有版本，通过为您提供所有你最喜欢的模组，配置和装扮，提高你的游戏体验！',
        link: 'https://www.lunarclient.com/'
      },
      {
        icon: '/mc/nav/08-06.jpg',
        title: 'Feather Client',
        desc: '拥有Forge的pvp客户端',
        link: 'https://feathermc.com/'
      },
      {
        icon: '/mc/nav/08-07.jpg',
        title: 'LiquidBounce',
        desc: '水影客户端/模组官网',
        link: 'https://liquidbounce.net/'
      },
      {
        icon: '/mc/nav/08-08.jpg',
        title: 'BakaXL',
        desc: '新一代丧病启动器。BakaXL官方版启动器是一款专门用于快速启动我的世界游戏的启动工具，支持启动后自动加入服务器，联机更方便。同时提供了版本分离和游戏时间统计功能。',
        link: 'https://www.bakaxl.com/'
      },
      {
        icon: '/mc/nav/08-09.jpg',
        title: '燕子启动器',
        desc: '一款专注我的世界的游戏启动器',
        link: 'https://yzgzs.top/yzqdq'
      },
      {
        icon: '/mc/nav/08-10.jpg',
        title: 'FCL - Fold Craft Launcher',
        desc: 'Android平台的Java版MC启动器',
        link: 'https://fcl-team.github.io/index.html'
      },
      {
        icon: '/mc/nav/08-11.jpg',
        title: 'XMCL',
        desc: '一个方便你管理大量的模组、纹理包的的现代化启动器',
        link: 'https://xmcl.app/'
      },
      {
        icon: '/mc/nav/08-12.jpg',
        title: 'Prism Launcher',
        desc: '开源 Minecraft 启动器，能够管理多个实例、帐户和mod',
        link: 'https://prismlauncher.org/'
      },
      {
        icon: '/mc/nav/08-13.jpg',
        title: 'Salwyrr Launcher',
        desc: '超强优化客户端启动器',
        link: 'https://www.salwyrr.com/'
      },
      {
        icon: '/mc/nav/08-14.jpg',
        title: 'HML启动器',
        desc: '(HML启动器)是一个版本高速下载,自带联机等多功能我的世界启动器。',
        link: 'https://hml.xizh.cn/'
      },
      {
        icon: '/mc/nav/08-15.jpg',
        title: 'FPSMaster',
        desc: '免费，简洁，好用的PVP客户端',
        link: 'https://fpsmaster.top/'
      },
      {
        icon: '/mc/nav/08-16.jpg',
        title: 'BMCL',
        desc: 'bangbang93的Minercaft启动器，也是让你极速下载minecraft文件的发源地！',
        link: 'https://www.mcbbs.net/thread-137254-1-1.html'
      },
      {
        icon: '/mc/nav/08-17.jpg',
        title: 'LauncherX',
        desc: '功能强大、界面优美的下一代 MineCraft 启动器。',
        link: 'https://corona.studio/lx'
      },
      {
        icon: '/mc/nav/08-18.jpg',
        title: 'ATLauncher',
        desc: 'Minecraft 的 Modpack 启动器',
        link: 'https://atlauncher.com/'
      },
      {
        icon: '/mc/nav/08-19.jpg',
        title: 'MCServerLauncher 2开服器',
        desc: 'MCSL2开服器官网。MCServerLauncher 2（MCSL2）是一个简洁全能易上手的Minecraft服务器启动器，集搭服、开服、资源下载、自研插件系统于一身。',
        link: 'https://mcsl.com.cn/'
      },
      {
        icon: '/mc/nav/08-20.jpg',
        title: 'Polymerium',
        desc: '使用全新资源管理架构的启动器',
        link: 'https://github.com/d3ara1n/Polymerium'
      },
      {
        icon: '/mc/nav/08-21.jpg',
        title: 'GDLauncher',
        desc: 'GDLauncher 是一款简单但功能强大的 Minecraft 自定义启动器',
        link: 'https://gdlauncher.com/'
      },
      {
        icon: '/mc/nav/08-22.jpg',
        title: 'Badlion',
        desc: '我的世界知名Mod客户端',
        link: 'https://www.badlion.net/'
      },
      {
        icon: '/mc/nav/08-23.jpg',
        title: 'Nsiso启动器',
        desc: '一款高效的Minecraft启动器',
        link: 'https://www.nsiso.com/launcher/index.html'
      },
      {
        icon: '/mc/nav/08-24.jpg',
        title: 'Pojav Launcher',
        desc: '海外知名手机Java启动器。国外持续更新的手机Java启动器 支持模组和少部分光影 全版本 下载文件需正版',
        link: 'https://github.com/PojavLauncherTeam/PojavLauncher'
      },
      {
        icon: '/mc/nav/08-25.jpg',
        title: 'Bedrock Launcher Lite',
        desc: '一个支持基岩版全版本的我的世界启动器',
        link: 'https://bedrocklauncher.github.io/'
      },
      {
        icon: '/mc/nav/08-26.jpg',
        title: 'FSM3',
        desc: 'C#编写的多功能启动器',
        link: 'https://fsmlauncher.github.io/'
      }
    ]
  },
  {
    id: '09',
    title: '服务端',
    items: [
      {
        icon: '/mc/nav/09-01.jpg',
        title: 'Bedrock Dedicated Server',
        desc: '官方全特性基岩服务端',
        link: 'https://www.minecraft.net/download/server/bedrock'
      },
      {
        icon: '/mc/nav/09-02.jpg',
        title: 'Bukkit',
        desc: '创建服务端插件的API',
        link: 'https://bukkit.org/'
      },
      {
        icon: '/mc/nav/09-03.jpg',
        title: 'Spigot',
        desc: 'Bukkit的分支服务端',
        link: 'https://www.spigotmc.org/'
      },
      {
        icon: '/mc/nav/09-04.jpg',
        title: 'PaperMC',
        desc: '下一代JE服务端，与 Spigot 插件兼容，提供不妥协的性能。',
        link: 'https://papermc.io/'
      },
      {
        icon: '/mc/nav/09-05.jpg',
        title: 'MohistMC',
        desc: '墨端服务器核心，支持forge和paper',
        link: 'https://mohistmc.com/'
      },
      {
        icon: '/mc/nav/09-06.jpg',
        title: 'LiteLoader',
        desc: 'MC Java版轻量 Mod API',
        link: 'http://www.liteloader.com/'
      },
      {
        icon: '/mc/nav/09-07.jpg',
        title: 'Forge',
        desc: '老牌模组加载器官网',
        link: 'https://www.minecraftforge.net/'
      },
      {
        icon: '/mc/nav/09-08.jpg',
        title: 'Fabric',
        desc: '轻量的mod服务端',
        link: 'https://fabricmc.net/'
      },
      {
        icon: '/mc/nav/09-09.jpg',
        title: 'SpongePowered',
        desc: '终极优化的Java版服务端',
        link: 'https://www.spongepowered.org/'
      },
      {
        icon: '/mc/nav/09-10.jpg',
        title: 'QuiltMC',
        desc: 'Fabric的分支，兼容Fabric模组的新兴加载器',
        link: 'https://quiltmc.org/'
      },
      {
        icon: '/mc/nav/09-11.jpg',
        title: 'Pufferfish',
        desc: '我的世界高版本服务端核心，paper、purpur的分支',
        link: 'https://pufferfish.host/downloads'
      },
      {
        icon: '/mc/nav/09-12.jpg',
        title: 'Purpur',
        desc: 'paper分支，新奇的服务端',
        link: 'https://purpurmc.org/'
      },
      {
        icon: '/mc/nav/09-13.jpg',
        title: 'PowerNukkit',
        desc: 'Nukkit分支服务端',
        link: 'https://powernukkit.org/'
      },
      {
        icon: '/mc/nav/09-14.jpg',
        title: 'PMMP',
        desc: '经典的基岩版第三方服务端',
        link: 'https://pmmp.io/'
      },
      {
        icon: '/mc/nav/09-15.jpg',
        title: 'NeoForged',
        desc: 'Forge的新兴分支',
        link: 'https://neoforged.net/'
      },
      {
        icon: '/mc/nav/09-16.jpg',
        title: 'Nukkit',
        desc: '高性能基岩版服务端',
        link: 'https://cloudburstmc.org/articles/'
      },
      {
        icon: '/mc/nav/09-17.jpg',
        title: 'Leaves',
        desc: '纯净，专为生电设计。Leaves 是基于 Paper 的 Minecraft 服务端，旨在修复被破坏的原版特性。',
        link: 'https://leavesmc.org/'
      },
      {
        icon: '/mc/nav/09-18.jpg',
        title: 'LeviLamina',
        desc: '重量级的BDS插件加载器。LeviLamina是一个轻量、模块化和多功能的MCBE官方服务端插件加载器，前身为LiteLoaderBDS。',
        link: 'https://levilamina.liteldev.com/'
      },
      {
        icon: '/mc/nav/09-19.jpg',
        title: 'Cuberite',
        desc: '一款轻量级、快速且可扩展的游戏服务器',
        link: 'https://cuberite.org/'
      },
      {
        icon: '/mc/nav/09-20.jpg',
        title: 'Leaf',
        desc: '高性能 Minecraft 服务端核心',
        link: 'https://www.leafmc.one/zh/'
      },
      {
        icon: '/mc/nav/09-21.jpg',
        title: 'CatServer',
        desc: '一个高性能Bukkit和Forge混合的minecraft服务端',
        link: 'https://catmc.org/'
      }
    ]
  },
  {
    id: '10',
    title: '工作室&团队',
    items: [
      {
        icon: '/mc/nav/10-01.jpg',
        title: '星屹（CTN）工作室',
        desc: '星屹（CTN）工作室是一个创建于2018年1月的Minecraft工作室，致力于创造更多的优秀Minecraft作品。',
        link: 'https://www.ctnstudios.top/'
      },
      {
        icon: '/mc/nav/10-02.jpg',
        title: '史诗工坊 EpicWork',
        desc: 'Epicwork（史诗工坊）团队是以”传播中华建筑文化“为目标的国内非盈利玩家成员团体。',
        link: 'https://space.bilibili.com/328513'
      },
      {
        icon: '/mc/nav/10-03.jpg',
        title: 'TIS团队',
        desc: '玄冰工作室（Thick Ice Studio，一般简称TIS），TIS团队成立于2014年9月19日，主要制作Minecraft各式资源，以建筑地图。',
        link: 'https://space.bilibili.com/388405501'
      },
      {
        icon: '/mc/nav/10-04.jpg',
        title: '太学 Taixue',
        desc: '太学是 Minecraft 中国古建筑教学 - 建筑组织，成立于2017年1月29日。',
        link: 'https://space.bilibili.com/476720255'
      }
    ]
  },
  {
    id: '11',
    title: '黑客端',
    items: [
      {
        icon: '/mc/nav/11-01.jpg',
        title: 'LiquidBounce Client',
        desc: '水影客户端官网',
        link: 'https://liquidbounce.net/'
      },
      {
        icon: '/mc/nav/11-02.jpg',
        title: 'Wurst Client',
        desc: 'Wurst客户端官网',
        link: 'https://wurstclient.net/'
      },
      {
        icon: '/mc/nav/11-03.jpg',
        title: 'Meteor Client',
        desc: '彗星客户端官网',
        link: 'https://meteorclient.com/'
      },
      {
        icon: '/mc/nav/11-04.jpg',
        title: 'Future Client',
        desc: 'Future客户端官网',
        link: 'https://www.futureclient.net/'
      },
      {
        icon: '/mc/nav/11-05.jpg',
        title: 'Mio Client',
        desc: 'Mio客户端官网',
        link: 'https://mioclient.me/'
      },
      {
        icon: '/mc/nav/11-06.jpg',
        title: 'Inertia Client (WWE Client)',
        desc: 'Ineria客户端官网',
        link: 'https://inertiaclient.com/'
      },
      {
        icon: '/mc/nav/11-07.jpg',
        title: 'Impact Client',
        desc: 'Impact客户端官网',
        link: 'https://impactclient.net/'
      },
      {
        icon: '/mc/nav/11-08.jpg',
        title: 'Envy Client',
        desc: 'Envy客户端官网',
        link: 'https://envyclient.com/'
      },
      {
        icon: '/mc/nav/11-09.png',
        title: 'Vape Client',
        desc: 'Vape客户端官网',
        link: 'https://Vape.gg/'
      },
      {
        icon: '/mc/nav/11-10.jpg',
        title: 'Vapu Client',
        desc: 'Vapu客户端官网',
        link: 'https://getvapu.today/'
      },
      {
        icon: '/mc/nav/11-11.jpg',
        title: 'Flux Client By Margele',
        desc: 'Flux客户端官网',
        link: 'https://flux.today/'
      },
      {
        icon: '/mc/nav/11-12.jpg',
        title: 'Astolfo Client',
        desc: 'Astolfo客客户端官网',
        link: 'https://astolfo.lgbt/'
      },
      {
        icon: '/mc/nav/11-13.jpg',
        title: 'Power - PowerX Client',
        desc: 'PowerX客户端官网',
        link: 'https://powerclient.cn/'
      },
      {
        icon: '/mc/nav/11-14.jpg',
        title: 'Rise Client',
        desc: 'Rise客户端官网',
        link: 'https://riseclient.com/'
      },
      {
        icon: '/mc/nav/11-15.jpg',
        title: 'FDP Client',
        desc: 'FDP客户端官网',
        link: 'https://fdpinfo.github.io/next/'
      },
      {
        icon: '/mc/nav/11-16.jpg',
        title: 'Naven Client',
        desc: 'Naven客户端官网',
        link: 'https://naven.today/'
      },
      {
        icon: '/mc/nav/11-17.jpg',
        title: 'NightX Client',
        desc: 'NightX客户端官网',
        link: 'https://github.com/Aspw-w/NightX-Client'
      },
      {
        icon: '/mc/nav/11-18.jpg',
        title: 'MoonX Client',
        desc: 'MoonX客户端官网',
        link: 'https://moonx.gg/'
      },
      {
        icon: '/mc/nav/11-19.jpg',
        title: 'Opai Client',
        desc: 'Opai客户端官网',
        link: 'https://opai.today/'
      },
      {
        icon: '/mc/nav/11-20.jpg',
        title: 'LeaveH Client',
        desc: 'LeaveH客户端官网',
        link: 'https://getleave.org/'
      }
    ]
  }
]
