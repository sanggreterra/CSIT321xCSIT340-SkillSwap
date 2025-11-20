package com.skillswap.controller;

import com.skillswap.dto.request.MatchCreateRequest;
import com.skillswap.dto.response.MatchResponse;
import com.skillswap.model.SkillMatch;
import com.skillswap.service.SkillMatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/matches")
public class MatchController {

    private final SkillMatchService matchService;

    public MatchController(SkillMatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping
    public ResponseEntity<MatchResponse> create(@RequestBody MatchCreateRequest req) {
        SkillMatch m = matchService.createMatch(req);
        MatchResponse resp = toDto(m);
        return ResponseEntity.status(201).body(resp);
    }

    @GetMapping
    public ResponseEntity<List<MatchResponse>> list(@RequestParam("userId") Long userId) {
        List<SkillMatch> matches = matchService.findMatchesForUser(userId);
        List<MatchResponse> out = matches.stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(out);
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<MatchResponse> accept(@PathVariable Long id) {
        SkillMatch m = matchService.acceptMatch(id);
        return ResponseEntity.ok(toDto(m));
    }

    private MatchResponse toDto(SkillMatch m) {
        MatchResponse r = new MatchResponse();
        r.setId(m.getId());
        r.setOfferingId(m.getOffering() != null ? m.getOffering().getId() : null);
        r.setRequestId(m.getRequest() != null ? m.getRequest().getId() : null);
        r.setOfferingUserId(m.getOfferingUserId());
        r.setRequestingUserId(m.getRequestingUserId());
        r.setStatus(m.getStatus());
        r.setCompatibilityScore(m.getCompatibilityScore());
        r.setCreatedAt(m.getCreatedAt());
        return r;
    }
}
