export const insertReviewSql = "INSERT INTO reviews (store_id, rating, comment, photos) VALUES (?, ?, ?, ?)";

export const getReviewByIdSql = "SELECT * FROM reviews WHERE review_id = ?";
