import { pool } from "../config/db.config.js";
import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { insertMissionSql } from "./store.sql.js";

// 가게에 미션 추가
export const addMissionToStoreDAO = async (storeId, missionDTO) => {
  try {
    const conn = await pool.getConnection();
    
    const result = await pool.query(insertMissionSql, [storeId, missionDTO.id, missionDTO.price, missionDTO.points, missionDTO.status]);

    conn.release();

    return result;
  } catch (error) {
    throw new BaseError(status.INTERNAL_SERVER_ERROR, "미션 추가 실패");
  }
};
