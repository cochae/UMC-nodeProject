import { responseFromMission, responseFromChallenge } from "../dtos/mission.dto.js";
import {
  addMission, addChallenge,
  getMission, getChallenge,
} from "../repositories/mission.repository.js";

export const missionCreate = async (data) => {
  const createdMissionId = await addMission(data);

  const mission = await getMission(createdMissionId);
  console.log("mission from getMission:", mission);

  return responseFromMission(mission);
};

export const challengeCreate = async (data) => {
  const createdChallengeId = await addChallenge(data);
  
    if (createdChallengeId === null) {
        throw new Error("이미 진행중인 미션입니다.");
    }

  const challenge = await getChallenge(createdChallengeId);
  console.log("challenge from getchallenge:", challenge);

  return responseFromChallenge(challenge);
};