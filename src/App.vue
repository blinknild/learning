<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* v-html 内的 ruby 不受各页 scoped 影响 */
.ja ruby rt {
  font-size: 0.62em;
  font-weight: 400;
  letter-spacing: 0.02em;
}
</style>
