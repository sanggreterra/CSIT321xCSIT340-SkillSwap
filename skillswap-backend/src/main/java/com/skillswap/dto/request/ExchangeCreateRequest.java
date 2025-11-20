package com.skillswap.dto.request;

import java.time.LocalDateTime;

public class ExchangeCreateRequest {
    private Long matchId;
    private LocalDateTime scheduledDate;
    private String sessionType;
    private String notes;

    public Long getMatchId() { return matchId; }
    public void setMatchId(Long matchId) { this.matchId = matchId; }
    public LocalDateTime getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDateTime scheduledDate) { this.scheduledDate = scheduledDate; }
    public String getSessionType() { return sessionType; }
    public void setSessionType(String sessionType) { this.sessionType = sessionType; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
