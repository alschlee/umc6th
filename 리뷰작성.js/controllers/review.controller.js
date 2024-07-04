import { response } from "../config/response.js";
import { status } from "../config/response.status.js";

import { createReview } from '../services/review.service.js';

export const addReview = async (req, res, next) => {
    console.log("리뷰 작성을 요청하였습니다!");
    console.log("body:", req.body);

    res.send(response(status.SUCCESS, await joinUser(req.body)));
}