<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import raw from '../data/grammar-n2n3.json'
import type { GrammarData } from '../types/grammar'

const data = raw as GrammarData

const sortedItems = computed(() => [...data.items].sort((a, b) => a.id - b.id))
</script>

<template>
  <main class="list-page">
    <header class="toolbar">
      <RouterLink class="btn-back" :to="{ name: 'home' }">← 返回首页</RouterLink>
      <h1 class="title">全部语法条目</h1>
      <p class="sub">共 {{ sortedItems.length }} 条（配置数据：<code>grammar-n2n3.json</code>）</p>
    </header>

    <section class="cards" aria-label="语法列表">
      <article v-for="item in sortedItems" :key="item.id" class="card">
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
  font-size: 0.88rem;
  opacity: 0.85;
}

.sub code {
  font-size: 0.82em;
  padding: 0.1em 0.3em;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.06);
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
