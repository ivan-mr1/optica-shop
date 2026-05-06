<script setup>
import { computed } from 'vue';

const props = defineProps({
  totalItems: { type: Number, required: true },
  limit: { type: Number, required: true },
  currentPage: { type: Number, required: true },
});

const emit = defineEmits(['change-page']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.limit));

const pages = computed(() => {
  const result = [];
  for (let i = 1; i <= totalPages.value; i++) {
    result.push(i);
  }
  return result;
});
</script>

<template>
  <div v-if="totalPages > 1" class="pagination">
    <button
      class="pagination__arrow"
      :disabled="currentPage === 1"
      aria-label="Previous page"
      @click="emit('change-page', currentPage - 1)"
    >
      &lt;
    </button>

    <div class="pagination__list">
      <button
        v-for="page in pages"
        :key="page"
        class="pagination__item"
        :class="{ 'is-active': page === currentPage }"
        @click="emit('change-page', page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="pagination__arrow"
      :disabled="currentPage === totalPages"
      aria-label="Next page"
      @click="emit('change-page', currentPage + 1)"
    >
      &gt;
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 40px;

  &__list {
    display: flex;
    gap: 8px;
  }

  &__arrow,
  &__item {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--color-light);
    background-color: var(--color-white);
    cursor: pointer;
    font-weight: 600;
    color: var(--color-black);
    transition: all 0.3s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    @include hover {
      border-color: var(--color-orange);
      color: var(--color-orange);
    }
  }

  &__item {
    &.is-active {
      background-color: var(--color-orange);
      color: #ffffff !important;
      border-color: var(--color-orange);

      @include hover {
        color: #ffffff !important;
      }
    }
  }
}
</style>
