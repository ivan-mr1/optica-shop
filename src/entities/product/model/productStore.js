import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { fetchProducts } from '@/shared/api/productApi';
import { useLoadingState } from '@/shared/lib/useLoadingState';

export const useProductStore = defineStore('product', () => {
  const allItems = ref([]);
  const { isLoading, error, runAsync } = useLoadingState();

  const filters = reactive({
    sortBy: 'title',
    searchQuery: '',
    page: 1,
    limit: 16,
  });

  const items = computed(() => {
    const start = (filters.page - 1) * filters.limit;
    const end = start + filters.limit;
    return allItems.value.slice(start, end);
  });

  const totalItems = computed(() => allItems.value.length);

  const fetchItems = async () => {
    await runAsync(async () => {
      const params = {
        sortBy: filters.sortBy,
      };

      if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`;
      }

      const data = await fetchProducts(params);
      allItems.value = data;
    }, "Не вдалося завантажити товари. Перевірте з'єднання з інтернетом.");
  };

  const setPage = (page) => {
    filters.page = page;
  };

  const setSortBy = (sortBy) => {
    filters.sortBy = sortBy;
    filters.page = 1;
  };

  const setSearchQuery = (query) => {
    filters.searchQuery = query;
    filters.page = 1;
  };

  return {
    items,
    totalItems,
    isLoading,
    error,
    filters,
    fetchItems,
    setPage,
    setSortBy,
    setSearchQuery,
  };
});
