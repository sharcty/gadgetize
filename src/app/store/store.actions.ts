import { createAction } from '@ngrx/store';
import { Item } from '../interfaces/interfaces';

export const addItem = createAction('[Store Component] Add', (item: Item) => ({
  item,
}));
export const removeItem = createAction(
  '[Store Component] Remove',
  (item: Item) => ({ item })
);
export const getItems = createAction('[Store Component] Get Items');
