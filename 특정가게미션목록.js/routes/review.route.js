import express from "express";
import { addReview, getMyReviewsController } from "../controllers/review.controller.js";
import expressAsyncHandler from "express-async-handler";

export const reviewRouter = express.Router();

reviewRouter.post('/addreview', expressAsyncHandler(addReview));

reviewRouter.get('/my-reviews', getMyReviewsController);