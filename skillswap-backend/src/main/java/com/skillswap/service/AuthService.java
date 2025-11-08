package com.skillswap.service;

import com.skillswap.dto.request.LoginRequest;
import com.skillswap.dto.request.RegisterRequest;
import com.skillswap.dto.response.LoginResponse;
import com.skillswap.model.User;
import com.skillswap.repository.UserRepository;
import com.skillswap.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public void register(RegisterRequest req) {
        // check for existing email to provide a clear error instead of a DB constraint violation
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new com.skillswap.exception.EmailAlreadyExistsException(req.getEmail());
        }

        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail());
        // store hashed password
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        userRepository.save(u);
    }

    public LoginResponse login(LoginRequest req) {
        Optional<User> opt = userRepository.findByEmail(req.getEmail());
        if (opt.isPresent() && passwordEncoder.matches(req.getPassword(), opt.get().getPassword())) {
            String token = jwtTokenProvider.createToken(opt.get());
            return new LoginResponse(token, opt.get().getId());
        }
        throw new RuntimeException("Invalid credentials");
    }
}
