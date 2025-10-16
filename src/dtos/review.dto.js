export const bodyToReview = (body) => {

  return {
    store_id: body.store_id, 
    body: body.body,
    score: body.score, 
  };
};

export function responseFromReview(review) {
  return {
    id: review.id,
    body: review.body,
    score: review.score
  };
}
