import { Component, OnInit } from '@angular/core';
import { V4Options as UUID } from 'uuid';
import { Book } from '../_models/book';
import { User } from '../_models/user';
import { AdminService } from '../_services/admin/admin.service';

interface Order {
  id: UUID;
  items: OrderItem[];
  client: string;
  shippingData: ShippingData;
  date: string;
  dispatchDate: string;
}

interface OrderItem {
  book: Book;
  quantity: number;
}

interface ShippingData {
  address: string;
  postalCode: string;
  phoneNumber: number;
}

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss'],
})
export class ManageOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getOrders().subscribe((orders) => {
      console.log(orders);
      orders.forEach((order) => {
        const items: OrderItem[] = [];
        order.orders.forEach((item: any) =>
          items.push({ book: item.bookOrder, quantity: item.stockBought })
        );

        const user: User = JSON.parse(localStorage.getItem('user') as string);
        this.adminService.getUser(user.id as UUID).subscribe((user) => {
          const date = new Date(order.dateOrder).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          let dispatchDate: string;
          if (!order.dateSent) {
            dispatchDate = '';
          } else {
            dispatchDate = new Date(order.dateSent).toLocaleDateString(
              undefined,
              {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            );
          }

          this.orders.push({
            id: order.id,
            items,
            client: user.name,
            shippingData: {
              address: user.address,
              postalCode: user.postalCode,
              phoneNumber: user.phoneNumber,
            },
            date,
            dispatchDate,
          });
        });
      });
    });
  }

  confirmOrderDispatch(id: UUID): void {
    this.adminService.confirmOrderDispatch(id).subscribe((next) => {
      const order = this.orders.find((order) => order.id === id) as Order;
      order.dispatchDate = new Date().toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    });
  }
}
