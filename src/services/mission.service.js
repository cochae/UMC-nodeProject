import { responseFromMissions, responseFromMission, responseFromChallenge } from "../dtos/mission.dto.js";
import {
  addMission, addChallenge,
  getMission, getChallenge, getAllStoreMissions, getAllMyChallenges, findUserMission, updateMissionComplete
} from "../repositories/mission.repository.js";
import { MissionAlreadyInProgressError, ChallengeNotFoundError, ChallengeAlreadyCompletedError } from "../errors.js";

export const missionCreate = async (data) => {
  const createdMissionId = await addMission(data);

  const mission = await getMission(createdMissionId);
  console.log("mission from getMission:", mission);

  return responseFromMission(mission);
};

export const challengeCreate = async (data) => {
  const createdChallengeId = await addChallenge(data);
  
    if (createdChallengeId === null) {
        throw new MissionAlreadyInProgressError("이미 진행중인 미션입니다", data);
    }

  const challenge = await getChallenge(createdChallengeId);
  console.log("challenge from getchallenge:", challenge);

  return responseFromChallenge(challenge);
};
export const listStoreMissions = async (storeId, cursor) => {
  const missions = await getAllStoreMissions(storeId, cursor);
  return responseFromMissions(missions);
};
export const listMyChallenges = async (userId, cursor) => {
  const challenges = await getAllMyChallenges(userId, cursor);
  return responseFromMissions(challenges);
};


export const challengeComplete = async (data) => {
  const userMission = await findUserMission(data);

  if (!userMission) {
    throw new ChallengeNotFoundError("해당 미션에 대한 도전이 존재하지 않습니다.", data);
  }

  if (userMission.status === "completed") {
    throw new ChallengeAlreadyCompletedError("이미 완료된 미션입니다.", data);
  }

  const CompletedChallenge = await updateMissionComplete(userMission.id);

  return responseFromChallenge(CompletedChallenge);
};
