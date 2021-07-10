package mk.ukim.finki.bethechange.service.impl;

import mk.ukim.finki.bethechange.model.User;
import mk.ukim.finki.bethechange.model.exception.UserNotFoundException;
import mk.ukim.finki.bethechange.repository.UserRepository;
import mk.ukim.finki.bethechange.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User register(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User edit(User user) {
        User existingUser = findByEmail(user.getEmail());

        existingUser.setJoinedCampaigns(user.getJoinedCampaigns());
        existingUser.setFavoriteCampaigns(user.getFavoriteCampaigns());

        return userRepository.save(existingUser);
    }

}
