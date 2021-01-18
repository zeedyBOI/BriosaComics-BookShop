package gps.briosacomics.models.book;

import com.fasterxml.jackson.annotation.JsonIgnore;
import gps.briosacomics.models.book_order.BookOrder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "books")
public class Book
{
    @Id
    @Column(name = "isbn")
    Long isbn;

    @Column(name = "title")
    String title;

    @Column(name = "author")
    String author;

    @Column(name = "edition")
    String edition;

    @Column(name = "publisher")
    String publisher;

    @Column(name = "price")
    Double price;

    @Column(name = "image")
    String image;

    @OneToMany(mappedBy = "bookOrder", cascade = CascadeType.ALL)
    @JsonIgnore
    Collection<BookOrder> orders = new ArrayList<>();

    public Long getIsbn()
    {
        return isbn;
    }

    public void setIsbn(Long isbn)
    {
        this.isbn = isbn;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String name)
    {
        this.title = name;
    }

    public String getAuthor()
    {
        return author;
    }

    public void setAuthor(String author)
    {
        this.author = author;
    }

    public String getEdition()
    {
        return edition;
    }

    public void setEdition(String edition)
    {
        this.edition = edition;
    }

    public String getPublisher()
    {
        return publisher;
    }

    public void setPublisher(String publisher)
    {
        this.publisher = publisher;
    }

    public Double getPrice()
    {
        return price;
    }

    public void setPrice(Double price)
    {
        this.price = price;
    }

    public Collection<BookOrder> getOrders()
    {
        return orders;
    }

    public void setOrders(Collection<BookOrder> orders)
    {
        this.orders = orders;
    }

    public String getImage()
    {
        return image;
    }

    public void setImage(String image)
    {
        this.image = image;
    }
}