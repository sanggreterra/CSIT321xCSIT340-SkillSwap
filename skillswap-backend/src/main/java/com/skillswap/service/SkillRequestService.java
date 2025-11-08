package com.skillswap.service;

import com.skillswap.model.Skill;
import com.skillswap.model.SkillRequest;
import com.skillswap.model.User;
import com.skillswap.repository.SkillRequestRepository;
import com.skillswap.repository.SkillRepository;
import com.skillswap.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SkillRequestService {

    private final SkillRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public SkillRequestService(SkillRequestRepository requestRepository, UserRepository userRepository, SkillRepository skillRepository) {
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    public SkillRequest createRequest(SkillRequest req) {
        // for simplicity, assume incoming req has requester.id and skill.id set
        Optional<User> u = userRepository.findById(req.getRequester().getId());
        Optional<Skill> s = skillRepository.findById(req.getSkill().getId());
        if (u.isEmpty() || s.isEmpty()) throw new RuntimeException("User or Skill not found");
        SkillRequest r = new SkillRequest();
        r.setRequester(u.get());
        r.setSkill(s.get());
        r.setDetails(req.getDetails());
        return requestRepository.save(r);
    }
}
