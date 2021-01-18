package gps.briosacomics.controllers;

import gps.briosacomics.models.order.Order;
import gps.briosacomics.services.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("employee")
@RestController
public class EmployeeController
{
    private final OrderService orderService;

    public EmployeeController(OrderService orderService)
    {
        this.orderService = orderService;
    }

    @GetMapping(value = "/order-list")
    public List<Order> getOrders()
    {
        return orderService.getAllOrders();
    }
}
