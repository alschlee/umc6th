import { pool } from "../config/db.config.js";
import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { insertMissionSql, challengeMissionSql, getStoreMissionsSql } from "./store.sql.js";

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


// 가게의 미션을 도전 중인 미션에 추가
export const challengeMissionDAO = async (storeId, missionId, successRequest) => {
  try {
      const conn = await pool.getConnection();

      const result = await conn.query(challengeMissionSql, [storeId, missionId, successRequest]);

      conn.release();
      return { storeId, missionId, successRequest };
  } catch (error) {
      throw new BaseError('미션 도전 실패', 500);
  }
};

// 리뷰 목록 조회
export const getPreviewReview = async (cursorId, size, storeId) => {
  try {
      const conn = await pool.getConnection();

      if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
          const [reviews] = await pool.query(getReviewByReviewIdAtFirst, [parseInt(storeId), parseInt(size)]);
          conn.release();
          return reviews;
  
      }else{
          const [reviews] = await pool.query(getReviewByReviewId, [parseInt(storeId), parseInt(cursorId), parseInt(size)]);
          conn.release();
          return reviews;    
      }
  } catch (err) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 특정 가게의 미션 목록 조회
export const getStoreMissionsDAO = async (storeId, offset, limit) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(getStoreMissionsSql, [storeId, offset, limit]);
    conn.release();
    return rows;
  } catch (error) {
    throw new BaseError(status.INTERNAL_SERVER_ERROR, "특정 가게의 미션 목록 조회 실패");
  }
};