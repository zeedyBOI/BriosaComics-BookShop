package gps.briosacomics.repositories;

import gps.briosacomics.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository("userRep")
public interface UserRepository extends JpaRepository<User, UUID> {
    @Query(value = "select * from users where email = ?1", nativeQuery = true)
    User getUserByEmail(String email);

    @Query(value = "select salt from users where email = ?1", nativeQuery = true)
    byte[] getUserSalt(String email);

    @Query(value = "select passhash from users where email = ?1", nativeQuery = true)
    byte[] getUserPassHash(String email);
}
