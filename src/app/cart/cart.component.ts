import { Component } from '@angular/core';
import { Item } from '../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getItems, removeItem } from '../store/store.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  items: any;

  constructor(private store: Store<{ items: Item[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(getItems());
  
    this.store.select(state => state).subscribe(items => {
      this.items = items;
    });
  }

  delete(item: Item) {
    this.store.dispatch(removeItem(item));
  }
}
