<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchProductById } from '@/shared/api/productApi';
import { useLoadingState } from '@/shared/lib/useLoadingState';
import { AddToCartButton } from '@/features/cart';
import { ToggleFavoriteButton } from '@/features/favorite';
import Skeleton from '@/shared/ui/skeleton';
import InfoBlock from '@/shared/ui/info-block';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import errorImg from '@/shared/assets/img/error.png';

const route = useRoute();
const router = useRouter();
const product = ref(null);
const { isLoading, error, runAsync } = useLoadingState();

const loadProduct = async () => {
  await runAsync(async () => {
    product.value = await fetchProductById(route.params.id);
  }, 'Не вдалося завантажити інформацію про товар');
};

const fixImageUrl = (url) => {
  if (!url) return '';
  // Если путь относительный (./), делаем его абсолютным от корня для вложенных роутов
  return url.startsWith('./') ? url.replace('./', '/') : url;
};

onMounted(loadProduct);
</script>

<template>
  <div class="product-page">
    <div class="product-page__container">
      <Breadcrumbs
        :items="[
          { name: 'Каталог', href: '/#products' },
          { name: product?.title || 'Завантаження...' },
        ]"
      />
      <button class="product-page__back" @click="router.back()">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4L6 8L10 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Назад
      </button>

      <div v-if="isLoading" class="product-page__skeleton">
        <div class="product-page__grid">
          <Skeleton height="500px" border-radius="20px" />
          <div class="product-page__info-skeleton">
            <Skeleton width="60%" height="40px" />
            <Skeleton width="30%" height="30px" />
            <Skeleton width="100%" height="100px" />
            <Skeleton width="100%" height="50px" border-radius="10px" />
          </div>
        </div>
      </div>

      <div v-else-if="error" class="product-page__error">
        <InfoBlock :image-url="errorImg" title="Помилка" :text="error">
          <template #action>
            <button class="product-page__retry-btn" @click="loadProduct">Спробувати знову</button>
          </template>
        </InfoBlock>
      </div>

      <div v-else-if="product" class="product-page__grid">
        <div class="product-page__image-wrapper">
          <img
            :src="fixImageUrl(product.imageUrl)"
            :alt="product.title"
            class="product-page__image"
          />
          <div class="product-page__favorite">
            <ToggleFavoriteButton :item="product" />
          </div>
        </div>

        <div class="product-page__info">
          <h1 class="product-page__title">{{ product.title }}</h1>
          <div class="product-page__price">{{ product.price }} грн.</div>

          <div class="product-page__description">
            <h3>Опис товару</h3>
            <p>
              {{
                product.description ||
                'Опис для цього товару поки що відсутній. Це високоякісна оправа, яка забезпечує комфорт та стиль протягом усього дня.'
              }}
            </p>
          </div>

          <div class="product-page__actions">
            <AddToCartButton :item="product" />
          </div>

          <div class="product-page__meta">
            <span>Артикул: {{ product.code || 'GL-00' + product.id }}</span>
            <span>Наявність: В наявності</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.product-page {
  padding-top: calc(var(--header-height) + 40px);
  padding-bottom: 80px;
  min-height: 100dvh;

  &__back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 30px;
    font-weight: 500;
    color: var(--color-black);
    transition: color 0.3s;

    @include hover {
      color: var(--color-orange);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;

    @media (max-width: em(991.98)) {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  &__image-wrapper {
    position: relative;
    background-color: var(--color-card-image-bg);
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &__favorite {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;
  }

  &__title {
    font-size: rem(42);
    font-weight: 700;
    margin-bottom: 15px;
    line-height: 1.2;

    @media (max-width: em(479.98)) {
      font-size: rem(32);
    }
  }

  &__price {
    font-size: rem(32);
    font-weight: 600;
    color: var(--color-orange);
    margin-bottom: 40px;
  }

  &__description {
    margin-bottom: 40px;

    h3 {
      font-size: rem(18);
      font-weight: 600;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    p {
      line-height: 1.6;
      color: var(--color-gray);
    }
  }

  &__actions {
    margin-bottom: 40px;

    :deep(.button) {
      width: 100%;
      height: 60px;
      font-size: rem(18);
    }
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: rem(14);
    color: var(--color-gray);
    border-top: 1px solid var(--color-light);
    padding-top: 20px;
  }

  &__info-skeleton {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__retry-btn {
    margin-top: 20px;
    padding: 12px 24px;
    background-color: var(--color-orange);
    color: #fff;
    border-radius: 8px;
    font-weight: 600;
  }
}
</style>
