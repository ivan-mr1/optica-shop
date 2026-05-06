<script setup>
import { formatPrice } from '@/shared/utils/formatPrice';

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  code: String,
  price: Number,
});
</script>

<template>
  <li>
    <article class="product">
      <div class="product__inner">
        <div class="product__image" aria-hidden="true">
          <img :src="imageUrl" alt="" width="285" height="215" loading="lazy" />
        </div>

        <div class="product__bottom">
          <div class="product__favorite-slot">
            <slot name="favorite" />
          </div>

          <h3 class="product__title">
            <RouterLink :to="`/product/${id}`" class="product__main-link">
              {{ title }}
            </RouterLink>
          </h3>
          <div class="product__flex">
            <div class="product__code">Код: {{ code }}</div>
            <div class="product__price product-price">
              <div class="product__price-current">{{ formatPrice(price) }} грн</div>
            </div>
          </div>

          <div class="product__actions">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </article>
  </li>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.product {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-white);
  transition: box-shadow 0.3s ease;

  @include hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    .product__title {
      color: var(--color-orange);
    }
  }

  &__main-link {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
  }

  &__title,
  &__actions {
    position: relative;
    z-index: 2;
  }

  &__bottom {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: fluid(15, 10);
  }

  &__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-card-image-bg);

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  &__favorite-slot {
    position: absolute;
    z-index: 5;
    top: 15px;
    right: 15px;
  }

  &__title {
    font-size: fluid(20, 18);
    font-weight: 600;
    line-height: 1.3;
    color: var(--color-black);
  }

  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: fluid(15, 10);
  }

  &__code {
    font-size: 14px;
    color: var(--color-gray);
  }

  &__price {
    margin-top: auto;
    font-size: fluid(22, 18);
    font-weight: 600;
  }
}
</style>
