package com.skillswap.model;

import jakarta.persistence.*;

@Entity
public class SkillRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User requester;

    @ManyToOne
    private Skill skill;

    private String details;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getRequester() { return requester; }
    public void setRequester(User requester) { this.requester = requester; }
    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}
