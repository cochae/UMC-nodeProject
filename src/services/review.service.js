import { responseFromReview, responseFromReviews } from "../dtos/review.dto.js";
import {
  addReview,
  getReview,
  getAllStoreReviews
} from "../repositories/review.repository.js";
import { NoExistsStoreError, ScoreNotProvidedError, ScoreOutOfRangeError } from "../errors.js";


export const reviewCreate = async (data) => {

  if (data.score == null) {
    throw new ScoreNotProvidedError("점수가 입력되지 않았습니다", data);
  }

  if (data.score < 0 || data.score > 5) {
    throw new ScoreOutOfRangeError("점수는 0에서 5 사이여야 합니다.", data);
  }

  const createdReviewId = await addReview(data);

  if (createdReviewId === null) {
    throw new NoExistsStoreError("해당 가게가 존재하지 않습니다.", data);
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