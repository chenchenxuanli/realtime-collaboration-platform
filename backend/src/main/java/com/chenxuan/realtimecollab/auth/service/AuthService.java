package com.chenxuan.realtimecollab.auth.service;

import com.chenxuan.realtimecollab.auth.dto.RegisterRequest;
import com.chenxuan.realtimecollab.auth.dto.UserResponse;
import com.chenxuan.realtimecollab.persistence.entity.User;
import com.chenxuan.realtimecollab.persistence.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Handles user registration and (later) login. Passwords are hashed with BCrypt.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already registered");
        }
        String passwordHash = passwordEncoder.encode(request.password());
        User user = new User(
            request.email(),
            passwordHash,
            request.displayName()
        );
        user = userRepository.save(user);
        return toResponse(user);
    }

    private static UserResponse toResponse(User user) {
        return new UserResponse(
            user.getId(),
            user.getEmail(),
            user.getDisplayName(),
            user.getCreatedAt()
        );
    }
}
