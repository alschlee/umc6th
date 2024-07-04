import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { addMissionToStore, challengeMission } from '../services/store.service.js';
import { AddMissionDTO } from '../dtos/addMission.dto.js';

// 가게에 미션 추가
export const addMissionToStoreController = async (req, res, next) => {
  try {
    const { id, price, points, status } = req.body;
    const storeId = req.params.storeId;

    const missionDTO = new AddMissionDTO(id, req.storeName, price, points, status);
    const mission = await addMissionToStore(storeId, missionDTO);

    res.status(201).json(mission);
  } catch (error) {
    next(error);
  }
};

// 가게의 미션을 도전 중인 미션에 추가
export const challengeMissionController = async (req, res, next) => {
  const { storeId, missionId } = req.params;
  const { successRequest } = req.body;

  try {
      const result = await challengeMission(storeId, missionId, successRequest);
      res.status(200).json({ success: true, data: result });
  } catch (error) {
      next(new ErrorResponse('미션 도전 실패', 500));
  }
};