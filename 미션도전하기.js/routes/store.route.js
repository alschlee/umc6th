import express from "express";
import { addMissionToStoreController, challengeMissionController } from '../controllers/store.controller.js';

const router = express.Router();

// 가게에 미션 추가
router.post('/:storeId/missions', addMissionToStoreController);

// 가게의 미션을 도전 중인 미션에 추가
router.post('/:storeId/missions/:missionId/challenge', challengeMissionController);