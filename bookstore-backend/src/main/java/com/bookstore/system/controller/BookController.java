package com.bookstore.system.controller;

import com.bookstore.system.exception.BookNotFoundException;
import com.bookstore.system.model.Book;
import com.bookstore.system.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/api/book/:{id}")
    Book getBook(@PathVariable Integer id) {
        return bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id));
    }

    @GetMapping("/api/books")
    List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}
