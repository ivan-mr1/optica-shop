<script setup>
import { CartButtonIcon } from '@/shared/ui/icons';
import { useCartStore } from '@/entities/cart';

const cartStore = useCartStore();
</script>

<template>
  <button
    type="button"
    class="header__action"
    aria-label="Open cart"
    title="Open cart"
    @click="() => cartStore.openDrawer()"
  >
    <span class="counter-icon">
      <CartButtonIcon />
      <span class="counter-icon__count">{{ cartStore.finishPrice }} грн</span>
    </span>
  </button>
</template>

<style scoped lang="scss">
@use '@helpers' as *;
</style>
