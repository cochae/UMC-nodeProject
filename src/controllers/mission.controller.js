import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToChallenge } from "../dtos/mission.dto.js";
import { missionCreate, challengeCreate, listStoreMissions, listMyChallenges, challengeComplete } from "../services/mission.service.js";


export const handleMissionCreate = async (req, res, next) => {
     /*
    #swagger.summary = '미션 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              reward: { type: "number" },
              deadline: { type: "string" },
              mission_spec: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  deadline: { type: "string" },
                  mission_spec: { type: "string" },
                  reward: { type: "number" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U003" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
    const store_id = parseInt(req.params.storeId);  //여기서 변환
    console.log("미션을 추가했습니다!");
    console.log("body:", req.body);
    const entireMissionData = {
        ...req.body,
        store_id,  // pathvariable
    };
    console.log("entireMissionData:", entireMissionData);

    const mission = await missionCreate(bodyToMission(entireMissionData));
    res.status(StatusCodes.OK).success(mission);
}

export const handleChallengeCreate = async (req, res, next) => {
    /*
    #swagger.summary = '미션 도전 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 도전 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  status: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 도전 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U005" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
     
    const missionId = Number(req.params.missionId);
    console.log("진행 중인 미션을 추가했습니다!");
    console.log("body:", req.body);
    const entireChallengeData = {
        ...req.body,
        missionId,  // pathvariable
        userId: req.user.id
    };

    const challenge = await challengeCreate(bodyToChallenge(entireChallengeData));
    res.status(StatusCodes.OK).success(challenge);
}
export const handleListStoreMissions = async (req, res, next) => {
     /*
    #swagger.summary = '특정 가게 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "특정 가게 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        storeId: { type: "number" },
                        deadline: { type: "string" },
                        missionSepc: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
      res.status(StatusCodes.OK).success(missions);
};
//내가 진행 중인 미션 목록
export const handleListMyChallenges = async (req, res, next) => {
     /*
    #swagger.summary = '내가 진행 중인 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "내가 진행 중인 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        storeId: { type: "number" },
                        deadline: { type: "string" },
                        missionSepc: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  const challenges = await listMyChallenges(
    req.user.id,
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
      res.status(StatusCodes.OK).success(challenges);
};

export const handleChallengeComplete = async (req, res, next ) => {
      /*
    #swagger.summary = '미션 완료 처리 API';

    #swagger.responses[200] = {
      description: "미션 완료 처리 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 완료 처리 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U006" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
    const missionId = Number(req.params.missionId);
    const userId = req.user.id;

    const entireCompletedChallengeData = {
        missionId,
        userId
    };

    const completedChallenge = await challengeComplete(bodyToChallenge(entireCompletedChallengeData));
    res.status(StatusCodes.OK).success(completedChallenge);
}