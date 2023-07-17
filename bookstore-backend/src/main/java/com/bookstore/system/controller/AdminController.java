package com.bookstore.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.system.model.Admin;
import com.bookstore.system.model.Login;
import com.bookstore.system.repository.AdminRepository;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/api/login/admin")
    ResponseEntity<String> adminLogin(@Valid @RequestBody Login login) {
        Admin admin = adminRepository.findByEmail(login.getEmail());

        if (admin != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            boolean isMatch = passwordEncoder.matches(login.getPassword(), admin.getPassword());

            if (isMatch) {
                return ResponseEntity.ok().body(admin.getVerificationToken());
            }
        }
        return ResponseEntity.badRequest().body("Invalid Credentials");
    }

    @GetMapping("/api/admin")
    public ResponseEntity<?> doesAdminExist(@RequestParam("token") String token) {
        Admin admin = adminRepository.findByVerificationToken(token);

        if (admin != null)
            return ResponseEntity.ok().body("Admin found");
        return ResponseEntity.badRequest().body("Invalid Credentials");
    }

}

