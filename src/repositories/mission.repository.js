import { pool } from "../db.config.js";

export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {

    const [result] = await conn.query(
        `INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?, ?, ?, ?);`,
      [ data.store_id, data.reward, data.deadline, data.mission_spec ]
    );


    return result.insertId;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const addChallenge = async (data) => {
  const conn = await pool.getConnection();

  try {
     const [confirm] = await pool.query(
        `SELECT EXISTS(SELECT 1 FROM user_mission WHERE mission_id = ? AND status = 'in_progress') as isExistChallenge;`,
        [data.mission_id]
    );


    if (confirm[0].isExistChallenge) {
      return null;
    }

    const [result] = await conn.query(
        `INSERT INTO user_mission ( mission_id, user_id, status) VALUES ( ?, ?, ?);`,
      [ data.mission_id, 19, "in_progress" ]
    );


    return result.insertId;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};


export const getMission = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, missionId);

    console.log(mission);

    if (mission.length == 0) {
      return null;
    }
    return mission[0];

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const getChallenge = async (challengeId) => {
  const conn = await pool.getConnection();

  try {
    const [challenge] = await pool.query(`SELECT * FROM user_mission WHERE id = ?;`, challengeId);

    console.log(challenge);

    if (challenge.length == 0) {
      return null;
    }
    return challenge[0];

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
