import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp, listMyReviews } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));

  //ver1.
  //res.status(StatusCodes.OK).json({ result: user });

  //ver2.
  //   res.status(StatusCodes.OK).json({
  //   resultType: "SUCCESS",
  //   error: null,
  //   success: user,
  // });

    res.status(StatusCodes.OK).success(user);

};


export const handleListMyReviews = async (req, res, next) => {
  const reviews = await listMyReviews(
  parseInt(req.params.userId),
  typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0  );
  res.status(StatusCodes.OK).success(reviews);
};
