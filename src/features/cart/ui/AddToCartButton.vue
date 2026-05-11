<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/entities/cart';
import Button from '@/shared/ui/form/button';
import { useSliceI18n } from '@/shared/i18n';

import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ua from '../locales/ua.json';

const { t } = useSliceI18n('addToCartButton', { en, ru, ua });

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

const isAdded = computed(() => cartStore.hasItem(props.item.id));

const onClickAddCart = () => {
  if (isAdded.value) {
    cartStore.removeFromCart(props.item);
  } else {
    cartStore.addToCart(props.item);
  }
};
</script>

<template>
  <Button
    class="button--card"
    :in-cart="isAdded"
    :aria-label="
      isAdded ? t('inCartAria', { title: item.title }) : t('addToCartAria', { title: item.title })
    "
    @click.stop="onClickAddCart"
  >
    {{ isAdded ? t('inCart') : t('buy') }}
  </Button>
</template>
