<script setup>
import Skeleton from '@/shared/ui/skeleton';
</script>

<template>
  <li class="product-skeleton">
    <div class="product-skeleton__inner">
      <Skeleton height="215px" border-radius="0" class="product-skeleton__image" />

      <div class="product-skeleton__bottom">
        <Skeleton width="80%" height="24px" />
        <Skeleton width="100%" height="32px" />
        <Skeleton width="40%" height="18px" />
        <div class="product-skeleton__footer">
          <Skeleton width="30%" height="28px" />
          <Skeleton width="100%" height="40px" border-radius="8px" />
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.product-skeleton {
  background-color: var(--color-white);
  border: 1px solid #f0f0f0;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__bottom {
    padding: fluid(15, 10);
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-grow: 1;
  }

  &__footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style>
