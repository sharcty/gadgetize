import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Item } from '../interfaces/interfaces';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsViewComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  public items: Item[]  = [];
  private itemsSubscription: Subscription = new Subscription();
  private readonly destroy$ = new Subject<void>();
  items$: Observable<Item[]> | undefined;
  displayedItems: Item[] | undefined;

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

      this.itemsSubscription = this.items$.subscribe(data => {
        this.displayedItems = data.slice(0, this.paginator? this.paginator.pageSize : 10 ); // Update displayed items
      });
  }

  onPageChange(event: { pageIndex: number; pageSize: number; }): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.items$?.subscribe(data => {
      this.displayedItems = data.slice(startIndex, endIndex); // Update displayed items
    });
  }
}
