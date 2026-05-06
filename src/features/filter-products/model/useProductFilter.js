import { ref, reactive, watch, onMounted } from 'vue';
import { fetchProducts } from '@/entities/product/api';

export function useProducts() {
  const items = ref([]);
  const filters = reactive({ sortBy: 'title', searchQuery: '' });

  const load = async () => {
    items.value = await fetchProducts(filters);
  };

  onMounted(load);
  watch(filters, load);

  return { items, filters };
}
