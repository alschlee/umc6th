import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { addMissionToStore } from '../services/store.service.js';
import { AddMissionDTO } from '../dtos/addMission.dto.js';

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
