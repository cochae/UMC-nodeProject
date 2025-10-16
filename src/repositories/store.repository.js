import { pool } from "../db.config.js";

export const addStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM store WHERE business_number = ?) as isExistStore;`,
      [data.business_number]
    );

    if (confirm[0].isExistStore) {
      return null;
    }

    const [result] = await conn.query(
      `
      INSERT INTO store (business_number, region_id, name, address)
      SELECT ?, r.id, ?, ?
      FROM region r
      WHERE r.name = ?
      `,
      [data.business_number, data.name, data.address, data.region_name]
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

export const getStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE id = ?;`, storeId);

    console.log(store);

    if (store.length == 0) {
      return null;
    }

    return store[0];
    //return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
