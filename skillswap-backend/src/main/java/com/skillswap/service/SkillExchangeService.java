package com.skillswap.service;

import com.skillswap.dto.request.ExchangeCreateRequest;
import com.skillswap.model.SkillExchange;
import com.skillswap.model.SkillMatch;
import com.skillswap.repository.SkillExchangeRepository;
import com.skillswap.repository.SkillMatchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillExchangeService {

    private final SkillExchangeRepository exchangeRepository;
    private final SkillMatchRepository matchRepository;

    public SkillExchangeService(SkillExchangeRepository exchangeRepository, SkillMatchRepository matchRepository) {
        this.exchangeRepository = exchangeRepository;
        this.matchRepository = matchRepository;
    }

    public SkillExchange createExchange(ExchangeCreateRequest req) {
        SkillMatch m = matchRepository.findById(req.getMatchId()).orElseThrow(() -> new RuntimeException("Match not found"));
        SkillExchange e = new SkillExchange();
        e.setMatch(m);
        e.setOfferingUserId(m.getOfferingUserId());
        e.setRequestingUserId(m.getRequestingUserId());
        e.setScheduledDate(req.getScheduledDate());
        e.setSessionType(req.getSessionType());
        e.setNotes(req.getNotes());
        e.setStatus("SCHEDULED");
        return exchangeRepository.save(e);
    }

    public List<SkillExchange> findExchangesForUser(Long userId) {
        return exchangeRepository.findByOfferingUserIdOrRequestingUserId(userId, userId);
    }
}
