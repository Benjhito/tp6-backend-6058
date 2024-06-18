import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';


export const routes: Routes = [
  { path: "product", component: ProductFormComponent }, //redirectTo: "home", pathMatch: "full" },
  { path: "product/destacados", component: FeaturedProductsComponent },
  { path: "currency", component: CurrencyConverterComponent },
  { path: "ticket-form", component: TicketFormComponent },
  { path: "ticket-list", component: TicketListComponent },
  { path: "transactions", component: TransactionsListComponent },
];
