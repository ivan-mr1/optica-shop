<script setup>
import { computed } from 'vue';
import { useFavoriteStore } from '@/entities/favorite';
import { IconFavorite } from '@/shared/ui/icons';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const favoriteStore = useFavoriteStore();

const isFavorite = computed(() => favoriteStore.hasItem(props.item.id));

const toggleFavoriteItem = () => {
  favoriteStore.toggleFavorite(props.item);
};
</script>

<template>
  <button
    @click.stop="toggleFavoriteItem"
    type="button"
    class="favorite-btn"
    :class="{ 'is-active': isFavorite }"
    :aria-label="
      isFavorite ? `Видалити з обраного: ${item.title}` : `Додати до обраного: ${item.title}`
    "
  >
    <IconFavorite />
  </button>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.favorite-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: var(--color-orange);
  background-color: var(--color-white);
  border: 1px solid #eeeeee;
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;

  svg {
    transition: transform 0.3s ease;
  }

  &.is-active {
    color: var(--color-white);
    background-color: var(--color-orange);
    border-color: var(--color-orange);
  }

  @include hover {
    transform: scale(1.1);

    &:not(.is-active) {
      background-color: #fff9f5;
    }
  }
}
</style>
