import { V4Options as UUID } from 'uuid';
import { Book } from './book';

export interface Order {
    clientId: UUID;
    orders: BookOrder[];
}

export interface BookOrder {
    bookOrder: Book;
    stockBought: number;
}
