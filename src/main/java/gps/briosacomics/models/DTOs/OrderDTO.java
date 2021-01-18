package gps.briosacomics.models.DTOs;

import java.util.UUID;

public class OrderDTO {
    private UUID idClient;
    private Integer idBook;

    public Integer getIdBook() {
        return idBook;
    }

    public void setIdBook(Integer idBook) {
        this.idBook = idBook;
    }

    public UUID getIdClient() {
        return idClient;
    }

    public void setIdClient(UUID idClient) {
        this.idClient = idClient;
    }
}
