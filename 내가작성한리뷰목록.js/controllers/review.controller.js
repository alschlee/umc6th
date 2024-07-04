import { response } from "../config/response.js";
import { status } from "../config/response.status.js";

import { createReview } from '../services/review.service.js';

export const addReview = async (req, res, next) => {
    console.log("리뷰 작성을 요청하였습니다!");
    console.log("body:", req.body);

    res.send(response(status.SUCCESS, await joinUser(req.body)));
}

export const getMyReviewsController = async (req, res, next) => {
  try {
    const userId = 1;
    const page = req.query.page || 1; // 페이지 번호, 기본값 1

    const reviews = await getMyReviewsService(userId, page);

    const reviewDTOs = reviews.map(review => new ReviewDTO(
      review.storeId,
      review.storeName,
      review.rating,
      review.comment,
      review.photos,
      review.reviewPage,
      review.reviewButton
    ));

    const nextPage = parseInt(page) + 1;
    res.setHeader('X-Next-Page', nextPage);

    res.status(status.OK).json({
      reviews: reviewDTOs,
      totalPages: 5,
    });
  } catch (error) {
    next(new BaseError(status.INTERNAL_SERVER_ERROR, error.message));
  }
};
