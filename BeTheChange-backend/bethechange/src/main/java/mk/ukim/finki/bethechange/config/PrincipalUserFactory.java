package mk.ukim.finki.bethechange.config;

import mk.ukim.finki.bethechange.model.User;


public class PrincipalUserFactory {

    public static PrincipalUser build(User user) {
        return new PrincipalUser(user.getEmail(), user.getPassword(), null);
    }
}
