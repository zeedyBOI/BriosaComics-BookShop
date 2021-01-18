package gps.briosacomics.services;

import gps.briosacomics.exceptions.ResourceNotFoundException;
import gps.briosacomics.models.book.Book;
import gps.briosacomics.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService
{
    final BookRepository bookRepository;

    public BookService(@Qualifier("bookRep") BookRepository repository)
    {
        this.bookRepository = repository;
    }

    public String addBook(Book book)
    {
        if (bookRepository.existsByIsbn(book.getIsbn()))
            return String.format("Já existe um livro com o isbn %s"
                    , book.getIsbn());

        if (bookRepository.existsByTitleAndEdition(
                book.getTitle(), book.getEdition())
        )
        {
            return String.format("Já existe um livro com o título " +
                    "%s e edição %s", book.getTitle(),
                    book.getEdition());
        }

        bookRepository.save(book);
        return null;
    }

    public void deleteBook(Long isbn)
    {
        bookRepository.delete(bookRepository.getOne(isbn));
    }

    public Book getBook(Long isbn)
    {
        return bookRepository.findBookByIsbn(isbn);
    }

    public List<Book> searchBookByTitle(String title)
    {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }

    public ResponseEntity<Book> searchBookByIsbn(Long isbn)
    {
        Book book = bookRepository.findById(isbn).orElseThrow(() ->
                new ResourceNotFoundException("Book with isbn " + isbn + " doesnt exist "));
        return ResponseEntity.ok(book);
    }

    public List<Book> getAllBooks()
    {
        return bookRepository.findAll();
    }
}
