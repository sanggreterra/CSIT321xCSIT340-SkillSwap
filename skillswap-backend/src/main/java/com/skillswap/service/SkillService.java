package com.skillswap.service;

import com.skillswap.model.Skill;
import com.skillswap.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public List<Skill> searchSkills(String q) {
        return skillRepository.findByNameContainingIgnoreCase(q);
    }
}
