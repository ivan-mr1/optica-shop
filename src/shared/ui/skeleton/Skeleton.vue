<script setup>
defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '20px' },
  borderRadius: { type: String, default: '4px' },
});
</script>

<template>
  <div
    class="skeleton"
    :style="{
      width: width,
      height: height,
      borderRadius: borderRadius,
    }"
  ></div>
</template>

<style scoped lang="scss">
.skeleton {
  --skeleton-bg: #f0f0f0;
  --skeleton-highlight: #f4f4f4;

  :global(.dark) & {
    --skeleton-bg: #2a2a2a;
    --skeleton-highlight: #333333;
  }

  background: var(--skeleton-bg);
  background: linear-gradient(
    90deg,
    var(--skeleton-bg) 25%,
    var(--skeleton-highlight) 37%,
    var(--skeleton-bg) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
