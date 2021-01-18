package gps.briosacomics.services;

import gps.briosacomics.models.book.Book;
import gps.briosacomics.models.book_order.BookOrder;
import gps.briosacomics.models.order.Order;
import gps.briosacomics.repositories.BookRepository;
import gps.briosacomics.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {
    final OrderRepository orderRepository;
    final BookRepository bookRepository;

    public OrderService(@Qualifier("orderRep") OrderRepository orderRepository, @Qualifier("bookRep") BookRepository bookRepository) {
        this.orderRepository = orderRepository;
        this.bookRepository = bookRepository;
    }

    public void addOrder(Order order) {
        Order newOrder = new Order();
        newOrder.setIdClient(UUID.fromString(order.getClientId()));
        newOrder.getOrders().addAll((order.getOrders()
                .stream()
                .map( o -> {
                    Book book = bookRepository.findBookByIsbn(o.getBookOrder().getIsbn());
                    BookOrder bookOrder = new BookOrder();
                    bookOrder.setBookOrder(book);
                    bookOrder.setOrder(newOrder);
                    bookOrder.setStockBought(o.getStockBought());
                    return bookOrder;
                })
                .collect(Collectors.toList())
        ));
        orderRepository.save(newOrder);
    }

    public void deleteOrder(UUID orderId) {
        orderRepository.delete(orderRepository.getOne(orderId));
    }

    public Order getOrder(UUID orderId) {
        return orderRepository.getOne(orderId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getAllOrders(UUID userId) {
        return orderRepository.findOrdersAllByUserId(userId);
    }

    public void confirmOrderDispatch(UUID orderId) {
        orderRepository.confirmOrderDispatch(orderId);
    }
}
