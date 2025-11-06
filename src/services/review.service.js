import { responseFromReview, responseFromReviews } from "../dtos/review.dto.js";
import {
  addReview,
  getReview,
  getAllStoreReviews
} from "../repositories/review.repository.js";

export const reviewCreate = async (data) => {
  const createdReviewId = await addReview(data);

  if (createdReviewId === null) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  const review = await getReview(createdReviewId);
  console.log("review from getReview:", review);

  return responseFromReview(review);
};
//review.service.js line:20
export const listStoreReviews = async (storeId, cursor) => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};