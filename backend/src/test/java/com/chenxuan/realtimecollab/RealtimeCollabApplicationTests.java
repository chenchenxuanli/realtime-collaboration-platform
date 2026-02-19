package com.chenxuan.realtimecollab;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Smoke test: application context loads. Uses in-memory or test profile if needed in Phase 2+.
 */
@SpringBootTest
@ActiveProfiles("test")
class RealtimeCollabApplicationTests {

    @Test
    void contextLoads() {
    }
}
