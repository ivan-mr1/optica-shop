<script setup>
import { onMounted } from 'vue';
import { useFavoriteStore } from '@/entities/favorite';
import HeaderBlock from '@/shared/ui/header-block';
import ProductCatalog from '@/widgets/product-catalog';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import favoritesEmptyImg from '@/shared/assets/img/favorites-empty.png';
import { useSliceI18n } from '@/shared/i18n';

import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ua from '../locales/ua.json';

const { t } = useSliceI18n('favoritePage', { en, ru, ua });

const favoriteStore = useFavoriteStore();

onMounted(async () => {
  await favoriteStore.fetchFavorites();
});
</script>

<template>
  <section id="favorites" class="page__favorites favorites" aria-labelledby="favorites-title">
    <div class="products__container">
      <Breadcrumbs :items="[{ name: t('title') }]" />
      <HeaderBlock custom-class="favorites__header" id="favorites-title" :title="t('title')" />

      <ProductCatalog
        :items="favoriteStore.favoriteItems"
        :is-loading="favoriteStore.isLoading"
        :error="favoriteStore.error"
        :empty-title="t('emptyTitle')"
        :empty-text="t('emptyText')"
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
