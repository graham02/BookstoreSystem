package com.bookstore.system.repository;

import com.bookstore.system.model.PaymentCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentCardRepository extends JpaRepository<PaymentCard, Integer> {

}
