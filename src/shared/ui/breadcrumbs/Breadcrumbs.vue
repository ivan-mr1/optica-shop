<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  items: {
    type: Array,
    required: true,
    // [ { name: 'Главная', href: '/' }, { name: 'Каталог' } ]
  },
});
</script>

<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ul class="breadcrumbs__list">
      <li class="breadcrumbs__item">
        <RouterLink to="/" class="breadcrumbs__link">Головна</RouterLink>
      </li>
      <li v-for="(item, index) in items" :key="index" class="breadcrumbs__item">
        <span class="breadcrumbs__separator" aria-hidden="true">/</span>
        <RouterLink v-if="item.href" :to="item.href" class="breadcrumbs__link">
          {{ item.name }}
        </RouterLink>
        <span v-else class="breadcrumbs__current">{{ item.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.breadcrumbs {
  margin-bottom: 20px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    font-size: rem(16);
    color: #888;
  }

  &__separator {
    margin-inline: 10px;
    color: #ccc;
    font-size: rem(16);
  }

  &__link {
    color: inherit;
    transition: color 0.3s;

    @include hover {
      color: var(--color-orange);
    }
  }

  &__current {
    color: var(--color-black);
    font-weight: 500;
  }
}
</style>
