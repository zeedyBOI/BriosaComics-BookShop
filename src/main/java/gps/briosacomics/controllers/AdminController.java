package gps.briosacomics.controllers;

import gps.briosacomics.models.book.Book;
import gps.briosacomics.models.order.Order;
import gps.briosacomics.models.user.User;
import gps.briosacomics.services.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("admin")
@RestController
public class AdminController
{
    private final BookService bookService;
    private final OrderService orderService;
    private final UserService userService;

    public AdminController(
            BookService bookService,
            OrderService orderService,
            UserService userService)
    {
        this.bookService = bookService;
        this.orderService = orderService;
        this.userService = userService;
    }

    @GetMapping("/get-book/{isbn}")
    public Book getBook(@PathVariable("isbn") Long isbn)
    {
        return bookService.getBook(isbn);
    }

    @GetMapping("/get-books")
    public List<Book> getBooks()
    {
        return bookService.getAllBooks();
    }

    @PostMapping(value = "/add-book")
    public String addBook(@RequestBody Book book)
    {
        return bookService.addBook(book);
    }

    @DeleteMapping(value = "/delete-book/{isbn}")
    public void deleteBook(@PathVariable("isbn") Long isbn)
    {
        bookService.deleteBook(isbn);
    }

    @PutMapping(path = "/confirm-order-dispatch/{orderId}")
    public void confirmOrderDispatch(@PathVariable("orderId") UUID orderId)
    {
        orderService.confirmOrderDispatch(orderId);
    }

    @GetMapping(value = "/orders")
    public List<Order> getOrders()
    {
        return orderService.getAllOrders();
    }

    @GetMapping(value = "/user/{id}")
    public User getUser(@PathVariable String id)
    {
        return userService.getUser(UUID.fromString(id)).get();
    }
}
