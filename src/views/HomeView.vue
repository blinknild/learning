<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import raw from '../data/grammar-n2n3.json'
import type { GrammarData, GrammarItem } from '../types/grammar'

const data = raw as GrammarData

const title = '日语学习'
const now = new Date()
const dayOfMonth = now.getDate()
const mod30 = dayOfMonth % 30

const todaysItems = computed(() =>
  data.items.filter((item: GrammarItem) => item.id % 30 === mod30),
)

const dateLabel = computed(() => {
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  return `${y}年${m}月${dayOfMonth}日`
})

const totalCount = data.items.length
</script>

<template>
  <main class="home">
    <header class="header">
      <h1>{{ title }}</h1>
      <p class="meta">
        <time :datetime="now.toISOString()">{{ dateLabel }}</time>
        <span class="sep">·</span>
        <span>今日语法编号规则：<code>id % 30 === {{ dayOfMonth }} % 30</code>（即 {{ mod30 }}）</span>
      </p>
      <nav class="actions">
        <RouterLink class="btn" :to="{ name: 'grammar-list' }">查看全部语法条目（{{ totalCount }}）</RouterLink>
      </nav>
    </header>

    <section v-if="todaysItems.length" class="cards" aria-label="今日语法">
      <article v-for="item in todaysItems" :key="item.id" class="card">
        <div class="card-head">
          <span class="badge" :data-level="item.level">{{ item.level }}</span>
          <span class="id">#{{ item.id }}</span>
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

    <p v-else class="empty">今日没有匹配编号的条目（数据将随题库扩充而增加）。</p>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  padding: 2rem 1.25rem 3rem;
  max-width: 40rem;
  margin: 0 auto;
}

.header {
  margin-bottom: 2rem;
  text-align: center;
}

h1 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.meta {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.88;
}

.meta code {
  font-size: 0.85em;
  padding: 0.1em 0.35em;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.06);
}

.sep {
  margin: 0 0.35em;
}

.actions {
  display: flex;
  justify-content: center;
}

.btn {
  display: inline-block;
  padding: 0.55rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  color: inherit;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  background: rgba(255, 255, 255, 0.55);
  transition: background 0.15s ease, border-color 0.15s ease;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(0, 0, 0, 0.22);
}

.btn:focus-visible {
  outline: 2px solid #2d6a4f;
  outline-offset: 2px;
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

.id {
  font-size: 0.8rem;
  opacity: 0.65;
  font-variant-numeric: tabular-nums;
}

.pattern {
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.meaning {
  margin: 0 0 1rem;
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0.9;
}

.usage-block + .usage-block {
  margin-top: 1.25rem;
  padding-top: 1.1rem;
  border-top: 1px dashed rgba(0, 0, 0, 0.12);
}

.continuation {
  margin: 0 0 0.65rem;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.45;
  text-align: left;
}

.continuation-label {
  display: inline-block;
  margin-right: 0.4rem;
  padding: 0.1em 0.4em;
  font-size: 0.72rem;
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
  gap: 0.85rem;
}

.examples li {
  margin: 0;
}

.ja {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  line-height: 1.75;
}

.zh {
  margin: 0;
  font-size: 0.88rem;
  opacity: 0.82;
  line-height: 1.5;
}

.empty {
  text-align: center;
  opacity: 0.8;
}

@media (prefers-color-scheme: dark) {
  .meta code {
    background: rgba(255, 255, 255, 0.1);
  }

  .btn {
    background: rgba(40, 42, 48, 0.75);
    border-color: rgba(255, 255, 255, 0.14);
  }

  .btn:hover {
    background: rgba(50, 52, 58, 0.95);
    border-color: rgba(255, 255, 255, 0.22);
  }

  .card {
    background: rgba(28, 30, 34, 0.85);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
  }

  .usage-block + .usage-block {
    border-top-color: rgba(255, 255, 255, 0.12);
  }
}
</style>
