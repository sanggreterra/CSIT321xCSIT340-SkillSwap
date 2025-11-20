package com.skillswap.repository;

import com.skillswap.model.SkillExchange;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillExchangeRepository extends JpaRepository<SkillExchange, Long> {
    List<SkillExchange> findByOfferingUserIdOrRequestingUserId(Long offeringUserId, Long requestingUserId);
}
