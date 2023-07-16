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
        if (customerRepository.findByEmail(newCustomer.getEmail()) != null)
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Account already exists");

        // new customers must be verified via email
        newCustomer.setCustomerState(Customer.CUSTOMER_STATE.INACTIVE);

        // create a cart for the customer
        newCustomer.setCart(new Cart());

        // ensure password length > 6
        if (newCustomer.getPassword().length() < 6)
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Password too short");

        // encrypt their password
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        newCustomer.setPassword(passwordEncoder.encode(newCustomer.getPassword()));

        // TODO: send verification email

        // email validation
        // regex source: https://www.baeldung.com/java-email-validation-regex
        if (!Pattern.compile("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
                .matcher(newCustomer.getEmail())
                .matches())
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid email");

        // save customer in database
        customerRepository.save(newCustomer);

        // account creation success
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Account Created");
    }

    @PostMapping("/api/login")
    ResponseEntity<String> userLogin(@Valid @RequestBody Login login) {
        Customer customer = customerRepository.findByEmail(login.getEmail());

        if (customer != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            boolean isMatch = passwordEncoder.matches(login.getPassword(), customer.getPassword());

            if (isMatch)
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body("Login success");
            else
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Invalid credentials");
        } else
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Account not found");
    }
}
