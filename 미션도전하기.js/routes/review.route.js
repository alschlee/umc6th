import express from "express";
import { addReview } from "../controllers/review.controller.js";
import expressAsyncHandler from "express-async-handler";

export const reviewRouter = express.Router();

reviewRouter.post('/addreview', expressAsyncHandler(addReview));