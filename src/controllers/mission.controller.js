import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToChallenge } from "../dtos/mission.dto.js";
import { missionCreate, challengeCreate, listStoreMissions, listMyChallenges, challengeComplete } from "../services/mission.service.js";


export const handleMissionCreate = async (req, res, next) => {
    const store_id = parseInt(req.params.storeId);  //여기서 변환
    console.log("미션을 추가했습니다!");
    console.log("body:", req.body);
    const entireMissionData = {
        ...req.body,
        store_id,  // pathvariable
    };
    console.log("entireMissionData:", entireMissionData);

    const mission = await missionCreate(bodyToMission(entireMissionData));
    res.status(StatusCodes.OK).json({ result: mission });
}

export const handleChallengeCreate = async (req, res, next) => {
    const mission_id = req.params.missionId;
    console.log("진행 중인 미션을 추가했습니다!");
    console.log("body:", req.body);
    const entireChallengeData = {
        ...req.body,
        mission_id,  // pathvariable
    };

    const challenge = await challengeCreate(bodyToChallenge(entireChallengeData));
    res.status(StatusCodes.OK).json({ result: challenge });
}
export const handleListStoreMissions = async (req, res, next) => {
  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(200).json({
    result: missions
  });
};
//내가 진행 중인 미션 목록
export const handleListMyChallenges = async (req, res, next) => {
  const challenges = await listMyChallenges(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(200).json({
    result: challenges
  });
};

export const handleChallengeComplete = async (req, res, next ) => {
    const mission_id = req.params.missionId;
    const user_id = req.params.userId;

    const entireCompletedChallengeData = {
        mission_id,
        user_id
    };

    const completedChallenge = await challengeComplete(bodyToChallenge(entireCompletedChallengeData));
    res.status(StatusCodes.OK).json({ result: completedChallenge });
}