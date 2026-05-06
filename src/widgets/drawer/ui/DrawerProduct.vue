<script setup>
import { formatPrice } from '@/shared/utils/formatPrice';
import { IconClose } from '@/shared/ui/icons';

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  code: String,
  price: Number,
});

const emit = defineEmits(['onClickRemove']);
</script>

<template>
  <li class="drawer__item">
    <article class="product-drawer">
      <div class="product-drawer__image">
        <img
          :src="imageUrl"
          :alt="title"
          width="75"
          height="50"
          class="product-drawer__img"
          loading="lazy"
        />
      </div>

      <div class="product-drawer__content">
        <div class="product-drawer__header">
          <h3 class="product-drawer__title">{{ title }}</h3>

          <button
            @click="emit('onClickRemove')"
            type="button"
            class="product-drawer__close"
            aria-label="Видалити товар"
          >
            <IconClose width="25" height="25" />
          </button>
        </div>

        <div class="product-drawer__footer">
          <div class="product-drawer__info">
            <span class="product-drawer__code">Код: {{ code }}</span>
            <span class="product-drawer__price">{{ formatPrice(price) }} грн</span>
          </div>
        </div>
      </div>
    </article>
  </li>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.product-drawer {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--color-orange);
  padding: 8px;
  border-radius: 12px;
  background-color: var(--color-white);

  &__image {
    flex: 0 0 73px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 4px;

    img {
      max-width: 100%;
      object-fit: contain;
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;

    @include line-clamp(2);
  }

  &__close {
    flex-shrink: 0;
    color: var(--color-gray);
    transition:
      color 0.3s ease,
      transform 0.2s ease;

    @include hover {
      color: var(--color-orange);
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 13px;
  }

  &__code {
    color: var(--color-gray);
  }

  &__price {
    font-weight: 700;
    color: var(--color-black);
  }
}
</style>
