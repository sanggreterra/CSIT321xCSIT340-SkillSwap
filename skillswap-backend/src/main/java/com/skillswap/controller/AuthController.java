package com.skillswap.controller;

import com.skillswap.dto.request.LoginRequest;
import com.skillswap.dto.request.RegisterRequest;
import com.skillswap.dto.response.LoginResponse;
import com.skillswap.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse resp = authService.login(request);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // For stateless JWT, logout can be client-side; stub for now
        return ResponseEntity.ok().build();
    }
}
