package com.skillswap.security;

import com.skillswap.model.User;

import java.util.Base64;
import java.util.UUID;

/**
 * Minimal token provider for demo purposes. Returns a simple base64 string.
 * Replace with real JWT implementation in production.
 */
public class JwtTokenProvider {
    public static String createToken(User user) {
        String raw = user.getId() + ":" + UUID.randomUUID();
        return Base64.getEncoder().encodeToString(raw.getBytes());
    }
}
