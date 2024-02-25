import { createReducer, on } from '@ngrx/store';
import { addItem, getItems, removeItem } from './store.actions';
import { Item } from '../interfaces/interfaces';

export const initialState: Item[] = [];

export const storeReducer = createReducer(
    initialState,
    on(addItem, (state, action) => [...state, action.item]),
    on(removeItem, (state, action) => state.filter(item => item !== action.item)),
    on(getItems, state => state)
  );
  
  
