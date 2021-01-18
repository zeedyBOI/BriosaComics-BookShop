package gps.briosacomics.repositories;

import gps.briosacomics.models.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository("bookRep")
public interface BookRepository extends JpaRepository<Book, Long> {
    Book findBookByIsbn(Long isbn);

    List<Book> findByTitleContainingIgnoreCase(String title);

    boolean existsByIsbn(Long isbn);

    boolean existsByTitleAndEdition(String title, String edition);
}
