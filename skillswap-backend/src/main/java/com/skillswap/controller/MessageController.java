package com.skillswap.controller;

import com.skillswap.dto.request.MessageCreateRequest;
import com.skillswap.dto.response.MessageResponse;
import com.skillswap.model.Message;
import com.skillswap.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getPrincipal() == null) return null;
        Object p = auth.getPrincipal();
        if (p instanceof Long) return (Long) p;
        if (p instanceof Integer) return ((Integer) p).longValue();
        try { return Long.valueOf(p.toString()); } catch (Exception e) { return null; }
    }

    @PostMapping
    public ResponseEntity<MessageResponse> send(@RequestBody MessageCreateRequest req) {
        Long userId = getCurrentUserId();
        if (userId == null) return ResponseEntity.status(401).build();
        Message m = messageService.sendMessage(userId, req);
        return ResponseEntity.status(201).body(toDto(m));
    }

    @GetMapping
    public ResponseEntity<List<MessageResponse>> listByExchange(@RequestParam(required = false) Long exchangeId, @RequestParam(required = false) Long userId) {
        if (exchangeId != null) {
            List<Message> msgs = messageService.getMessagesByExchange(exchangeId);
            return ResponseEntity.ok(msgs.stream().map(this::toDto).collect(Collectors.toList()));
        }
        if (userId != null) {
            List<Message> msgs = messageService.getMessagesForUser(userId);
            return ResponseEntity.ok(msgs.stream().map(this::toDto).collect(Collectors.toList()));
        }
        return ResponseEntity.badRequest().build();
    }

    private MessageResponse toDto(Message m) {
        MessageResponse r = new MessageResponse();
        r.setId(m.getId());
        r.setSenderId(m.getSenderId());
        r.setReceiverId(m.getReceiverId());
        r.setExchangeId(m.getExchange() != null ? m.getExchange().getId() : null);
        r.setContent(m.getContent());
        r.setRead(m.isRead());
        r.setSentAt(m.getSentAt());
        return r;
    }
}
