import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { addMissionToStoreDAO } from '../models/store.dao.js';

export const addMissionToStore = async (storeId, missionDTO) => {
  try {
    const mission = await addMissionToStoreDAO(storeId, missionDTO);
    return mission;
  } catch (error) {
    throw new BaseError(status.INTERNAL_SERVER_ERROR, "Failed to add mission to store");
  }
};
