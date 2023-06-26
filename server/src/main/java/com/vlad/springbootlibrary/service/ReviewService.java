package com.vlad.springbootlibrary.service;

import com.vlad.springbootlibrary.dao.ReviewRepository;
import com.vlad.springbootlibrary.entity.Review;
import com.vlad.springbootlibrary.requestmodels.ReviewRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Objects;

@Service
@Transactional
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public void postReview(String userEmail, ReviewRequest request) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, request.getBookId());
        if (validateReview != null) {
            throw new Exception("Review already created");
        }

        Review review = new Review();
        review.setBookId(request.getBookId());
        review.setRating(request.getRating());
        review.setUserEmail(userEmail);

        if (request.getReviewDescription().isPresent()) {
            review.setReviewDescription(request.getReviewDescription().map(Objects::toString).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }

    public boolean userReviewListed(String userEmail, Long bookId) {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
        return validateReview != null;
    }
}
