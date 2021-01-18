package gps.briosacomics.repositories;

import gps.briosacomics.models.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Transactional
@Repository("orderRep")
public interface OrderRepository extends JpaRepository<Order, UUID> {
    @Query(value = "select * from orders where id_client = ?1", nativeQuery = true)
    List<Order> findOrdersAllByUserId(UUID userId);

    @Modifying
    @Query(value = "update orders set date_sent = current_date where id = ?1", nativeQuery = true)
    void confirmOrderDispatch(UUID orderId);
}
