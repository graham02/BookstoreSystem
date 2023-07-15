package com.bookstore.system.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name="customers")
public class Customer extends User {
    enum CUSTOMER_STATE {
            ACTIVE,
            INACTIVE,
            SUSPENDED
    }

    private CUSTOMER_STATE customerState;
    @OneToOne
    private Address address;

    @OneToMany(mappedBy = "customer")
    private Set<PaymentCard> paymentCards;

    @OneToOne
    private Cart cart;

    @OneToMany(mappedBy = "customer")
    private Set<CompletedOrder> completedOrders;
}
