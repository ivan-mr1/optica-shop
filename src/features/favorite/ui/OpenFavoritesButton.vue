<script setup>
import { useFavoriteStore } from '@/entities/favorite';
import { IconHeart } from '@/shared/ui/icons';
import { useSliceI18n } from '@/shared/i18n';

import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ua from '../locales/ua.json';

const { t } = useSliceI18n('favorite', { en, ru, ua });

const favoriteStore = useFavoriteStore();
</script>

<template>
  <RouterLink
    to="/favorites"
    class="header__action"
    :aria-label="t('openFavorites')"
    :title="t('openFavorites')"
  >
    <span class="counter-icon">
      <IconHeart />
      <span class="counter-icon__count counter-icon__count--fav">{{
        favoriteStore.favorites.length
      }}</span>
    </span>
  </RouterLink>
</template>

<style scoped lang="scss">
@use '@helpers' as *;
</style>
