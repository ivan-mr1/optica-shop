<script setup>
import { onMounted } from 'vue';
import HeroHomePage from './sections/HeroHomePage.vue';
import AboutHomePage from './sections/AboutHomePage.vue';
import PartnersHomePage from './sections/PartnersHomePage.vue';
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
  <HeroHomePage />
  <AboutHomePage />
  <PartnersHomePage />
  <ProductsHomePage />
</template>

<style scoped lang="scss">
@use '@helpers' as *;
</style>
