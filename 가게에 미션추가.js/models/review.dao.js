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