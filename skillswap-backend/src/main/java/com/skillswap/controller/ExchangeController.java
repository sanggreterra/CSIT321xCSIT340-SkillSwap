package com.skillswap.controller;

import com.skillswap.dto.request.ExchangeCreateRequest;
import com.skillswap.dto.response.ExchangeResponse;
import com.skillswap.model.SkillExchange;
import com.skillswap.service.SkillExchangeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/exchanges")
public class ExchangeController {

    private final SkillExchangeService exchangeService;

    public ExchangeController(SkillExchangeService exchangeService) {
        this.exchangeService = exchangeService;
    }

    @PostMapping
    public ResponseEntity<ExchangeResponse> create(@RequestBody ExchangeCreateRequest req) {
        SkillExchange e = exchangeService.createExchange(req);
        return ResponseEntity.status(201).body(toDto(e));
    }

    @GetMapping
    public ResponseEntity<List<ExchangeResponse>> list(@RequestParam("userId") Long userId) {
        List<SkillExchange> list = exchangeService.findExchangesForUser(userId);
        List<ExchangeResponse> out = list.stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(out);
    }

    private ExchangeResponse toDto(SkillExchange e) {
        ExchangeResponse r = new ExchangeResponse();
        r.setId(e.getId());
        r.setMatchId(e.getMatch() != null ? e.getMatch().getId() : null);
        r.setOfferingUserId(e.getOfferingUserId());
        r.setRequestingUserId(e.getRequestingUserId());
        r.setScheduledDate(e.getScheduledDate());
        r.setSessionType(e.getSessionType());
        r.setNotes(e.getNotes());
        r.setStatus(e.getStatus());
        r.setCreatedAt(e.getCreatedAt());
        return r;
    }
}
