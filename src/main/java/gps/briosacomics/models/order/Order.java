package gps.briosacomics.models.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import gps.briosacomics.models.book.Book;
import gps.briosacomics.models.book_order.BookOrder;
import org.hibernate.annotations.Type;
import org.springframework.lang.Nullable;
import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "orders")
public class Order
{
    @Id
    @Type(type = "pg-uuid")
    @Column(name = "id")
    private final UUID id = UUID.randomUUID();

    @JoinColumn(name = "id_client")
    private UUID idClient;

    @Transient
    private String clientId;

    @Column(name = "date_order")
    private final Date dateOrder = new Date();

    @Nullable
    @Column(name = "date_sent")
    private Date dateSent;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private Collection<BookOrder> orders = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public UUID getIdClient() {
        return idClient;
    }

    public void setIdClient(UUID idClient) {
        this.idClient = idClient;
    }

    public Date getDateOrder() {
        return dateOrder;
    }

    @Nullable
    public Date getDateSent() {
        return dateSent;
    }

    public void setDateSent(@Nullable Date dateSent) {
        this.dateSent = dateSent;
    }

    public Collection<BookOrder> getOrders() {
        return orders;
    }

    public void setOrders(Collection<BookOrder> orders) {
        this.orders = orders;
    }

    public String getClientId()
    {
        return clientId;
    }

    public void setClientId(String clientId)
    {
        this.clientId = clientId;
    }
}