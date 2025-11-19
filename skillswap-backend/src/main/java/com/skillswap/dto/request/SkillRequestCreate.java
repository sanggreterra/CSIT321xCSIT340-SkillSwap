package com.skillswap.dto.request;

import java.util.List;

public class SkillRequestCreate {
    private Long requesterId;
    private Long skillId;
    private String details;
    private List<String> preferredTimes;

    public Long getRequesterId() { return requesterId; }
    public void setRequesterId(Long requesterId) { this.requesterId = requesterId; }
    public Long getSkillId() { return skillId; }
    public void setSkillId(Long skillId) { this.skillId = skillId; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public List<String> getPreferredTimes() { return preferredTimes; }
    public void setPreferredTimes(List<String> preferredTimes) { this.preferredTimes = preferredTimes; }
}
