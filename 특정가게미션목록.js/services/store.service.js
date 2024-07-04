import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { addMissionToStoreDAO, challengeMissionDAO, getStoreMissionsDAO } from '../models/store.dao.js';

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

// 특정 가게의 미션 목록 조회
export const getStoreMissions = async (storeId, page) => {
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    // 하드코딩
    const dummyMissions = [
      { missionId: 1, price: 5000, points: 100, status: "진행중" },
      { missionId: 2, price: 10000, points: 200, status: "완료" },
      { missionId: 3, price: 15000, points: 300, status: "진행중" }
    ];
    return dummyMissions;
  } catch (error) {
    throw new BaseError(status.INTERNAL_SERVER_ERROR, "특정 가게의 미션 목록 조회 실패");
  }
};