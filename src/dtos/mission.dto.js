export const bodyToMission = (body) => {
    const deadline = new Date(body.deadline); //날짜 변환

    return {
        store_id: body.store_id, 
        reward: body.reward,
        deadline, 
        mission_spec: body.mission_spec,
    };
};

export const bodyToChallenge = (body) => {

    return {
        mission_id: body.mission_id, 
    };
};


export function responseFromMission(mission) {
  return {
    id: mission.id,
    reward: mission.reward,
    deadline: mission.deadline,
    mission_spec: mission.mission_spec,
  };
}

export function responseFromChallenge(challenge) {
  return {
    id: challenge.id,
    status: challenge.status,
  };
}

export const responseFromMissions = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};
