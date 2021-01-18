import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { BookInfoComponent } from './book-info/book-info.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchComponent } from './search/search.component';

const firebaseConfig = {
  apiKey: 'AIzaSyBc9LCmaRs-vrUYM8Y9-zazS0tZe-buaH4',
  authDomain: 'briosacomics.firebaseapp.com',
  projectId: 'briosacomics',
  storageBucket: 'briosacomics.appspot.com',
  messagingSenderId: '423311288322',
  appId: '1:423311288322:web:005e409bf3ccfafe915f1b',
};

@NgModule({
  declarations: [					
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SignUpComponent,
    LoginComponent,
    ManageBooksComponent,
    BookInfoComponent,
      CheckoutComponent,
      OrderDetailsComponent,
      ManageOrdersComponent,
      OrdersComponent,
      SearchComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
