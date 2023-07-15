package com.bookstore.system.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToMany(mappedBy = "cart")
    private Set<CartBook> cartBooks;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Set<CartBook> getCartBooks() {
        return cartBooks;
    }

    public void setCartBooks(Set<CartBook> cartBooks) {
        this.cartBooks = cartBooks;
    }
}
