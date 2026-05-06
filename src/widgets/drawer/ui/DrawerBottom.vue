<script setup>
import Button from '@/shared/ui/form/button';
import { formatPrice } from '@/shared/utils/formatPrice';
import { useCartStore } from '@/entities/cart';

const cartStore = useCartStore();
</script>

<template>
  <div class="drawer__bottom bottom-drawer">
    <div class="bottom-drawer__info">
      <div class="bottom-drawer__item">
        <span class="bottom-drawer__label">Усього:</span>
        <span class="bottom-drawer__value">{{ formatPrice(cartStore.totalPrice) }} грн</span>
      </div>

      <div class="bottom-drawer__item">
        <span class="bottom-drawer__label">Знижка:</span>
        <span class="bottom-drawer__value bottom-drawer__value--discount">
          -{{ formatPrice(cartStore.discount) }} грн
        </span>
      </div>

      <div class="bottom-drawer__item">
        <span class="bottom-drawer__label">Усього зi знижкою:</span>
        <span class="bottom-drawer__value"> {{ formatPrice(cartStore.finishPrice) }} грн </span>
      </div>
    </div>

    <Button
      class="button--card"
      @click="() => cartStore.createOrder()"
      :disabled="cartStore.cartIsEmpty || cartStore.isCreatingOrder"
    >
      Оформити замовлення
    </Button>
  </div>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.bottom-drawer {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--color-orange, #eeeeee);
  background-color: var(--color-white);

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__item {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 0.5rem;

    &::after {
      content: '';
      flex-grow: 1;
      order: 2;
      border-bottom: 1px dotted var(--color-light);
      margin-bottom: 0.3rem;
    }
  }

  &__label {
    order: 1;
    font-size: 1rem;
    color: var(--color-black);
  }

  &__value {
    order: 3;
    font-weight: 700;
    font-size: 1.1rem;

    &--discount {
      color: #ff6b6b;
    }
  }
}
</style>
