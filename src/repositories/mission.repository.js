import { prisma } from "../db.config.js";

export const addMission = async (data) => {
  try {
    const newMission = await prisma.mission.create({
      data: {
        storeId: data.store_id,
        reward: data.reward,
        deadline: data.deadline,
        missionSpec: data.mission_spec,
      }
    });

    return newMission.id;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const addChallenge = async (data) => {
  try {
    const isExistChallenge = await prisma.userMission.findFirst({
      where: { 
        userId: 19,           // ← 추가
        missionId: data.mission_id, 
      }
    });

    if (isExistChallenge) {
      return null;
    }

    const newUserMission = await prisma.userMission.create({
      data: {
        missionId: data.mission_id,
        userId: 19,
        status: "in_progress"
      }
    });

    return newUserMission.id;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const getMission = async (missionId) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: { id: missionId }
    });

    console.log(mission);

    if (!mission) {
      return null;
    }

    return mission;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const getChallenge = async (challengeId) => {
  try {
    const challenge = await prisma.userMission.findUnique({
      where: { id: challengeId }
    });

    console.log(challenge);

    if (!challenge) {
      return null;
    }

    return challenge;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const getAllStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    select: { id: true, storeId: true, deadline: true, missionSpec: true, storeId: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};

export const getAllMyChallenges = async (userId, cursor) => {
  const challenges = await prisma.userMission.findMany({
    where: {
      userId: userId,
      status: "in_progress",
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
    select: {
      id: true,          // UserMission id
      mission: {         // relation 통해 Mission 정보 가져오기
        select: {
          storeId: true,
          deadline: true,
          missionSpec: true,
        },
      },
    },
  });
  return challenges;
};

// 단순 조회
export const findUserMission = async ({ userId, missionId }) => {
  return await prisma.userMission.findFirst({
    where: { userId: userId, missionId: missionId },
  });
};

// 완료 처리만
export const updateMissionComplete = async (missionId) => {
  return await prisma.userMission.update({
    where: { id: missionId },
    data: { status: "completed" },
  });
};
