package com.bookstore.system.controller;

import com.bookstore.system.model.Customer;
import com.bookstore.system.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/api/user")
    Customer newCustomer(@RequestBody Customer newCustomer) {
        return customerRepository.save(newCustomer);
    }

    @GetMapping("/api/users")
    List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
}
