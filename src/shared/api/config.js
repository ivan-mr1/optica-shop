const useProxy = import.meta.env.PROD;

export const BASE_URL = useProxy ? '' : import.meta.env.VITE_API_BASE_URL;
export const PRODUCTS_ENDPOINT = useProxy ? '/api/items' : import.meta.env.VITE_ENDPOINT_PRODUCTS;
export const ORDERS_ENDPOINT = useProxy ? '/api/orders' : import.meta.env.VITE_ENDPOINT_ORDERS;
export const FAVORITES_ENDPOINT = useProxy
  ? '/api/favorites'
  : import.meta.env.VITE_ENDPOINT_FAVORITES;

export const PRODUCTS_COLLECTION = 'products';
