package com.chenxuan.realtimecollab.common;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Global exception handling skeleton. Converts exceptions to unified API responses.
 * Phase 1: minimal implementation; extend in Phase 2+ (e.g. validation, auth, not-found).
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneric(Exception ex) {
        return ResponseEntity
            .status(500)
            .body(ApiResponse.fail("INTERNAL_ERROR", ex.getMessage()));
    }
}
