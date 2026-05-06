import { ref } from 'vue';

/**
 * Хелпер для управления состояниями загрузки и ошибок в асинхронных операциях.
 */
export function useLoadingState() {
  const isLoading = ref(false);
  const error = ref(null);

  /**
   * Обертка для выполнения асинхронной функции с автоматическим управлением флагами.
   * @param {Function} fn - Асинхронная функция для выполнения.
   * @param {string} errorMessage - Сообщение об ошибке в случае сбоя.
   */
  const runAsync = async (fn, errorMessage = 'Сталася помилка при завантаженні даних') => {
    isLoading.value = true;
    error.value = null;
    try {
      return await fn();
    } catch (err) {
      error.value = errorMessage;
      console.error('Async operation failed:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    runAsync,
  };
}
