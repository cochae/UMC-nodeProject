import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { handleUserSignUp, handleListMyReviews } from "./controllers/user.controller.js";
import { handleStoreCreate } from "./controllers/store.controller.js";
import { handleReviewCreate, handleListStoreReviews } from "./controllers/review.controller.js";
import { handleListStoreMissions, handleMissionCreate, handleChallengeCreate, handleListMyChallenges, handleChallengeComplete } from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(morgan('dev')); //로그 포맷: dev
app.use(cookieParser());

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//회원가입
app.post("/api/v1/users/signup", handleUserSignUp);
//가게생성
app.post("/api/v1/stores", handleStoreCreate);
//리뷰 추가
app.post("/api/v1/stores/:storeId/reviews", handleReviewCreate);
//미션생성
app.post("/api/v1/stores/:storeId/missions", handleMissionCreate);
//미션도전
app.post("/api/v1/missions/:missionId/challenge", handleChallengeCreate);
//가게의 모든 리뷰
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
//내가 작성한 리뷰 목록
app.get("/api/v1/users/me/:userId/reviews", handleListMyReviews);
//특정 가게의 미션 목록
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);
//내가 진행 중인 미션 목록
app.get("/api/v1/missions/me/:userId/challenges", handleListMyChallenges)
//미션완료처리
app.patch("/api/v1/missions/:missionId/challenges/:userId", handleChallengeComplete);
/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});