<script setup>
import { CartButtonIcon } from '@/shared/ui/icons';
import { useCartStore } from '@/entities/cart';
import { useSliceI18n } from '@/shared/i18n';

import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ua from '../locales/ua.json';

const { t } = useSliceI18n('cart', { en, ru, ua });

const cartStore = useCartStore();
</script>

<template>
  <button
    type="button"
    class="header__action"
    :aria-label="t('openCart')"
    :title="t('openCart')"
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
