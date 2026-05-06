<script setup>
import { useFavoriteStore } from '@/entities/favorite';
import { IconHeart } from '@/shared/ui/icons';

const favoriteStore = useFavoriteStore();
</script>

<template>
  <RouterLink
    to="/favorites"
    class="header__action"
    aria-label="Open favorite"
    title="Open favorite"
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
