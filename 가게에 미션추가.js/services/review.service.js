import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { ReviewDTO } from '../dtos/reviewDTO.js';
import { checkStoreExistence, addReview as addReviewDAO, getReviewById as getReviewByIdDAO } from '../daos/reviewDAO.js';

// 가게 존재 여부 확인 서비스
const verifyStoreExistence = async (storeId) => {
  const storeExists = await checkStoreExistence(storeId);
  if (!storeExists) {
    throw new BaseError(status.NOT_FOUND, `Store with id ${storeId} not found.`);
  }
};

// 리뷰 작성 서비스
export const addReview = async (storeId, rating, comment, photos) => {
  try {
    await verifyStoreExistence(storeId);

    const reviewDTO = ReviewDTO(storeId, rating, comment, photos);

    const reviewId = await addReviewDAO(reviewDTO);

    return reviewId;
  } catch (error) {
    throw new BaseError(status.INTERNAL_SERVER_ERROR, `Failed to add review: ${error.message}`);
  }
};

// 리뷰 조회 서비스
export const getReviewById = async (reviewId) => {
  try {
    const review = await getReviewByIdDAO(reviewId);

    if (!review) {
      throw new BaseError(status.NOT_FOUND, `Review with id ${reviewId} not found.`);
    }

    return review;
  } catch (error) {
    throw new BaseError(status.INTERNAL_SERVER_ERROR, `Failed to get review: ${error.message}`);
  }
};