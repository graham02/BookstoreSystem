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

    public CUSTOMER_STATE getCustomerState() {
        return customerState;
    }

    public void setCustomerState(CUSTOMER_STATE customerState) {
        this.customerState = customerState;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Set<PaymentCard> getPaymentCards() {
        return paymentCards;
    }

    public void setPaymentCards(Set<PaymentCard> paymentCards) {
        this.paymentCards = paymentCards;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Set<CompletedOrder> getCompletedOrders() {
        return completedOrders;
    }

    public void setCompletedOrders(Set<CompletedOrder> completedOrders) {
        this.completedOrders = completedOrders;
    }
}
