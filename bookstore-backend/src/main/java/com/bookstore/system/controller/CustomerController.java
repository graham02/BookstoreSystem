package com.bookstore.system.controller;

import com.bookstore.system.model.Customer;
import com.bookstore.system.repository.CustomerRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/api/signup")
    ResponseEntity<String> newCustomer(@Valid @RequestBody Customer newCustomer) {
        newCustomer.setCustomerState(Customer.CUSTOMER_STATE.INACTIVE);
        // TODO: add password encryption
        if (newCustomer.getPassword().length() < 6)
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Password too short");

        // TODO: send verification email

        // email validation
        // regex source: https://www.baeldung.com/java-email-validation-regex
        if (!Pattern.compile("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
                .matcher(newCustomer.getEmail())
                .matches())
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid email");

        // account created ok
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
