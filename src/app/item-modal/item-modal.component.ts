import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from '../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { addItem, getItems } from '../store/store.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrl: './item-modal.component.scss',
})
export class ItemModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private store: Store,
    private _snackBar: MatSnackBar
  ) {}

  buyItem(): void {
    this.store.dispatch(addItem(this.data));

    this.dialogRef.close();
    this._snackBar.open('Item added', '', {
      duration: 3000,
    });
  }
}
