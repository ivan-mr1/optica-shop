import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import itemsData from './items.json';

export const useProductStore = defineStore('product', () => {
  const allItems = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const filters = reactive({
    page: 1,
    limit: 16,
  });

  const items = computed(() => {
    const start = (filters.page - 1) * filters.limit;
    const end = start + filters.limit;
    return itemsData.slice(start, end);
  });

  const totalItems = computed(() => itemsData.length);

  const fetchItems = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      allItems.value = itemsData;
    } catch {
      error.value = "Не вдалося завантажити товари.";
    } finally {
      isLoading.value = false;
    }
  };

  const setPage = (page) => {
    filters.page = page;
  };

  const getProductById = (id) => {
    return itemsData.find(item => item.id === Number(id));
  };

  return {
    items,
    totalItems,
    isLoading,
    error,
    filters,
    fetchItems,
    setPage,
    getProductById,
  };
});
