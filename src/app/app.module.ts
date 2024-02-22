import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemsViewComponent } from './items-view/items-view.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ItemModalComponent } from './item-modal/item-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ItemCardComponent,
    ItemsViewComponent,
    ItemModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
