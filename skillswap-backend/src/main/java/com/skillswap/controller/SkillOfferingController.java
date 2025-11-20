package com.skillswap.controller;

import com.skillswap.dto.request.SkillOfferingRequest;
import com.skillswap.model.SkillOffering;
import com.skillswap.service.SkillOfferingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/offerings")
public class SkillOfferingController {

    private final SkillOfferingService service;

    public SkillOfferingController(SkillOfferingService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<SkillOffering> createOffering(@RequestBody SkillOfferingRequest req) {
        SkillOffering created = service.createOffering(req);
        return ResponseEntity.status(201).body(created);
    }
}
