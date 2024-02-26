import { createReducer, on } from '@ngrx/store';
import { addItem, getItems, removeItem } from './store.actions';
import { Item } from '../interfaces/interfaces';

export const initialState: Item[] = [];

export const storeReducer = createReducer(
    initialState,
    on(addItem, (state, action) => [...state, action.item]),
    on(removeItem, (state, action) => {
      const index = state.indexOf(action.item);
      if (index !== -1) {
        return state.slice(0, index).concat(state.slice(index + 1));
      }
      return state;
    }),
    on(getItems, state => state)
  );
  
  
