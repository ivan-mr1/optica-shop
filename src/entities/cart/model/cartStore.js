import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { createOrder as apiCreateOrder } from '@/shared/api/orderApi';

import { useLoadingState } from '@/shared/lib/useLoadingState';

export const useCartStore = defineStore('cart', () => {
  const localCart = localStorage.getItem('cart');
  const cart = ref(localCart ? JSON.parse(localCart) : []);
  const isDrawerOpen = ref(false);
  const orderId = ref(null);
  const { isLoading: isCreatingOrder, error, runAsync } = useLoadingState();

  const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
  const discount = computed(() => Math.round((totalPrice.value * 5) / 100));
  const finishPrice = computed(() => Math.round(totalPrice.value - discount.value));
  const cartIsEmpty = computed(() => cart.value.length === 0);

  const openDrawer = () => {
    isDrawerOpen.value = true;
  };

  const closeDrawer = () => {
    isDrawerOpen.value = false;
    error.value = null; // Сброс ошибки при закрытии
  };

  const addToCart = (item) => {
    if (!cart.value.find((cartItem) => cartItem.id === item.id)) {
      cart.value.push(item);
    }
  };

  const removeFromCart = (item) => {
    cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id);
  };

  const hasItem = (id) => cart.value.some((item) => item.id === id);

  const createOrder = async () => {
    await runAsync(async () => {
      const data = await apiCreateOrder(cart.value, finishPrice.value);
      cart.value = [];
      orderId.value = data.id;
    }, 'Не вдалося оформити замовлення. Спробуйте пізніше.');
  };

  watch(
    cart,
    () => {
      localStorage.setItem('cart', JSON.stringify(cart.value));
    },
    { deep: true },
  );

  return {
    cart,
    isDrawerOpen,
    isCreatingOrder,
    orderId,
    error,
    totalPrice,
    discount,
    finishPrice,
    cartIsEmpty,
    openDrawer,
    closeDrawer,
    addToCart,
    removeFromCart,
    hasItem,
    createOrder,
  };
});
