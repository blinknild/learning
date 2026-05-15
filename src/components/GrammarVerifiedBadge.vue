<script setup lang="ts">
defineProps<{
  verified?: boolean
}>()
</script>

<template>
  <span
    v-if="verified"
    class="verified-badge"
    role="img"
    aria-label="官方已审核"
    title="官方已审核"
  >
    <svg
      class="verified-badge__icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" stroke-width="1.5" />
      <path
        d="M8.25 12.25 10.75 14.75 15.75 9.75"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>

<style scoped>
.verified-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: auto;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 50%;
  color: #2d6a4f;
  background: rgba(45, 106, 79, 0.1);
}

.verified-badge__icon {
  display: block;
}

@media (prefers-color-scheme: dark) {
  .verified-badge {
    color: #95d5b2;
    background: rgba(116, 198, 157, 0.14);
  }
}

html.dark .verified-badge {
  color: #95d5b2;
  background: rgba(116, 198, 157, 0.14);
}
</style>
