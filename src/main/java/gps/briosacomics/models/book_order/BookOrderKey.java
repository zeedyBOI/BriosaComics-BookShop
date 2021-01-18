package gps.briosacomics.models.book_order;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class BookOrderKey implements Serializable {
    private static final long serialVersionUID = 1L;
    UUID orderId;
    Long bookOrderId;

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public Long getBookId() {
        return bookOrderId;
    }

    public void setBookId(Long bookId) {
        this.bookOrderId = bookId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookOrderKey that = (BookOrderKey) o;
        return Objects.equals(orderId, that.orderId) && Objects.equals(bookOrderId, that.bookOrderId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, bookOrderId);
    }
}
