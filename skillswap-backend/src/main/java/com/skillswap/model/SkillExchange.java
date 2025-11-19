package com.skillswap.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class SkillExchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private SkillMatch match;

    private Long offeringUserId;
    private Long requestingUserId;

    private LocalDateTime scheduledDate;
    private String sessionType;
    private String notes;
    private String status; // SCHEDULED, COMPLETED, CANCELLED

    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public SkillMatch getMatch() { return match; }
    public void setMatch(SkillMatch match) { this.match = match; }

    public Long getOfferingUserId() { return offeringUserId; }
    public void setOfferingUserId(Long offeringUserId) { this.offeringUserId = offeringUserId; }

    public Long getRequestingUserId() { return requestingUserId; }
    public void setRequestingUserId(Long requestingUserId) { this.requestingUserId = requestingUserId; }

    public LocalDateTime getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDateTime scheduledDate) { this.scheduledDate = scheduledDate; }

    public String getSessionType() { return sessionType; }
    public void setSessionType(String sessionType) { this.sessionType = sessionType; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
