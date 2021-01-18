import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookInfoComponent } from './book-info/book-info.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchComponent } from './search/search.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminGuard } from './_guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'book-info/:isbn', component: BookInfoComponent },
  {
    path: 'search',
    component: SearchComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'orders', component: OrdersComponent },
  {
    path: 'admin',
    children: [
      { path: 'manage-orders', component: ManageOrdersComponent },
      { path: 'manage-books', component: ManageBooksComponent },
    ],
    canActivate: [AdminGuard],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
