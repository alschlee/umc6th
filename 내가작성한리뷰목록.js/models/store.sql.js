export const insertMissionSql = "INSERT INTO missions (store_id, mission_id, price, points, status) VALUES (?, ?, ?, ?, ?);";

// 가게의 미션을 도전 중인 미션에 추가하는 SQL 쿼리
export const challengeMissionSql = "INSERT INTO transactions (store_id, mission_id, success_request) VALUES (?, ?, ?)";


// 리뷰 목록 조회
export const getReviewByReviewId = 
"SELECT u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.user_id "
+ "WHERE r.restaurant_id = ? AND r.review_id < ? "
+ "ORDER BY r.review_id DESC LIMIT ? ;"

export const getReviewByReviewIdAtFirst = 
"SELECT u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.user_id "
+ "WHERE r.restaurant_id = ? "
+ "ORDER BY r.review_id DESC LIMIT ? ;"