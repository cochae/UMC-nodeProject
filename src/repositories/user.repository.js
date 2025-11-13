import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data, prismaTx) => {
  const db = prismaTx ?? prisma; // 트랜잭션이 있으면 사용, 없으면 기본 prisma

  const user = await db.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await db.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId, prismaTx) => {
  const db = prismaTx ?? prisma;

  const user = await db.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId, prismaTx) => {
  const db = prismaTx ?? prisma;

  await db.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId, prismaTx) => {
  const db = prismaTx ?? prisma;

  const preferences = await db.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

// 내 리뷰 조회
export const getAllMyReviews = async (userId, cursor, prismaTx) => {
  const db = prismaTx ?? prisma;

  const reviews = await db.review.findMany({
    select: {
      id: true,
      body: true,
      storeId: true,
      userId: true
    },
    where: { userId: userId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};
