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
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { storeReducer } from './store/store.reducer';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatExpansionModule} from '@angular/material/expansion';

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
    AppRoutingModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogTitle, 
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, MatExpansionModule,
    StoreModule.forRoot({ store: storeReducer })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
