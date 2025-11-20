package com.skillswap.repository;

import com.skillswap.model.SkillMatch;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillMatchRepository extends JpaRepository<SkillMatch, Long> {
    List<SkillMatch> findByOfferingUserIdOrRequestingUserId(Long offeringUserId, Long requestingUserId);
}
