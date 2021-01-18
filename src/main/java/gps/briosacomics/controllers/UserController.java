package gps.briosacomics.controllers;

import gps.briosacomics.models.DTOs.SignInDTO;
import gps.briosacomics.models.DTOs.SignUpDTO;
import gps.briosacomics.models.book.Book;
import gps.briosacomics.models.order.Order;
import gps.briosacomics.models.user.User;
import gps.briosacomics.services.BookService;
import gps.briosacomics.services.OrderService;
import gps.briosacomics.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("user")
@RestController
public class UserController
{

    private final UserService userService;
    private final OrderService orderService;
    private final BookService bookService;

    @Autowired
    public UserController(
            UserService userService,
            OrderService orderService,
            BookService bookService
    )
    {
        this.userService = userService;
        this.orderService = orderService;
        this.bookService = bookService;
    }

    @PostMapping(value = "/login")
    public User signIn(@RequestBody SignInDTO signInDTO)
    {
        return userService.singIn(signInDTO);
    }

    @PostMapping(value = "/register")
    public boolean signUp(@RequestBody SignUpDTO signUpDTO)
    {
        return userService.signUp(signUpDTO);
    }

    @GetMapping(value = "/orders")
    public List<Order> getOrders(@RequestParam UUID userId)
    {
        return orderService.getAllOrders(userId);
    }

    @PostMapping(value = "/order-book")
    public void orderBook(@RequestBody Order order)
    {
        orderService.addOrder(order);
    }

    @GetMapping(value = "/search-book/{title}")
    public List<Book> searchBookByTitle(@PathVariable String title)
    {
        return bookService.searchBookByTitle(title);
    }
}
