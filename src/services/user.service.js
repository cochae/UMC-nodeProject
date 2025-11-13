import { responseFromUser } from "../dtos/user.dto.js";
import { responseFromReviews } from "../dtos/review.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import { prisma } from "../db.config.js";

import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getAllMyReviews
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  return await prisma.$transaction(async (prismaTx) => {
    const existingUser = await prismaTx.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
    }

    const joinUserId = await addUser(
      {
        email: data.email,
        name: data.name,
        gender: data.gender,
        birth: data.birth,
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
      },
      prismaTx // 트랜잭션 전달
    );

    for (const preference of data.preferences) {
      await setPreference(joinUserId, preference, prismaTx);
    }

    const user = await getUser(joinUserId, prismaTx);
    const preferences = await getUserPreferencesByUserId(joinUserId, prismaTx);

    return responseFromUser({ user, preferences });
  });
};


export const listMyReviews = async (userId, cursor) => {
  const reviews = await getAllMyReviews(userId, cursor);
  return responseFromReviews(reviews);
};