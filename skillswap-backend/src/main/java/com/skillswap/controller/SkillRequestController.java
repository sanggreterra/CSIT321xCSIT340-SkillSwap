package com.skillswap.controller;

import com.skillswap.dto.request.SkillRequestCreate;
import com.skillswap.model.SkillRequest;
import com.skillswap.service.SkillRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/requests")
public class SkillRequestController {

    private final SkillRequestService service;

    public SkillRequestController(SkillRequestService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<SkillRequest> createRequest(@RequestBody SkillRequestCreate req) {
        // map DTO to entity minimal
        SkillRequest r = new SkillRequest();
        r.setDetails(req.getDetails());
        // set nested ids for service to resolve
        com.skillswap.model.User u = new com.skillswap.model.User();
        u.setId(req.getRequesterId());
        r.setRequester(u);
        com.skillswap.model.Skill s = new com.skillswap.model.Skill();
        s.setId(req.getSkillId());
        r.setSkill(s);
        // preferredTimes are optional; stored in details or a dedicated field later
        SkillRequest created = service.createRequest(r);
        return ResponseEntity.status(201).body(created);
    }
}
