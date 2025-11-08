package com.skillswap.dto.request;

public class SkillOfferingRequest {
    private Long userId;
    private Long skillId;
    private String description;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getSkillId() { return skillId; }
    public void setSkillId(Long skillId) { this.skillId = skillId; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
