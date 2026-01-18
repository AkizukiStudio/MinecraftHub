<!-- 内容搜索组件 - 搜索动态内容卡片 -->
<template>
  <div class="content-search">
    <!-- 搜索部分 -->
    <div class="search-container">
      <div class="search-wrapper">
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="text"
          :placeholder="placeholder"
          class="search-input"
          @input="handleSearch"
          @keyup.enter="handleSearchImmediate"
        />
        <button 
          v-if="searchQuery" 
          class="clear-btn" 
          @click="clearSearch"
          aria-label="清除搜索"
        >
          ×
        </button>
        <button 
          class="search-btn" 
          @click="handleSearchImmediate"
          aria-label="搜索"
        >
          <slot name="search-icon">
            <svg class="search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </slot>
        </button>
      </div>
      
      <!-- 搜索结果统计 -->
      <div v-if="showResultsInfo && searchQuery" class="results-info">
        <span class="results-text">
          找到 {{ resultsCount }} 个结果
          <span class="search-query">"{{ searchQuery }}"</span>
        </span>
        <button 
          class="clear-results-btn"
          @click="clearSearch"
        >
          清除搜索
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// 组件属性
const props = defineProps({
  placeholder: {
    type: String,
    default: '搜索内容...'
  },
  debounceDelay: {
    type: Number,
    default: 300
  },
  initialSearch: {
    type: String,
    default: ''
  },
  showResultsInfo: {
    type: Boolean,
    default: true
  },
  autoFocus: {
    type: Boolean,
    default: false
  },
  // 搜索配置
  searchFields: {
    type: Array,
    default: () => ['data-title', 'data-description', 'data-content', 'data-tags']
  },
  cardSelector: {
    type: String,
    default: '.content-card, [data-card]'
  }
})

// 发射事件
const emit = defineEmits(['search', 'change', 'results'])

// 响应式数据
const searchQuery = ref(props.initialSearch)
const debounceTimer = ref(null)
const searchInputRef = ref(null)
const resultsCount = ref(0)

// 处理搜索输入（带防抖）
const handleSearch = () => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  
  debounceTimer.value = setTimeout(() => {
    performSearch()
  }, props.debounceDelay)
}

// 立即执行搜索
const handleSearchImmediate = () => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  performSearch()
}

// 执行搜索操作
const performSearch = () => {
  const query = searchQuery.value.trim().toLowerCase()
  
  emit('search', query)
  emit('change', query)
  
  if (query) {
    filterContentCards(query)
  } else {
    showAllCards()
  }
  
  // 发射结果事件
  emit('results', resultsCount.value)
}

// 过滤内容卡片（优化版本）
const filterContentCards = (query) => {
  const cards = document.querySelectorAll(props.cardSelector)
  let visibleCount = 0
  
  // 批量操作，减少重排
  const operations = []
  const sectionVisibleCount = new Map()
  
  cards.forEach(card => {
    const shouldShow = isCardMatch(card, query)
    
    operations.push(() => {
      if (shouldShow) {
        card.style.display = ''
        card.classList.add('search-match')
        card.classList.remove('search-hidden')
        visibleCount++
        
        const section = findParentSection(card)
        if (section) {
          sectionVisibleCount.set(section, (sectionVisibleCount.get(section) || 0) + 1)
        }
      } else {
        card.style.display = 'none'
        card.classList.add('search-hidden')
        card.classList.remove('search-match')
      }
    })
  })
  
  // 批量执行DOM操作
  operations.forEach(op => op())
  
  // 隐藏没有可见卡片的分类标题
  hideEmptySections(sectionVisibleCount)
  
  resultsCount.value = visibleCount
}

// 查找父级分类标题
const findParentSection = (card) => {
  let parent = card.parentElement
  while (parent && !parent.classList.contains('mc-nav-section')) {
    parent = parent.parentElement
    if (!parent || parent.tagName === 'BODY') {
      return null
    }
  }
  return parent
}

// 隐藏没有可见卡片的分类标题
const hideEmptySections = (sectionVisibleCount) => {
  const allSections = document.querySelectorAll('.mc-nav-section')
  
  allSections.forEach(section => {
    const visibleCount = sectionVisibleCount.get(section) || 0
    if (visibleCount === 0) {
      section.style.display = 'none'
      section.classList.add('search-section-hidden')
    } else {
      section.style.display = ''
      section.classList.remove('search-section-hidden')
    }
  })
}

