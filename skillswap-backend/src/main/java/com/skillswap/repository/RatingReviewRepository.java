package com.skillswap.repository;

import com.skillswap.model.RatingReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingReviewRepository extends JpaRepository<RatingReview, Long> {
    List<RatingReview> findByRevieweeId(Long revieweeId);
    List<RatingReview> findByExchangeId(Long exchangeId);
}
