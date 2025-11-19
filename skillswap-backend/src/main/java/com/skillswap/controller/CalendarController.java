package com.skillswap.controller;

import com.skillswap.dto.request.CalendarEventCreateRequest;
import com.skillswap.dto.response.CalendarEventResponse;
import com.skillswap.model.CalendarEvent;
import com.skillswap.service.CalendarEventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/calendar")
public class CalendarController {

    private final CalendarEventService eventService;

    public CalendarController(CalendarEventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseEntity<CalendarEventResponse> create(@RequestBody CalendarEventCreateRequest req) {
        CalendarEvent e = eventService.createEvent(req);
        return ResponseEntity.status(201).body(toDto(e));
    }

    @GetMapping
    public ResponseEntity<List<CalendarEventResponse>> list(@RequestParam("userId") Long userId) {
        List<CalendarEvent> list = eventService.getEventsForUser(userId);
        List<CalendarEventResponse> out = list.stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(out);
    }

    private CalendarEventResponse toDto(CalendarEvent e) {
        CalendarEventResponse r = new CalendarEventResponse();
        r.setId(e.getId());
        r.setUserId(e.getUserId());
        r.setExchangeId(e.getExchange() != null ? e.getExchange().getId() : null);
        r.setEventTitle(e.getEventTitle());
        r.setStartTime(e.getStartTime());
        r.setEndTime(e.getEndTime());
        r.setEventType(e.getEventType());
        r.setReminderSent(e.isReminderSent());
        r.setCreatedAt(e.getCreatedAt());
        return r;
    }
}
