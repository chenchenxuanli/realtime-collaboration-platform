package com.chenxuan.realtimecollab.common;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Unified API response wrapper. Use for consistent JSON structure across endpoints.
 * Phase 1: definition only; minimal usage until Phase 2+.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
    boolean success,
    T data,
    String error,
    String message
) {
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, data, null, null);
    }

    public static <T> ApiResponse<T> ok(T data, String message) {
        return new ApiResponse<>(true, data, null, message);
    }

    public static <T> ApiResponse<T> fail(String error) {
        return new ApiResponse<>(false, null, error, null);
    }

    public static <T> ApiResponse<T> fail(String error, String message) {
        return new ApiResponse<>(false, null, error, message);
    }
}
