package com.vlad.springbootlibrary.service;

import com.vlad.springbootlibrary.dao.BookRepository;
import com.vlad.springbootlibrary.entity.Book;
import com.vlad.springbootlibrary.requestmodels.AddBookRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AdminService {
    @Autowired
    private BookRepository bookRepository;

    public void postBook(AddBookRequest addBookRequest) {
        Book book = new Book();
        book.setTitle((addBookRequest.getTitle()));
        book.setAuthor(addBookRequest.getAuthor());
        book.setDescription(addBookRequest.getDescription());
        book.setCopies(addBookRequest.getCopies());
        book.setCopiesAvailable(addBookRequest.getCopies());
        book.setCategory(addBookRequest.getCategory());
        book.setImg(addBookRequest.getImg());

        bookRepository.save(book);
    }
}
