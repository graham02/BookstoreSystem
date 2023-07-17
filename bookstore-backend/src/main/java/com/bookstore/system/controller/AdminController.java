package com.bookstore.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.system.model.Admin;
import com.bookstore.system.repository.AdminRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

    @GetMapping("/api/admin")
    public ResponseEntity<?> getAdminProfile(@RequestParam("email") String email) {
        Admin admin = adminRepository.findByEmail(email);

        if (admin != null)
            return ResponseEntity.ok().body(admin);
        return ResponseEntity.badRequest().body("Invalid Credentials");
    }
}
