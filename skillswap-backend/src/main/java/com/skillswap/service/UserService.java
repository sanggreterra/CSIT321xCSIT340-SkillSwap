package com.skillswap.service;

import com.skillswap.dto.response.UserResponse;
import com.skillswap.model.User;
import com.skillswap.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse getProfile(Long id) {
        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) throw new RuntimeException("User not found");
        User u = opt.get();
        UserResponse r = new UserResponse();
        r.setId(u.getId());
        r.setName(u.getName());
        r.setEmail(u.getEmail());
        return r;
    }

    public UserResponse updateProfile(Long id, UserResponse update) {
        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) throw new RuntimeException("User not found");
        User u = opt.get();
        u.setName(update.getName());
        u.setEmail(update.getEmail());
        userRepository.save(u);
        return getProfile(id);
    }
}
