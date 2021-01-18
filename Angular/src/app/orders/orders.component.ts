import { Component, OnInit } from '@angular/core';
import { V4Options as UUID } from 'uuid';
import { Book } from '../_models/book';
import { UserService } from '../_services/user/user.service';

interface Order {
  id: UUID;
  items: OrderItem[];
  date: string;
  dispatchDate: string;
}

interface OrderItem {
  book: Book;
  quantity: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getOrders().subscribe((orders) => {
      console.log(orders);
      orders.forEach((order) => {
        const items: OrderItem[] = [];
        order.orders.forEach((item: any) =>
          items.push({ book: item.bookOrder, quantity: item.stockBought })
        );

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
          date,
          dispatchDate,
        });
      });
    });
  }
}
