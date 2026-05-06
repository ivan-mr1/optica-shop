import { apiClient } from './apiClient';
import { PRODUCTS_ENDPOINT } from './config';

export const fetchProducts = async (params) => {
  const { data } = await apiClient.get(PRODUCTS_ENDPOINT, { params });
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await apiClient.get(`${PRODUCTS_ENDPOINT}/${id}`);
  return data;
};
