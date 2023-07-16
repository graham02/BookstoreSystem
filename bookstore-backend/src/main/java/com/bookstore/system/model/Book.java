package com.bookstore.system.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Book {
    enum BOOK_TYPE {
        FEATURED,
        TOP_SELLER,
        DEFAULT
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String isbn;
    private String category;
    private String title;
    private String author;
    @Column(length = 1600)
    private String description;
    private String coverURL;
    private String publisher;
    private String publicationYear;
    private int inStock;
    private double price;
    private double rating;
    private BOOK_TYPE bookType;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCoverURL() {
        return coverURL;
    }

    public void setCoverURL(String coverURL) {
        this.coverURL = coverURL;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getPublicationYear() {
        return publicationYear;
    }

    public void setPublicationYear(String publicationYear) {
        this.publicationYear = publicationYear;
    }

    public int getInStock() {
        return inStock;
    }

    public void setInStock(int inStock) {
        this.inStock = inStock;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public BOOK_TYPE getBookType() {
        return bookType;
    }

    public void setBookType(BOOK_TYPE bookType) {
        this.bookType = bookType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    public double getPrice() {
        return price;
    }

}
