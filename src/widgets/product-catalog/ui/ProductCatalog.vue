<script setup>
import { ProductCard, ProductSkeleton } from '@/entities/product';
import { AddToCartButton } from '@/features/cart';
import { ToggleFavoriteButton } from '@/features/favorite';
import InfoBlock from '@/shared/ui/info-block';
import errorImg from '@/shared/assets/img/error.png';

defineProps({
  items: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false },
  error: { type: String, default: null },
  emptyTitle: { type: String, default: 'Список порожній' },
  emptyText: { type: String, default: null },
  emptyImage: { type: String, default: null },
});

const emit = defineEmits(['retry']);
</script>

<template>
  <div class="products__wrapper">
    <!-- Ошибка -->
    <div v-if="error" class="products__info-container">
      <InfoBlock :image-url="errorImg" title="Сталася помилка" :text="error">
        <template #action>
          <button class="products__action-btn" @click="emit('retry')">Спробувати знову</button>
        </template>
      </InfoBlock>
    </div>

    <!-- Загрузка -->
    <ul v-else-if="isLoading" class="products__list" data-products-catalog>
      <ProductSkeleton v-for="n in 8" :key="n" />
    </ul>

    <!-- Пусто -->
    <div v-else-if="items.length === 0" class="products__info-container">
      <InfoBlock :image-url="emptyImage" :title="emptyTitle" :text="emptyText" />
    </div>

    <!-- Список товаров -->
    <ul v-else class="products__list" data-products-catalog>
      <ProductCard
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :image-url="item.imageUrl"
        :description="item.description"
        :code="item.code"
        :price="item.price"
      >
        <template #favorite>
          <ToggleFavoriteButton :item="item" />
        </template>

        <template #actions>
          <AddToCartButton :item="item" />
        </template>
      </ProductCard>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.products {
  &__wrapper {
    width: 100%;
  }

  &__info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    gap: 20px;
    width: 100%;
  }

  &__action-btn {
    padding: 12px 24px;
    background-color: var(--color-orange);
    color: #fff;
    border-radius: 8px;
    font-weight: 600;
    transition: background-color 0.3s;
    margin-top: 10px;

    @include hover {
      background-color: darken(#ffa501, 10%);
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 1rem;

    &:not(:last-child) {
      margin-bottom: 1.2rem;
    }
  }
}
</style>
