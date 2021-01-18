package gps.briosacomics.models.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Type;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User
{
    @Id
    @Type(type = "pg-uuid")
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private int phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "postal_code")
    private String postalCode;

    @JsonIgnore
    @Column(name = "salt")
    private byte[] salt;

    @JsonIgnore
    @Column(name = "passhash")
    private byte[] passHash;

    @Column(name = "role")
    String role;

    public User(
                @JsonProperty("namename") String name,
                @JsonProperty("email") String email,
                byte[] salt,
                byte[] passHash,
                @JsonProperty("phoneNumber") int phoneNumber,
                @JsonProperty("address") String address,
                @JsonProperty("postalCode") String postalCode,
                @JsonProperty("role") String role
    )
    {
        this.id = UUID.randomUUID();
        this.name = name;
        this.email = email;
        this.salt = salt;
        this.passHash = passHash;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.postalCode = postalCode;
        this.role = role;
    }

    public User(
            @JsonProperty("id") UUID id,
            @JsonProperty("name") String name,
            @JsonProperty("email") String email,
            @JsonProperty("phoneNumber") int phoneNumber,
            @JsonProperty("address") String address,
            @JsonProperty("postalCode") String postalCode,
            @JsonProperty("role") String role
    )
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.postalCode = postalCode;
        this.role = role;
    }

    public User() {}

    public UUID getId() { return this.id; }
    public int getPhoneNumber() { return this.phoneNumber; }
    public String getName() { return this.name; }
    public String getEmail() { return this.email; }
    public String getAddress() { return this.address; }
    public String getPostalCode() { return this.postalCode; }
    public byte[] getSalt() { return salt; }
    public byte[] getPassHash() { return passHash; }
    public String getRole() { return role; }
}