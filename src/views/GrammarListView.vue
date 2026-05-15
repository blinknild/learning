<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import GrammarVerifiedBadge from '../components/GrammarVerifiedBadge.vue'
import raw from '../data/grammar-n2n3.json'
import type { GrammarData } from '../types/grammar'

const data = raw as GrammarData

const sortedItems = computed(() => [...data.items].sort((a, b) => a.id - b.id))

const query = ref('')
/** 标签筛选：选中后保留在下拉框，不写入右侧关键词框 */
const tagPicker = ref<string | undefined>(undefined)

const tagOptions = computed(() => {
  const set = new Set(sortedItems.value.map((item) => item.tag))
  return [...set].sort((a, b) => a.localeCompare(b, 'zh-CN'))
})

/** 失焦当前控件，收起移动端因可筛选下拉而弹起的键盘 */
function blurActiveToDismissMobileKeyboard() {
  const el = document.activeElement
  if (el instanceof HTMLElement) el.blur()
}

function onTagChange() {
  void nextTick(() => {
    void nextTick(() => {
      blurActiveToDismissMobileKeyboard()
    })
  })
}

function onTagClear() {
  blurActiveToDismissMobileKeyboard()
}

/** 清空搜索框与标签选择，并收起键盘 */
function onSearchReset() {
  query.value = ''
  tagPicker.value = undefined
  blurActiveToDismissMobileKeyboard()
}

/** 标签下拉展开时禁止背后页面滚动（移动端尤其明显） */
const scrollLockSnapshot = {
  htmlOverflow: '',
  bodyOverflow: '',
  htmlOverscroll: '',
  bodyOverscroll: '',
}

function setTagSelectScrollLock(locked: boolean) {
  const root = document.documentElement
  const body = document.body
  if (locked) {
    scrollLockSnapshot.htmlOverflow = root.style.overflow
    scrollLockSnapshot.bodyOverflow = body.style.overflow
    scrollLockSnapshot.htmlOverscroll = root.style.overscrollBehavior
    scrollLockSnapshot.bodyOverscroll = body.style.overscrollBehavior
    root.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    root.style.overscrollBehavior = 'none'
    body.style.overscrollBehavior = 'none'
  } else {
    root.style.overflow = scrollLockSnapshot.htmlOverflow
    body.style.overflow = scrollLockSnapshot.bodyOverflow
    root.style.overscrollBehavior = scrollLockSnapshot.htmlOverscroll
    body.style.overscrollBehavior = scrollLockSnapshot.bodyOverscroll
  }
}

function onTagSelectVisible(visible: boolean) {
  setTagSelectScrollLock(visible)
}

onBeforeUnmount(() => {
  setTagSelectScrollLock(false)
})

/** 标签 + 关键词同时生效；关键词匹配标题／释义／条目标签（英文忽略大小写） */
const filteredItems = computed(() => {
  const list = sortedItems.value
  const tag = tagPicker.value
  const rawQ = query.value.trim()
  let next = tag ? list.filter((item) => item.tag === tag) : list
  if (!rawQ) return next
  const q = rawQ.toLowerCase()
  next = next.filter(
    (item) =>
      item.pattern.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q),
  )
  return next
})

const hasActiveFilter = computed(
  () => query.value.trim().length > 0 || Boolean(tagPicker.value),
)
</script>

