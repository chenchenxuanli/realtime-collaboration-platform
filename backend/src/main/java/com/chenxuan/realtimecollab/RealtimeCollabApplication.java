package com.chenxuan.realtimecollab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the realtime collaboration platform backend.
 * Modular monolith: packages auth, room, chat, todo, event, realtime, persistence, common, health.
 */
@SpringBootApplication
public class RealtimeCollabApplication {

    public static void main(String[] args) {
        SpringApplication.run(RealtimeCollabApplication.class, args);
    }
}
