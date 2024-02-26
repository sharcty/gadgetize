import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Item } from '../interfaces/interfaces';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsViewComponent implements OnInit, OnDestroy {
  types: any[] = [
    { value: 'all', viewValue: 'All' },
    { value: 'tvs', viewValue: 'Tvs' },
    { value: 'appliances', viewValue: 'Appliances' },
    { value: 'phones', viewValue: 'Phones' },
    { value: 'video games', viewValue: 'Video Games' },
  ];
  selectedType: FormControl<any> = new FormControl(this.types[0].value);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  private itemsSubscription: Subscription = new Subscription();
  private readonly destroy$ = new Subject<void>();
  items$: Observable<Item[]> | undefined;
  allItems: Item[] = [];
  displayedItems: Item[] = [];
  filteredItems: Item[] = [];
  price: FormGroup = this._formBuilder.group({
    under100: false,
    from100to200: false,
    from200to500: false,
    from500to1000: false,
    above1000: false
  });

  searchString: FormControl<any> = new FormControl('');

  constructor(
    private itemsService: ItemsService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getItems();
    this.subscribeToFilters();
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  getItems(): void {
    this.items$ = this.itemsService.getItems().pipe(
      takeUntil(this.destroy$)
    );

    this.itemsSubscription = this.items$.subscribe(data => {
      this.allItems = data;
      this.displayedItems = data;
      this.filterItems();
    });
  }

  subscribeToFilters(): void {
    this.price.valueChanges.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
      this.filterItems();
    });
    this.searchString.valueChanges.pipe(startWith(''), takeUntil(this.destroy$)).subscribe(() => {
      this.filterItems();
    });
    this.selectedType.valueChanges.pipe(startWith(''), takeUntil(this.destroy$)).subscribe(() => {
      this.filterItems();
    });
  }

  filterItems(): void {
    if (!this.allItems || !this.paginator) return;

    let filteredItems: Item[] = [...this.allItems]; 

    filteredItems = filteredItems.filter(item => this.selectedType.value === 'all' || item.type.toLowerCase() === this.selectedType.value);

    const priceFilters = Object.entries(this.price.value).filter(([key, value]) => value);
    
    if (priceFilters.length > 0) {
      filteredItems = filteredItems.filter(item => {
        return priceFilters.some(([key, value]) => {
          const [min, max] = key.split('to').map(val => parseInt(val.replace(/\D/g, ''), 10));
          if (min && max) {
            return item.price >= min && item.price <= max;
          } else if (min) {
            return item.price >= min;
          } else if (max) {
            return item.price <= max;
          }
          return false;
        });
      });
    }
    
    const searchString = this.searchString.value.toLowerCase();
    if (searchString.trim() !== '') {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchString) || item.brand.toLowerCase().includes(searchString)
      );
    }
    
    this.filteredItems = filteredItems;
    this.displayedItems = filteredItems.slice(0, this.paginator? this.paginator.pageSize : 10 ); ;
    this.paginator.firstPage();
  }

  updatePage(): void {
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onPageChange(event: { pageIndex: number; pageSize: number; }): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedItems = this.filteredItems.slice(startIndex, endIndex);
  }

  openDialog(item: Item): void {
    this.dialog.open(ItemModalComponent, {
      data: item,
    });
  }
}
