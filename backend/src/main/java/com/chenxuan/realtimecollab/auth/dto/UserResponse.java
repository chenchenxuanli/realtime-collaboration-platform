package com.chenxuan.realtimecollab.auth.dto;

import java.time.Instant;
import java.util.UUID;

/**
 * Public user data returned by auth endpoints. Does not expose passwordHash.
 */
public record UserResponse(
    UUID id,
    String email,
    String displayName,
    Instant createdAt
) {}
