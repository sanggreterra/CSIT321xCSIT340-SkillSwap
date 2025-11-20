package com.skillswap.dto.response;

import java.time.LocalDateTime;

public class MatchResponse {
    private Long id;
    private Long offeringId;
    private Long requestId;
    private Long offeringUserId;
    private Long requestingUserId;
    private String status;
    private Float compatibilityScore;
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getOfferingId() { return offeringId; }
    public void setOfferingId(Long offeringId) { this.offeringId = offeringId; }
    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }
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
