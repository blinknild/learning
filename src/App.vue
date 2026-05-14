<script setup lang="ts">
const title = '日语学习'
const subtitle = 'Vue 3 项目已就绪，后续可在此扩展假名、词汇与练习模块。'
</script>

<template>
  <main class="home">
    <h1>{{ title }}</h1>
    <p class="lead">{{ subtitle }}</p>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

h1 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.lead {
  margin: 0;
  max-width: 28rem;
  line-height: 1.6;
  opacity: 0.85;
}
</style>
