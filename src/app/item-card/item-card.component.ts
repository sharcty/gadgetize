import { Component, Input } from '@angular/core';
import { Item } from '../interfaces/interfaces';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  @Input()
  item!: Item;

  ngOnInit(): void {}
}
