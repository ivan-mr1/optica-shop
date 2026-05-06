<script setup>
import { ref, watch } from 'vue';
import HeaderBlock from '@/shared/ui/header-block';
import ProductCatalog from '@/widgets/product-catalog';
import ProductsFilter from '@/features/filter-products';
import Pagination from '@/shared/ui/pagination';
import { useProductStore } from '@/entities/product';

const productStore = useProductStore();
const productsRef = ref(null);

watch(
  () => productStore.filters.page,
  () => {
    if (productsRef.value) {
      const yOffset = -100;
      const y = productsRef.value.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  },
);

const onChangePage = (page) => {
  productStore.setPage(page);
};
</script>

<template>
  <section
    id="products"
    ref="productsRef"
    class="page__products products"
    aria-labelledby="products-title"
  >
    <div class="products__container">
      <HeaderBlock custom-class="products__header" id="products-title" title="Каталог" />
      <ProductsFilter />
      <ProductCatalog
        :items="productStore.items"
        :is-loading="productStore.isLoading"
        :error="productStore.error"
        @retry="productStore.fetchItems"
      />

      <Pagination
        :total-items="productStore.totalItems"
        :limit="productStore.filters.limit"
        :current-page="productStore.filters.page"
        @change-page="onChangePage"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.products {
  @include adaptive-clamp('padding-top', 120, 80);
  @include adaptive-clamp('padding-bottom', 60, 20);

  &__header {
    &:not(:last-child) {
      margin-bottom: rem(40);
    }
  }
}
</style>
