<script setup>
import { onMounted } from 'vue';
import { useFavoriteStore } from '@/entities/favorite';
import HeaderBlock from '@/shared/ui/header-block';
import ProductCatalog from '@/widgets/product-catalog';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import favoritesEmptyImg from '@/shared/assets/img/favorites-empty.png';

const favoriteStore = useFavoriteStore();

onMounted(async () => {
  await favoriteStore.fetchFavorites();
});
</script>

<template>
  <section id="favorites" class="page__favorites favorites" aria-labelledby="favorites-title">
    <div class="products__container">
      <Breadcrumbs :items="[{ name: 'Закладки' }]" />
      <HeaderBlock custom-class="favorites__header" id="favorites-title" title="Закладки" />

      <ProductCatalog
        :items="favoriteStore.favoriteItems"
        :is-loading="favoriteStore.isLoading"
        :error="favoriteStore.error"
        empty-title="Закладок немає :("
        empty-text="Ви нічого не додали в закладки"
        :empty-image="favoritesEmptyImg"
        @retry="favoriteStore.fetchFavorites"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.favorites {
  padding-top: calc(var(--header-height) + 10px);
  padding-bottom: 60px;

  &__empty {
    display: flex;
    justify-content: center;
    padding-top: 60px;
  }
}
</style>
