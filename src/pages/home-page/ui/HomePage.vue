<script setup>
import { onMounted } from 'vue';
import ProductsHomePage from './sections/ProductsHomePage.vue';
import { useProductStore } from '@/entities/product';
import { useFavoriteStore } from '@/entities/favorite';

const productStore = useProductStore();
const favoriteStore = useFavoriteStore();

onMounted(async () => {
  await productStore.fetchItems();
  await favoriteStore.fetchFavorites();
});
</script>

<template>
  <ProductsHomePage />
</template>

<style scoped lang="scss">
@use '@helpers' as *;
</style>