// 显示所有卡片和标题
const showAllCards = () => {
  const cards = document.querySelectorAll(props.cardSelector)
  const sections = document.querySelectorAll('.mc-nav-section')
  
  cards.forEach(card => {
    card.style.display = ''
    card.classList.remove('search-match', 'search-hidden')
  })
  
  sections.forEach(section => {
    section.style.display = ''
    section.classList.remove('search-section-hidden')
  })
  
  resultsCount.value = cards.length
}

// 判断卡片是否匹配搜索
const isCardMatch = (card, query) => {
  if (!query) return true
  
  // 检查搜索字段
  for (const field of props.searchFields) {
    const value = getCardFieldValue(card, field)
    if (value && value.toLowerCase().includes(query)) {
      return true
    }
  }
  
  // 检查文本内容
  const textContent = card.textContent || card.innerText
  if (textContent.toLowerCase().includes(query)) {
    return true
  }
  
  return false
}

// 获取卡片字段值
const getCardFieldValue = (card, field) => {
  if (field.startsWith('data-')) {
    return card.getAttribute(field) || ''
  }
  
  // 其他可能的字段
  switch (field) {
    case 'title':
      const titleEl = card.querySelector('.card-title, [data-title], h3, h4')
      return titleEl?.textContent || ''
    case 'description':
      const descEl = card.querySelector('.card-desc, [data-description], .description, p')
      return descEl?.textContent || ''
    case 'content':
      const contentEl = card.querySelector('.card-content, [data-content], .content')
      return contentEl?.textContent || ''
    case 'tags':
      const tagsEl = card.querySelector('.card-tags, [data-tags], .tags')
      return tagsEl?.textContent || ''
    default:
      return ''
  }
}

// 清除搜索
const clearSearch = () => {
  searchQuery.value = ''
  resultsCount.value = 0
  emit('search', '')
  emit('change', '')
  emit('results', 0)
  showAllCards()
  
  // 重新聚焦到搜索框
  if (searchInputRef.value) {
    searchInputRef.value.focus()
  }
}

// 手动触发搜索
const triggerSearch = (query) => {
  searchQuery.value = query
  performSearch()
}

// 重新计算搜索结果（当动态内容改变时调用）
const refreshSearch = () => {
  if (searchQuery.value) {
    performSearch()
  } else {
    const cards = document.querySelectorAll(props.cardSelector)
    resultsCount.value = cards.length
  }
}

// 暴露方法给父组件
defineExpose({
  getSearchQuery: () => searchQuery.value,
  setSearchQuery: (query) => {
    searchQuery.value = query
    performSearch()
  },
  triggerSearch,
  clearSearch,
  refreshSearch,
  focusSearch: () => {
    if (searchInputRef.value) {
      searchInputRef.value.focus()
    }
  }
})

// 生命周期
onMounted(() => {
  if (props.autoFocus && searchInputRef.value) {
    searchInputRef.value.focus()
  }
  
  // 如果初始有搜索词，执行搜索
  if (props.initialSearch) {
    nextTick(() => {
      performSearch()
    })
  } else {
    // 初始化结果计数
    const cards = document.querySelectorAll(props.cardSelector)
    resultsCount.value = cards.length
  }
})
</script>

<style scoped>
.content-search {
  width: 100%;
  margin-bottom: 24px;
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 44px 12px 16px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.1);
}

.clear-btn {
  position: absolute;
  right: 44px;
  background: none;
  border: none;
  color: var(--vp-c-text-2);
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.clear-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.search-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn:hover {
  color: var(--vp-c-brand);
}

.search-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.results-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  animation: fadeIn 0.3s ease;
}

.results-text {
  font-size: 14px;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.search-query {
  color: var(--vp-c-brand);
  font-weight: 600;
  margin-left: 4px;
}

.clear-results-btn {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.clear-results-btn:hover {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider-light);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes sectionAppear {
  from {
    opacity: 0;
    max-height: 0;
    margin-bottom: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px;
    margin-bottom: 2rem;
  }
}

/* 分类标题动画 */
:deep(.mc-nav-section:not(.search-section-hidden)) {
  animation: sectionAppear 0.4s ease;
  overflow: hidden;
}

/* 卡片搜索匹配样式 */
:deep(.search-match) {
  animation: cardAppear 0.3s ease;
}

/* 响应式布局 */
@media (max-width: 640px) {
  .search-wrapper {
    max-width: 100%;
  }
  
  .results-info {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .clear-results-btn {
    align-self: flex-end;
  }
}
</style>