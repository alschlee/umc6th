import express from "express";
import { addMissionToStoreController, challengeMissionController } from '../controllers/store.controller.js';

export const storeRouter = express.Router({mergeParams: true});


// 가게에 미션 추가
storeRouter.post('/:storeId/missions', addMissionToStoreController);

// 가게의 미션을 도전 중인 미션에 추가
storeRouter.post('/:storeId/missions/:missionId/challenge', challengeMissionController);

// 리뷰 목록 조회
storeRouter.get('/reviews', asyncHandler(reviewPreview));