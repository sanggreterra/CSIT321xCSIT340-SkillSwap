package com.skillswap.service;

import com.skillswap.dto.request.LoginRequest;
import com.skillswap.dto.request.RegisterRequest;
import com.skillswap.dto.response.LoginResponse;
import com.skillswap.model.User;
import com.skillswap.repository.UserRepository;
import com.skillswap.security.JwtTokenProvider;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void register(RegisterRequest req) {
        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail());
        // NOTE: store plain password for brevity; replace with encoder in production
        u.setPassword(req.getPassword());
        userRepository.save(u);
    }

    public LoginResponse login(LoginRequest req) {
        Optional<User> opt = userRepository.findByEmail(req.getEmail());
        if (opt.isPresent() && opt.get().getPassword().equals(req.getPassword())) {
            String token = JwtTokenProvider.createToken(opt.get());
            return new LoginResponse(token, opt.get().getId());
        }
        throw new RuntimeException("Invalid credentials");
    }
}
