import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToChallenge } from "../dtos/mission.dto.js";
import { missionCreate, challengeCreate } from "../services/mission.service.js";


export const handleMissionCreate = async (req, res, next) => {
    const store_id = req.params.storeId;
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