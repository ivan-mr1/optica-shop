<script setup>
import DrawerProduct from './DrawerProduct.vue';
import { useCartStore } from '@/entities/cart';

const cartStore = useCartStore();
</script>

<template>
  <ul class="scroll-bar drawer__list">
    <DrawerProduct
      v-for="item in cartStore.cart"
      :key="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :code="item.code"
      :price="item.price"
      @on-click-remove="cartStore.removeFromCart(item)"
    />
  </ul>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.drawer {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding-inline: 5px;

    flex-grow: 1;
    overflow-y: auto;
    min-height: 0;
  }
}
</style>
