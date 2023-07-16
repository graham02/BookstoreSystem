package com.bookstore.system.exception;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(Integer id) {
        super("Unable to find book with id: {" + id + "}");
    }
}
