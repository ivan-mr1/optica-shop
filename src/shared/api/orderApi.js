import { apiClient } from './apiClient';
import { ORDERS_ENDPOINT } from './config';

export const createOrder = async (items, finishPrice) => {
  const { data } = await apiClient.post(ORDERS_ENDPOINT, {
    items,
    finishPrice,
  });
  return data;
};
