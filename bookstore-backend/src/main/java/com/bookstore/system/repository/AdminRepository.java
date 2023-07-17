package com.bookstore.system.repository;
import com.bookstore.system.model.Admin;
import com.bookstore.system.model.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {


    Admin findByEmail(String email);
    Admin findByVerificationToken(String verificationToken);
}
