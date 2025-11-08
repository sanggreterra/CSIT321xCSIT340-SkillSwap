package com.skillswap.dto.request;

public class SkillRequestCreate {
    private Long requesterId;
    private Long skillId;
    private String details;

    public Long getRequesterId() { return requesterId; }
    public void setRequesterId(Long requesterId) { this.requesterId = requesterId; }
    public Long getSkillId() { return skillId; }
    public void setSkillId(Long skillId) { this.skillId = skillId; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}
