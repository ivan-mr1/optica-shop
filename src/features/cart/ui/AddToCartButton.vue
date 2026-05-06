<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/entities/cart';
import Button from '@/shared/ui/form/button';

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
      isAdded ? `Товар ${item.title} вже у кошику` : `Додати у кошик товар: ${item.title}`
    "
    @click.stop="onClickAddCart"
  >
    {{ isAdded ? 'У кошику' : 'Купити' }}
  </Button>
</template>
