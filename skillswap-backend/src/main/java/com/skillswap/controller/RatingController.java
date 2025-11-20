package com.skillswap.controller;

import com.skillswap.dto.request.RatingCreateRequest;
import com.skillswap.dto.response.RatingResponse;
import com.skillswap.model.RatingReview;
import com.skillswap.service.RatingReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    private final RatingReviewService ratingService;

    public RatingController(RatingReviewService ratingService) {
        this.ratingService = ratingService;
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getPrincipal() == null) return null;
        Object p = auth.getPrincipal();
        if (p instanceof Long) return (Long) p;
        try { return Long.valueOf(p.toString()); } catch (Exception e) { return null; }
    }

    @PostMapping
    public ResponseEntity<RatingResponse> create(@RequestBody RatingCreateRequest req) {
        Long userId = getCurrentUserId();
        if (userId == null) return ResponseEntity.status(401).build();
        RatingReview r = ratingService.createRating(userId, req);
        RatingResponse resp = toDto(r);
        return ResponseEntity.status(201).body(resp);
    }

    @GetMapping
    public ResponseEntity<List<RatingResponse>> list(@RequestParam("userId") Long userId) {
        List<RatingReview> list = ratingService.getRatingsForUser(userId);
        List<RatingResponse> out = list.stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(out);
    }

    private RatingResponse toDto(RatingReview r) {
        RatingResponse resp = new RatingResponse();
        resp.setId(r.getId());
        resp.setExchangeId(r.getExchange() != null ? r.getExchange().getId() : null);
        resp.setReviewerId(r.getReviewerId());
        resp.setRevieweeId(r.getRevieweeId());
        resp.setRating(r.getRating());
        resp.setReviewText(r.getReviewText());
        resp.setCreatedAt(r.getCreatedAt());
        return resp;
    }
}
