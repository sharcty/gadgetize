import { Component } from '@angular/core';
import { Item } from '../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getItems, removeItem } from '../store/store.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  items: any;
  total: number = 0;

  constructor(
    private store: Store<{ items: Item[] }>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getItems());

    this.store
      .select((state) => state)
      .subscribe((items) => {
        this.items = items;
        this.calculateTotal(items);
      });
  }

  delete(item: Item) {
    this.store.dispatch(removeItem(item));
    this._snackBar.open('Item deleted', '', {
      duration: 1000,
    });
  }

  calculateTotal(items: any): void {
    if (items.store) {
      this.total = 0;
      items.store.forEach((el: { price: any }) => {
        this.total += el.price;
      });
    }
  }
}
