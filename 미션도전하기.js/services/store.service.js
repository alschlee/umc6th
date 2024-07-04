import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { addMissionToStoreDAO, challengeMissionDAO } from '../models/store.dao.js';

// 가게에 미션 추가
export const addMissionToStore = async (storeId, missionDTO) => {
  try {
    const mission = await addMissionToStoreDAO(storeId, missionDTO);
    return mission;
  } catch (error) {
    throw new BaseError(status.INTERNAL_SERVER_ERROR, "미션 추가 실패");
  }
};

// 가게의 미션을 도전 중인 미션에 추가
export const challengeMission = async (storeId, missionId, successRequest) => {
  try {
      const result = await challengeMissionDAO(storeId, missionId, successRequest);
      return result;
  } catch (error) {
      throw new Error('미션 도전 실패');
  }
};
