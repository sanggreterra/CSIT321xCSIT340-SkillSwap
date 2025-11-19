package com.skillswap.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class SkillMatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private SkillOffering offering;

    @ManyToOne
    private SkillRequest request;

    private Long offeringUserId;
    private Long requestingUserId;

    private String status; // PENDING, ACCEPTED, DECLINED

    private Float compatibilityScore;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public SkillOffering getOffering() { return offering; }
    public void setOffering(SkillOffering offering) { this.offering = offering; }

    public SkillRequest getRequest() { return request; }
    public void setRequest(SkillRequest request) { this.request = request; }

    public Long getOfferingUserId() { return offeringUserId; }
    public void setOfferingUserId(Long offeringUserId) { this.offeringUserId = offeringUserId; }

    public Long getRequestingUserId() { return requestingUserId; }
    public void setRequestingUserId(Long requestingUserId) { this.requestingUserId = requestingUserId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Float getCompatibilityScore() { return compatibilityScore; }
    public void setCompatibilityScore(Float compatibilityScore) { this.compatibilityScore = compatibilityScore; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