<template>
  <main class="list-page">
    <header class="toolbar">
      <RouterLink replace class="btn-back" :to="{ name: 'home' }">← 返回首页</RouterLink>
      <h1 class="title">全部语法条目</h1>
      <div class="sub">
        <p class="sub-line">
          共 {{ sortedItems.length }} 条（配置：<code>grammar-n2n3.json</code>）
        </p>
        <p
          class="sub-line sub-line-filter"
          :aria-hidden="!hasActiveFilter"
        >
          <template v-if="hasActiveFilter">当前显示 {{ filteredItems.length }}/{{ sortedItems.length }} 条</template>
        </p>
      </div>
      <div class="search-row">
        <div class="search-ep" role="search">
          <el-select
            id="grammar-tag-inline"
            v-model="tagPicker"
            placeholder="标签"
            clearable
            filterable
            class="search-ep__tag"
            aria-label="按标签筛选"
            @change="onTagChange"
            @clear="onTagClear"
            @visible-change="onTagSelectVisible"
          >
            <el-option
              v-for="t in tagOptions"
              :key="t"
              :label="t"
              :value="t"
            />
          </el-select>
          <el-input
            id="grammar-search-input"
            v-model="query"
            class="search-ep__input"
            clearable
            placeholder="标题／释义（可与标签组合）"
            @clear="blurActiveToDismissMobileKeyboard"
          />
          <button
            type="button"
            class="search-ep__reset"
            :disabled="!hasActiveFilter"
            @click="onSearchReset"
          >
            重置
          </button>
        </div>
      </div>
    </header>

    <section
      v-if="filteredItems.length"
      class="cards"
      aria-label="语法列表"
    >
      <article v-for="item in filteredItems" :key="item.id" class="card">
        <div class="card-head">
          <span class="badge" :data-level="item.level">{{ item.level }}</span>
          <span class="tag-pill">{{ item.tag }}</span>
          <span class="id">#{{ item.id }}</span>
          <GrammarVerifiedBadge :verified="item.verified" />
        </div>
        <h2 class="pattern">{{ item.pattern }}</h2>
        <p class="meaning">{{ item.meaning }}</p>
        <div
          v-for="(usage, uidx) in item.usages"
          :key="uidx"
          class="usage-block"
        >
          <h3 class="continuation">
            <span class="continuation-label">接续</span>
            <span class="continuation-text">{{ usage.continuation }}</span>
          </h3>
          <ul class="examples">
            <li v-for="(ex, idx) in usage.examples" :key="idx">
              <p class="ja" v-html="ex.jaHtml" />
              <p class="zh">{{ ex.zh }}</p>
            </li>
          </ul>
        </div>
      </article>
    </section>

    <p v-else-if="hasActiveFilter" class="empty">
      当前条件下没有匹配条目，可调整关键词或标签后重试。
    </p>
  </main>
</template>

<style scoped>
.list-page {
  min-height: 100vh;
  padding: 2rem 1.25rem 3rem;
  max-width: 40rem;
  margin: 0 auto;
}

.toolbar {
  margin-bottom: 1.75rem;
  text-align: center;
}

.btn-back {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.45rem 0.85rem;
  font-size: 0.88rem;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.5);
  transition: background 0.15s ease, border-color 0.15s ease;
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(0, 0, 0, 0.2);
}

.btn-back:focus-visible {
  outline: 2px solid #2d6a4f;
  outline-offset: 2px;
}

.title {
  margin: 0 0 0.35rem;
  font-size: clamp(1.35rem, 3.5vw, 1.75rem);
  font-weight: 600;
}

.sub {
  margin: 0;
}

.sub-line {
  margin: 0;
  font-size: 0.88rem;
  opacity: 0.85;
  line-height: 1.45;
}

.sub-line + .sub-line {
  margin-top: 0.2rem;
}

/** 筛选统计行：无筛选时也占位一行，避免下方搜索区随 v-if 跳动 */
.sub-line-filter {
  min-height: 1.45em;
}

.sub code {
  font-size: 0.82em;
  padding: 0.1em 0.3em;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.06);
}

.search-row {
  margin-top: 1.1rem;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.search-label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.82rem;
  font-weight: 500;
  opacity: 0.88;
}

.search-ep {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
}

.search-ep__tag {
  width: 5rem;
  flex-shrink: 0;
}

.search-ep__input {
  flex: 1;
  min-width: 0;
}

