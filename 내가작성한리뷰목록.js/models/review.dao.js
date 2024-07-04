import pool from '../config/dbConfig.js';
import { insertReviewSql, getReviewByIdSql } from './review.sql';

// 가게 존재 여부 확인
const checkStoreExistence = async (storeId) => {
  try {
    const conn = await pool.getConnection();
    const [result] = await conn.query('SELECT COUNT(*) AS count FROM stores WHERE id = ?', [storeId]);
    conn.release();
    return result[0].count > 0;
  } catch (error) {
    throw new Error(`Failed to check store existence: ${error.message}`);
  }
};

// 리뷰 작성 DAO
export const addReview = async (reviewDTO) => {
  const { storeId, rating, comment, photos } = reviewDTO;

  const storeExists = await checkStoreExistence(storeId);
  if (!storeExists) {
    throw new Error(`Store with id ${storeId} does not exist.`);
  }

  const photosString = JSON.stringify(photos); 

  try {
    const conn = await pool.getConnection();
    const [result] = await conn.query(insertReviewSql, [storeId, rating, comment, photosString]);
    conn.release();
    return result.insertId;
  } catch (err) {
    throw new Error(`Failed to add review: ${err.message}`);
  }
};

// 리뷰 ID로 리뷰 조회 DAO
export const getReviewById = async (reviewId) => {
  try {
    const conn = await pool.getConnection();
    const [result] = await conn.query(getReviewByIdSql, [reviewId]);
    conn.release();
    return result[0];
  } catch (error) {
    throw new Error(`Failed to get review by id: ${error.message}`);
  }
};

// 내가 작성한 리뷰 목록
export const getMyReviewsDAO = async (userId, page, limit) => {
  const offset = (page - 1) * limit;

  try {
      const conn = await pool.getConnection();
      const query = `
      SELECT store_name AS storeName, review_photos AS reviewPhotos,
      JSON_OBJECT('nickname', 'John Doe', 'rating', 4.5, 'date', '2024-07-06', 'content', '맛있어요!') AS reviewPage,
      '리뷰 남기기' AS reviewButton
      FROM reviews
      WHERE user_id = 1 
      ORDER BY date DESC
      LIMIT 0, 10;
      `;
      const [rows] = await conn.query(query, [userId, offset, limit]);
      conn.release();
      
      return rows;
  } catch (error) {
      throw new BaseError(status.INTERNAL_SERVER_ERROR, '리뷰 목록을 가져오는 중 에러 발생', error);
  }
};