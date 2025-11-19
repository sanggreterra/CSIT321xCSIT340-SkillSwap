package com.skillswap.service;

import com.skillswap.dto.request.CalendarEventCreateRequest;
import com.skillswap.model.CalendarEvent;
import com.skillswap.model.SkillExchange;
import com.skillswap.repository.CalendarEventRepository;
import com.skillswap.repository.SkillExchangeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarEventService {

    private final CalendarEventRepository eventRepository;
    private final SkillExchangeRepository exchangeRepository;

    public CalendarEventService(CalendarEventRepository eventRepository, SkillExchangeRepository exchangeRepository) {
        this.eventRepository = eventRepository;
        this.exchangeRepository = exchangeRepository;
    }

    public CalendarEvent createEvent(CalendarEventCreateRequest req) {
        CalendarEvent e = new CalendarEvent();
        e.setUserId(req.getUserId());
        e.setEventTitle(req.getEventTitle());
        e.setStartTime(req.getStartTime());
        e.setEndTime(req.getEndTime());
        e.setEventType(req.getEventType());
        if (req.getExchangeId() != null) {
            SkillExchange ex = exchangeRepository.findById(req.getExchangeId()).orElse(null);
            e.setExchange(ex);
        }
        return eventRepository.save(e);
    }

    public List<CalendarEvent> getEventsForUser(Long userId) {
        return eventRepository.findByUserId(userId);
    }
}
