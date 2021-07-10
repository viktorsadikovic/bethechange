package mk.ukim.finki.bethechange.service;

import mk.ukim.finki.bethechange.model.User;

import java.util.List;

public interface UserService {
    User register(User user);

    boolean existsByEmail(String email);

    User findByEmail(String email);

    List<User> findAll();

    User edit(User user);

}
