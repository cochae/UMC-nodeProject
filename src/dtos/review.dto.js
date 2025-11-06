export const bodyToReview = (body) => {

  return {
    store_id: body.store_id, 
    body: body.body,
    score: body.score, 
  };
};
//리뷰 추가 후 반환 데이터
export function responseFromReview(review) {
  return {
    id: review.id,
    body: review.body,
    score: review.score
  };
}
//리뷰 목록 조회
export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};
