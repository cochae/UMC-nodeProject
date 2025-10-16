import { pool } from "../db.config.js";

export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;`,
      [data.store_id]
    );

    //가게가 있는 지 검증
    if (!confirm[0].isExistStore) {
      return null;
    }

    const [result] = await conn.query(
        `INSERT INTO review (user_id, store_id, body, score) VALUES (19, ?, ?, ?);`,
      [ data.store_id, data.body, data.score]
    );

    // 평균 점수 계산
    const [[average]] = await conn.query(
      `SELECT AVG(score) as avgScore FROM review WHERE store_id = ?;`,
      [data.store_id]
    );

    const newAvgScore = average.avgScore;

    // store 테이블에 평균 평점 업데이트
    await conn.query(
      `UPDATE store SET score = ? WHERE id = ?;`,
      [newAvgScore, data.store_id]
    );
    console.log("store 평균 평점이 " + newAvgScore + "점으로 업데이트 되었습니다.");

    return result.insertId;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
export const getReview = async (reviewId) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, reviewId);

    console.log(review);

    if (review.length == 0) {
      return null;
    }
    return review[0];

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
