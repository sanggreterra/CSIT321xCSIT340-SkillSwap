package com.skillswap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
//import com.skillswap.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, com.skillswap.security.JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        // Disable CSRF for API usage, permit auth and public skill endpoints, require auth otherwise.
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // allow CORS preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // auth endpoints (context-path may be present or not) — permit both forms
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/auth/**").permitAll()
                // public skills browsing
                .requestMatchers("/api/skills/**").permitAll()
                .requestMatchers("/skills/**").permitAll()
                .requestMatchers("/api/skills").permitAll()
                .requestMatchers("/skills").permitAll()
                .anyRequest().authenticated()
            );

        // Add JWT filter before username/password filter (bean injected)
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
