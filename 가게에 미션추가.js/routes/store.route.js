import express from "express";
import { addMissionToStoreController } from '../controllers/store.controller.js';

const router = express.Router();

router.post('/:storeId/missions', addMissionToStoreController);