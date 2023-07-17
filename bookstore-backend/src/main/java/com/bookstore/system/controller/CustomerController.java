package com.bookstore.system.controller;

import com.bookstore.system.model.Cart;
import com.bookstore.system.model.Customer;
import com.bookstore.system.model.Login;
import com.bookstore.system.repository.CustomerRepository;
import com.bookstore.system.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.regex.Pattern;

@RestController
@CrossOrigin
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    EmailService emailService;

    @PostMapping("/api/signup")
    ResponseEntity<String> newCustomer(@Valid @RequestBody Customer newCustomer) {
        if (customerRepository.findByEmail(newCustomer.getEmail()) != null)
            return ResponseEntity.badRequest().body("Account already exists");

        // new customers must be verified via email
        newCustomer.setCustomerState(Customer.CUSTOMER_STATE.INACTIVE);

        // create a cart for the customer
        newCustomer.setCart(new Cart());

        // ensure password length > 6
        if (newCustomer.getPassword().length() < 6)
            return ResponseEntity.badRequest().body("Password too short");

        // encrypt their password
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        newCustomer.setPassword(passwordEncoder.encode(newCustomer.getPassword()));


        // email validation
        // regex source: https://www.baeldung.com/java-email-validation-regex
        if (!Pattern.compile("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
                .matcher(newCustomer.getEmail())
                .matches())
            return ResponseEntity.badRequest().body("Invalid email");
        
        // add verification token
        newCustomer.setConfirmationToken(UUID.randomUUID().toString());

        // send verification email
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(newCustomer.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here : "
                +"http://localhost:8080/verify-account?token="+newCustomer.getVerificationToken());
        emailService.sendEmail(mailMessage);

        // save customer in database
        customerRepository.save(newCustomer);

        // account creation success
        return ResponseEntity.ok().body("Account created");
    }

    @GetMapping("/verify-account")
    public ResponseEntity<String> confirmEmail(@RequestParam("token") String verificationToken) {
        Customer customer = customerRepository.findByVerificationToken(verificationToken);

        if(customer != null)
        {
            customer.setCustomerState(Customer.CUSTOMER_STATE.ACTIVE);
            customerRepository.save(customer);
            return ResponseEntity.ok("Account has been activated");
        }
        return ResponseEntity.badRequest().body("Account doesn't exist");
    }
    
    @PostMapping("/api/login")
    ResponseEntity<String> userLogin(@Valid @RequestBody Login login) {
        Customer customer = customerRepository.findByEmail(login.getEmail());

        if (customer != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            boolean isMatch = passwordEncoder.matches(login.getPassword(), customer.getPassword());

            if (isMatch)
                return ResponseEntity.ok().body("Login success");
            else
                return ResponseEntity.badRequest().body("Invalid login credentials");
        } else
            return ResponseEntity.badRequest().body("Account not found");
    }
}
