package com.skillswap.service;

import com.skillswap.dto.request.RatingCreateRequest;
import com.skillswap.model.RatingReview;
import com.skillswap.model.SkillExchange;
import com.skillswap.repository.RatingReviewRepository;
import com.skillswap.repository.SkillExchangeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingReviewService {

    private final RatingReviewRepository ratingRepository;
    private final SkillExchangeRepository exchangeRepository;

    public RatingReviewService(RatingReviewRepository ratingRepository, SkillExchangeRepository exchangeRepository) {
        this.ratingRepository = ratingRepository;
        this.exchangeRepository = exchangeRepository;
    }

    public RatingReview createRating(Long reviewerId, RatingCreateRequest req) {
        RatingReview r = new RatingReview();
        r.setReviewerId(reviewerId);
        r.setRevieweeId(req.getRevieweeId());
        r.setRating(req.getRating());
        r.setReviewText(req.getReviewText());
        if (req.getExchangeId() != null) {
            SkillExchange e = exchangeRepository.findById(req.getExchangeId()).orElse(null);
            r.setExchange(e);
        }
        return ratingRepository.save(r);
    }

    public List<RatingReview> getRatingsForUser(Long userId) {
        return ratingRepository.findByRevieweeId(userId);
    }
}
