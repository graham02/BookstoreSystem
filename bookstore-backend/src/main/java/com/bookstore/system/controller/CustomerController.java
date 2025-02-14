package com.bookstore.system.controller;

import com.bookstore.system.model.Cart;
import com.bookstore.system.model.Customer;
import com.bookstore.system.model.Login;
import com.bookstore.system.model.PaymentCard;
import com.bookstore.system.repository.CustomerRepository;
import com.bookstore.system.service.EmailService;
import com.bookstore.system.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
    private EmailService emailService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

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

        // encrypt their card number
        for (PaymentCard card : newCustomer.getPaymentCards())
        {
            if (!card.getCardNumber().matches("\\d+"))
                return ResponseEntity.badRequest().body("Card number invalid");

            card.setLastFour(
                    card.getCardNumber().substring(card.getCardNumber().length() - 4)
            );
            card.setCardNumber(passwordEncoder.encode(card.getCardNumber()));
        }

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
        String jwtToken = jwtService.generateToken(newCustomer);

        // account creation success
        return ResponseEntity.ok().body("Account creation success");
    }

    @GetMapping("/verify-account")
    public ResponseEntity<String> confirmEmail(@RequestParam("token") String verificationToken) {
        Customer customer = customerRepository.findByVerificationToken(verificationToken);

        if(customer != null) {
            if (customer.getCustomerState() != Customer.CUSTOMER_STATE.ACTIVE) {
                customer.setCustomerState(Customer.CUSTOMER_STATE.ACTIVE);
                customerRepository.save(customer);
                return ResponseEntity.ok("<!DOCTYPE html>\n" +
                        "<html lang=\"en\">\n" +
                        "<head>\n" +
                        "    <meta charset=\"UTF-8\">\n" +
                        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                        "    <title>Account Activated</title>\n" +
                        "</head>\n" +
                        "<body style=\"background-color: rgb(243, 243, 243);\">\n" +
                        "    <h1 style=\"font-size: 4em;text-align: center;padding-top: 2em;font-family: font-family:Arial, Helvetica, sans-serif;;\">\n" +
                        "        Your account has been successfully activated!\n" +
                        "    </h1>\n" +
                        "</body>\n" +
                        "</html>");
            } else
                return ResponseEntity.ok("<!DOCTYPE html>\n" +
                        "<html lang=\"en\">\n" +
                        "<head>\n" +
                        "    <meta charset=\"UTF-8\">\n" +
                        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                        "    <title>Account Activated</title>\n" +
                        "</head>\n" +
                        "<body style=\"background-color: rgb(243, 243, 243);\">\n" +
                        "    <h1 style=\"font-size: 4em;text-align: center;padding-top: 2em;font-family: font-family:Arial, Helvetica, sans-serif;;\">\n" +
                        "        Your account has already been activated.\n" +
                        "    </h1>\n" +
                        "</body>\n" +
                        "</html>");
        }
        return ResponseEntity.badRequest().body("Account doesn't exist");
    }

    @PostMapping("/api/reset")
    public ResponseEntity<String> resetAccount(@RequestParam("email") String email) {
        Customer customer = customerRepository.findByEmail(email);

        if(customer != null) {
            customer.setConfirmationToken(UUID.randomUUID().toString());
            customerRepository.save(customer);

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(customer.getEmail());
            mailMessage.setSubject("Reset your password");
            mailMessage.setText("To reset your password, please click here : "
                    +"http://localhost:3000/ResetPassword/"+customer.getVerificationToken());
            emailService.sendEmail(mailMessage);
            return ResponseEntity.ok().body("Request Received");
        }
        return ResponseEntity.badRequest().body("Account not found");
    }

    @PostMapping("/verify-reset")
    public ResponseEntity<String> confirmReset(@RequestParam("token") String verificationToken, @RequestParam("password") String password) {
        Customer customer = customerRepository.findByVerificationToken(verificationToken);

        if(customer != null) {
            // encrypt their password
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            customer.setPassword(passwordEncoder.encode(password));
            customerRepository.save(customer);

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(customer.getEmail());
            mailMessage.setSubject("Your password has been changed");
            mailMessage.setText("Your password has successfully been changed");
            emailService.sendEmail(mailMessage);

            return ResponseEntity.ok().body("Password changed");
        }
        return ResponseEntity.badRequest().body("Error setting password");
    }

    @PostMapping("/api/login")
    ResponseEntity<String> userLogin(@Valid @RequestBody Login login) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getEmail(),
                        login.getPassword()
                )
        );

        Customer customer = customerRepository.findByEmail(login.getEmail());

        if (customer != null) {
            // if here then user is authenticated and exists
            if(customer.getCustomerState() == Customer.CUSTOMER_STATE.ACTIVE)
                return ResponseEntity.ok().body(jwtService.generateToken(customer));
            if(customer.getCustomerState() == Customer.CUSTOMER_STATE.INACTIVE)
                return ResponseEntity.status(403).body("Account not activated");
        }
        return ResponseEntity.badRequest().body("Invalid Credentials");
    }

    @GetMapping("/api/profile/:{email}")
    public ResponseEntity<?> getCustomerProfile(@PathVariable String email) {
        Customer customer = customerRepository.findByEmail(email);

        if (customer != null)
            return ResponseEntity.ok().body(customer);
        return ResponseEntity.badRequest().body("Invalid Credentials");
    }
}
