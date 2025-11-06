import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewCreate, listStoreReviews } from "../services/review.service.js";


export const handleReviewCreate = async (req, res, next) => {
    const store_id = req.params.storeId;
    console.log("리뷰를 추가했습니다!");
    console.log("body:", req.body);
    const entireReviewData = {
        ...req.body,
        store_id,  // pathvariable
    };

    const review = await reviewCreate(bodyToReview(entireReviewData));
    res.status(StatusCodes.OK).json({ result: review });
}
export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(200).json({
    result: reviews
  });
};