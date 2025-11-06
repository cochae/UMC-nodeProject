import { responseFromMissions, responseFromMission, responseFromChallenge } from "../dtos/mission.dto.js";
import {
  addMission, addChallenge,
  getMission, getChallenge, getAllStoreMissions, getAllMyChallenges, findUserMission, updateMissionComplete
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
export const listStoreMissions = async (storeId, cursor) => {
  const missions = await getAllStoreMissions(storeId, cursor);
  return responseFromMissions(missions);
};
export const listMyChallenges = async (userId, cursor) => {
  const challenges = await getAllMyChallenges(userId, cursor);
  return responseFromMissions(challenges);
};


export const challengeComplete = async ({ userId, missionId }) => {
  // 1. 존재 여부 확인
  const userMission = await findUserMission({ userId, missionId });

  if (!userMission) {
    throw new Error("해당 미션에 대한 도전이 존재하지 않습니다.");
  }

  // 2. 이미 완료된 미션인지 확인
  if (userMission.status === "completed") {
    throw new Error("이미 완료된 미션입니다.");
  }

  // 3. 완료 처리
  const CompletedChallenge = await updateMissionComplete(userMission.id);

  // 4. 응답 포맷 변환
  return responseFromChallenge(CompletedChallenge);
};