.search-ep__reset {
  flex-shrink: 0;
  box-sizing: border-box;
  height: var(--el-component-size, 32px);
  margin: 0;
  padding: 0 0.7rem;
  font: inherit;
  font-size: var(--el-font-size-base, 14px);
  font-weight: 400;
  line-height: 1;
  color: var(--el-text-color-regular, #606266);
  border: none;
  border-radius: 10px;
  background-color: var(--el-fill-color-blank, #fff);
  box-shadow: 0 0 0 1px var(--el-border-color, #dcdfe6) inset;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    box-shadow 0.15s ease,
    background-color 0.15s ease,
    color 0.15s ease;
}

.search-ep__reset:hover:not(:disabled) {
  color: var(--el-text-color-primary, #303133);
  box-shadow: 0 0 0 1px var(--el-border-color-hover, #c0c4cc) inset;
}

.search-ep__reset:focus,
.search-ep__reset:focus-visible,
.search-ep__reset:active:not(:disabled) {
  outline: none;
  box-shadow: 0 0 0 1px var(--el-border-color, #dcdfe6) inset;
}

.search-ep__reset:disabled {
  cursor: not-allowed;
  color: var(--el-text-color-placeholder, #a8abb2);
  background-color: var(--el-fill-color-light, #f5f7fa);
  box-shadow: 0 0 0 1px var(--el-border-color-light, #e4e7ed) inset;
}

.search-ep :deep(.el-select__wrapper),
.search-ep :deep(.el-input__wrapper) {
  border-radius: 10px;
}

.empty {
  margin: 2rem 0 0;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0.85;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.card {
  padding: 1.25rem 1.35rem;
  border-radius: 12px;
  text-align: left;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.card-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.65rem;
}

.badge {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 0.2em 0.5em;
  border-radius: 6px;
  color: #fff;
}

.badge[data-level='N3'] {
  background: #2d6a4f;
}

.badge[data-level='N2'] {
  background: #1d3557;
}

.tag-pill {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15em 0.45em;
  border-radius: 999px;
  background: rgba(108, 117, 125, 0.18);
  color: inherit;
}

.id {
  font-size: 0.8rem;
  opacity: 0.65;
  font-variant-numeric: tabular-nums;
}

.pattern {
  margin: 0 0 0.35rem;
  font-size: 1.15rem;
  font-weight: 600;
}

.meaning {
  margin: 0 0 1rem;
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0.9;
}

.usage-block + .usage-block {
  margin-top: 1.15rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(0, 0, 0, 0.12);
}

.continuation {
  margin: 0 0 0.6rem;
  font-size: 0.86rem;
  font-weight: 600;
  line-height: 1.45;
  text-align: left;
}

.continuation-label {
  display: inline-block;
  margin-right: 0.4rem;
  padding: 0.1em 0.4em;
  font-size: 0.7rem;
  font-weight: 600;
  vertical-align: 0.05em;
  border-radius: 4px;
  color: #fff;
  background: #6c757d;
}

.continuation-text {
  font-weight: 500;
}

.examples {
  margin: 0;
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.examples li {
  margin: 0;
}

.ja {
  margin: 0 0 0.25rem;
  font-size: 0.98rem;
  line-height: 1.75;
}

.zh {
  margin: 0;
  font-size: 0.86rem;
  opacity: 0.82;
  line-height: 1.5;
}

@media (prefers-color-scheme: dark) {
  .sub code {
    background: rgba(255, 255, 255, 0.1);
  }

  .btn-back {
    background: rgba(40, 42, 48, 0.75);
    border-color: rgba(255, 255, 255, 0.12);
  }

  .btn-back:hover {
    background: rgba(50, 52, 58, 0.95);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .search-ep__reset:not(:disabled) {
    color: rgba(255, 255, 255, 0.88);
    background-color: rgba(40, 42, 48, 0.75);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12) inset;
  }

  .search-ep__reset:hover:not(:disabled) {
    color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.22) inset;
  }

  .search-ep__reset:focus,
  .search-ep__reset:focus-visible,
  .search-ep__reset:active:not(:disabled) {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12) inset;
  }

  .search-ep__reset:disabled {
    color: rgba(255, 255, 255, 0.35);
    background-color: rgba(32, 34, 38, 0.65);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
  }

  .card {
    background: rgba(28, 30, 34, 0.85);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
  }

  .usage-block + .usage-block {
    border-top-color: rgba(255, 255, 255, 0.12);
  }

  .tag-pill {
    background: rgba(200, 205, 212, 0.15);
  }
}
</style>
