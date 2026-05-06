<script setup>
import { OpenCartButton } from '@/features/cart';
import { OpenFavoritesButton } from '@/features/favorite';
import { ThemeToggle } from '@/features/theme-toggle';
</script>

<template>
  <div class="header__actions">
    <ThemeToggle />
    <OpenCartButton />
    <OpenFavoritesButton />
  </div>
</template>

<style scoped lang="scss">
@use '@helpers' as *;
.header {
  &__actions {
    position: relative;
    z-index: 5;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: rem(16);
  }

  &__action {
    --size: #{rem(40)};

    @include square(var(--size));
  }
}
</style>
