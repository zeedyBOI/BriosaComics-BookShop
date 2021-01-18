package gps.briosacomics.services;

import gps.briosacomics.models.DTOs.SignInDTO;
import gps.briosacomics.models.DTOs.SignUpDTO;
import gps.briosacomics.models.user.User;
import gps.briosacomics.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.*;

@Service
public class UserService
{
    final UserRepository userRepository;

    public UserService(@Qualifier("userRep") UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public User singIn(SignInDTO signInDTO)
    {
        User user = userRepository.getUserByEmail(signInDTO.getEmail());
        if (user != null)
        {
            byte[] signInPassHash = getHash(
                    signInDTO.getPassword().toCharArray(),
                    user.getSalt()
            );
            if (Arrays.equals(signInPassHash, user.getPassHash()))
                return new User(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getAddress(),
                        user.getPostalCode(),
                        user.getRole()
                );
        }
        return null;
    }

    public boolean signUp(SignUpDTO signUpDTO)
    {
        try
        {
            if (userRepository.getUserByEmail(signUpDTO.getEmail()) != null)
                return false;

            byte[] salt = getSalt();
            byte[] passHash = getHash(signUpDTO.getPassword().toCharArray(), salt);
            userRepository.save(new User(
                            signUpDTO.getName(),
                            signUpDTO.getEmail(),
                            salt,
                            passHash,
                            signUpDTO.getPhoneNumber(),
                            signUpDTO.getAddress(),
                            signUpDTO.getPostalCode(),
                            signUpDTO.getRole()
                    )
            );
            return true;
        } catch (NoSuchAlgorithmException e)
        {
            e.printStackTrace();
            return false;
        }
    }

    public void deleteUser(UUID userId)
    {
        userRepository.delete(userRepository.getOne(userId));
    }

    public Optional<User> getUser(UUID userId)
    {
        return userRepository.findById(userId);
    }

    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    private byte[] getSalt() throws NoSuchAlgorithmException
    {
        SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
        byte[] salt = new byte[16];
        sr.nextBytes(salt);
        return salt;
    }

    private byte[] getHash(char[] password, byte[] salt)
    {
        PBEKeySpec spec = new PBEKeySpec(password, salt, 10000, 256);
        Arrays.fill(password, Character.MIN_VALUE);
        try
        {
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            return skf.generateSecret(spec).getEncoded();
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e)
        {
            throw new AssertionError("Error while hashing a password: " + e.getMessage(), e);
        } finally
        {
            spec.clearPassword();
        }
    }
}
