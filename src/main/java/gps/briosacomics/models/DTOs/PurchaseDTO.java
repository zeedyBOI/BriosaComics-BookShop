package gps.briosacomics.models.DTOs;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class PurchaseDTO {
    private String supplier;
    private List<BookPDTO> booksPurchased = new ArrayList<>();

    public String getSupplier() {
        return supplier;
    }

    public List<BookPDTO> getBooksPurchased() {
        return booksPurchased;
    }
}
