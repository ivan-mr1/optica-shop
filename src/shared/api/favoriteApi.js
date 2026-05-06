import { apiClient } from './apiClient';
import { FAVORITES_ENDPOINT } from './config';

export const fetchFavorites = async () => {
  const { data } = await apiClient.get(FAVORITES_ENDPOINT);
  return data;
};

export const fetchFavoritesWithRelations = async () => {
  const { data } = await apiClient.get(`${FAVORITES_ENDPOINT}?_relations=products`);
  return data;
};

export const addFavorite = async (item) => {
  const obj = {
    item_id: item.id,
    item,
  };
  const { data } = await apiClient.post(FAVORITES_ENDPOINT, obj);
  return data;
};

export const removeFavorite = async (favoriteId) => {
  await apiClient.delete(`${FAVORITES_ENDPOINT}/${favoriteId}`);
};
