package com.skillswap.service;

import com.skillswap.dto.request.MatchCreateRequest;
import com.skillswap.model.SkillMatch;
import com.skillswap.model.SkillOffering;
import com.skillswap.model.SkillRequest;
import com.skillswap.repository.SkillMatchRepository;
import com.skillswap.repository.SkillOfferingRepository;
import com.skillswap.repository.SkillRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillMatchService {

    private final SkillMatchRepository matchRepository;
    private final SkillOfferingRepository offeringRepository;
    private final SkillRequestRepository requestRepository;

    public SkillMatchService(SkillMatchRepository matchRepository, SkillOfferingRepository offeringRepository, SkillRequestRepository requestRepository) {
        this.matchRepository = matchRepository;
        this.offeringRepository = offeringRepository;
        this.requestRepository = requestRepository;
    }

    public SkillMatch createMatch(MatchCreateRequest req) {
        Optional<SkillOffering> offering = offeringRepository.findById(req.getOfferingId());
        Optional<SkillRequest> request = requestRepository.findById(req.getRequestId());
        if (offering.isEmpty() || request.isEmpty()) throw new RuntimeException("Offering or Request not found");
        SkillMatch m = new SkillMatch();
        m.setOffering(offering.get());
        m.setRequest(request.get());
        m.setOfferingUserId(offering.get().getUser().getId());
        m.setRequestingUserId(request.get().getRequester().getId());
        m.setStatus("PENDING");
        m.setCompatibilityScore(0.0f);
        return matchRepository.save(m);
    }

    public List<SkillMatch> findMatchesForUser(Long userId) {
        return matchRepository.findByOfferingUserIdOrRequestingUserId(userId, userId);
    }

    public SkillMatch acceptMatch(Long matchId) {
        SkillMatch m = matchRepository.findById(matchId).orElseThrow(() -> new RuntimeException("Match not found"));
        m.setStatus("ACCEPTED");
        return matchRepository.save(m);
    }
}
