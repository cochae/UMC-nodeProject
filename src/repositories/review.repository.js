import { prisma } from "../db.config.js";

export const addReview = async (data) => {
  try {
    // 1. 타입 변환 (store_id 사용!)
    const storeId = parseInt(data.store_id);

    // 2. 가게 존재 여부 검증
    const existingStore = await prisma.store.findUnique({
      where: { id: storeId }
    });

    if (!existingStore) {
      return null;
    }

    // 3. review 생성
    const newReview = await prisma.review.create({
      data: {
        userId: 19,
        storeId: storeId,
        body: data.body,
        score: data.score,
      }
    });

    // 4. 평균 점수 계산
    const average = await prisma.review.aggregate({
      _avg: {
        score: true
      },
      where: {
        storeId: storeId
      }
    });

    const newAvgScore = average._avg.score;

    // 5. store 테이블에 평균 평점 업데이트
    await prisma.store.update({
      where: {
        id: storeId
      },
      data: {
        score: newAvgScore
      }
    });

    console.log("store 평균 평점이 " + newAvgScore + "점으로 업데이트 되었습니다.");

    return newReview.id;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const getReview = async (reviewId) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId }
    });

    if (!review) {
      return null;
    }
    
    return review;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: { id: true, body: true, storeId: true, userId: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};