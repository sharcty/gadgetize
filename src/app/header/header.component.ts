import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../interfaces/interfaces';
import { Observable, Subscription } from 'rxjs';
import { getItems } from '../store/store.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: any;

  constructor(private store: Store<{ items: Item[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(getItems());
    
    this.store.select(state => state).subscribe(items => {
      this.items = items;
    });
  }
}
