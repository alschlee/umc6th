import express from 'express';
import { userSignin } from '../controllers/temp.controller.js';
export const userRouter = express.Router();

userRouter.post('/signin', userSignin);