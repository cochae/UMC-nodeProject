import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import morgan from "morgan";
import { handleUserSignUp, handleListMyReviews, handleMyInfo } from "./controllers/user.controller.js";
import { handleStoreCreate } from "./controllers/store.controller.js";
import { handleReviewCreate, handleListStoreReviews } from "./controllers/review.controller.js";
import { handleListStoreMissions, handleMissionCreate, handleChallengeCreate, handleListMyChallenges, handleChallengeComplete } from "./controllers/mission.controller.js";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { googleStrategy, jwtStrategy } from "./auth.config.js";


dotenv.config();
passport.use(googleStrategy);
passport.use(googleStrategy);
passport.use(jwtStrategy); 

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
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 9th",
      description: "UMC 9th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const isLogin = passport.authenticate('jwt', { session: false });


//회원가입
app.post("/api/v1/users/signup", handleUserSignUp);
//가게생성
app.post("/api/v1/stores", isLogin, handleStoreCreate);
//리뷰 추가
app.post("/api/v1/stores/:storeId/reviews", isLogin, handleReviewCreate);
//미션생성
app.post("/api/v1/stores/:storeId/missions", isLogin, handleMissionCreate);
//미션도전
app.post("/api/v1/missions/:missionId/challenge", isLogin, handleChallengeCreate);
//가게의 모든 리뷰
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
// 내가 작성한 리뷰 목록
app.get("/api/v1/users/me/reviews", isLogin, handleListMyReviews);
//특정 가게의 미션 목록
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);
// 내가 진행 중인 미션 목록
app.get("/api/v1/missions/me/challenges", isLogin, handleListMyChallenges);
// 미션 완료 처리
app.patch("/api/v1/missions/:missionId/complete", isLogin, handleChallengeComplete);
// 정보 수정
app.patch("/api/v1/users/me", isLogin, handleMyInfo);



app.get('/mypage', isLogin, (req, res) => {
  res.status(200).success({
    message: `인증 성공! ${req.user.name}님의 마이페이지입니다.`,
    user: req.user,
  });
});


app.get("/oauth2/login/google", 
  passport.authenticate("google", { 
    session: false 
  })
);
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
	  session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    const tokens = req.user; 

    res.status(200).json({
      resultType: "SUCCESS",
      error: null,
      success: {
          message: "Google 로그인 성공!",
          tokens: tokens, // { "accessToken": "...", "refreshToken": "..." }
      }
    });
  }
);


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