import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp, handleListMyReviews } from "./controllers/user.controller.js";
import { handleStoreCreate } from "./controllers/store.controller.js";
import { handleReviewCreate, handleListStoreReviews } from "./controllers/review.controller.js";
import { handleListStoreMissions, handleMissionCreate, handleChallengeCreate, handleListMyChallenges, handleChallengeComplete } from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});