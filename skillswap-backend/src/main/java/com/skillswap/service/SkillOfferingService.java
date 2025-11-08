package com.skillswap.service;

import com.skillswap.dto.request.SkillOfferingRequest;
import com.skillswap.model.Skill;
import com.skillswap.model.SkillOffering;
import com.skillswap.model.User;
import com.skillswap.repository.SkillOfferingRepository;
import com.skillswap.repository.SkillRepository;
import com.skillswap.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SkillOfferingService {

    private final SkillOfferingRepository offeringRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public SkillOfferingService(SkillOfferingRepository offeringRepository, UserRepository userRepository, SkillRepository skillRepository) {
        this.offeringRepository = offeringRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    public SkillOffering createOffering(SkillOfferingRequest req) {
        Optional<User> u = userRepository.findById(req.getUserId());
        Optional<Skill> s = skillRepository.findById(req.getSkillId());
        if (u.isEmpty() || s.isEmpty()) throw new RuntimeException("User or Skill not found");
        SkillOffering so = new SkillOffering();
        so.setUser(u.get());
        so.setSkill(s.get());
        so.setDescription(req.getDescription());
        return offeringRepository.save(so);
    }
}
