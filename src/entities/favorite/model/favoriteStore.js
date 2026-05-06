import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useFavoriteStore = defineStore('favorite', () => {
  const localFavorites = localStorage.getItem('favorites');
  const favorites = ref(localFavorites ? JSON.parse(localFavorites) : []);
  const isLoading = ref(false);
  const error = ref(null);

  const favoriteItems = computed(() => favorites.value.map((fav) => fav.item));

  const fetchFavorites = async () => {
    isLoading.value = true;
    try {
      // Имитируем задержку
      await new Promise((resolve) => setTimeout(resolve, 200));
      const data = localStorage.getItem('favorites');
      favorites.value = data ? JSON.parse(data) : [];
    } catch {
      error.value = 'Не вдалося завантажити закладки.';
    } finally {
      isLoading.value = false;
    }
  };

  const toggleFavorite = async (item) => {
    const isFavorite = hasItem(item.id);

    if (!isFavorite) {
      const newFavorite = {
        id: Date.now().toString(), // Генерируем локальный ID
        item_id: item.id,
        item,
      };
      favorites.value.push(newFavorite);
    } else {
      favorites.value = favorites.value.filter((fav) => fav.item_id !== item.id);
    }
  };

  const hasItem = (itemId) => favorites.value.some((fav) => fav.item_id === itemId);

  watch(
    favorites,
    () => {
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    },
    { deep: true },
  );

  return {
    favorites,
    favoriteItems,
    isLoading,
    error,
    fetchFavorites,
    toggleFavorite,
    hasItem,
  };
});
