import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Item } from '../interfaces/interfaces';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsViewComponent implements OnInit, OnDestroy {
  public items: Item[]  = [];
  private itemsSubscription: Subscription = new Subscription();
  private readonly destroy$ = new Subject<void>();
  items$: Observable<Item[]> | undefined;
  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.getItems();
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  getItems(): void {
    this.items$ = this.itemsService.getItems().pipe(
      take(1),
      takeUntil(this.destroy$));

      this.items$.subscribe(
        items => {
          this.items = items;
        }
      )
  }
}
