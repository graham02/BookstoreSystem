package com.bookstore.system.controller;

import com.bookstore.system.model.Customer;
import com.bookstore.system.repository.CustomerRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/api/signup")
    ResponseEntity<String> newCustomer(@Valid @RequestBody Customer newCustomer) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Account Created");
    }

    @GetMapping("/api/customers")
    List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/api/customer")
    Customer getCustomer(@RequestParam String email) {
        return customerRepository.findByEmail(email);
    }
}
