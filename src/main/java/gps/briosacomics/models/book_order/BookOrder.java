package gps.briosacomics.models.book_order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import gps.briosacomics.models.book.Book;
import gps.briosacomics.models.order.Order;

import javax.persistence.*;

@Entity
@Table(name = "book_order")
public class BookOrder {
    @EmbeddedId
    private BookOrderKey id = new BookOrderKey();

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "id_order")
    @JsonIgnore
    private Order order;

    @ManyToOne
    @MapsId("bookOrderId")
    @JoinColumn(name = "id_book")
    private Book bookOrder;

    private int stockBought;

    public BookOrderKey getId() {
        return id;
    }

    public void setId(BookOrderKey id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Book getBookOrder() {
        return bookOrder;
    }

    public void setBookOrder(Book bookOrder) {
        this.bookOrder = bookOrder;
    }

    public int getStockBought() {
        return stockBought;
    }

    public void setStockBought(int stockBought) {
        this.stockBought = stockBought;
    }
}
