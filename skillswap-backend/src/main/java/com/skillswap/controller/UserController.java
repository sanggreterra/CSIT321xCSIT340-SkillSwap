package com.skillswap.controller;

import com.skillswap.dto.response.UserResponse;
import com.skillswap.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getProfile(@PathVariable Long id) {
        UserResponse resp = userService.getProfile(id);
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateProfile(@PathVariable Long id, @RequestBody UserResponse update) {
        UserResponse resp = userService.updateProfile(id, update);
        return ResponseEntity.ok(resp);
    }
}
