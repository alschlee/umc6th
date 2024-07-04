import { Request, Response } from 'express';
import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { addMissionToStore, challengeMission, getStoreMissions, getOngoingMissions } from '../services/store.service.js';
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

// 리뷰 목록 조회
export const reviewPreview = async (req, res, next) => {
  return res.send(response(status.SUCCESS, await getReview(req.params.storeId, req.query)));
}

// 특정 가게의 미션 목록 조회
export const getStoreMissionsController = async (req, res) => {
  const { storeId } = req.params;
  let { page } = req.query;

  try {
    if (!page || isNaN(parseInt(page)) || parseInt(page) < 1) {
      throw new Error('잘못된 페이지 번호입니다.');
    }

    // 하드코딩
    const dummyMissions = await getStoreMissions(storeId, parseInt(page));
    res.status(200).json(dummyMissions);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// 내가 진행중인 미션 목록 조회
export const getOngoingMissionsController = async (req, res) => {
  const { userId } = req.params; // 예시에서는 userId를 path parameter로 사용
  let { page } = req.query;

  try {
    // 페이지 유효성 검사
    if (!page || isNaN(parseInt(page)) || parseInt(page) < 1) {
      throw new Error('잘못된 페이지 번호입니다.');
    }

    // 하드코딩
    const dummyMissions = await getOngoingMissions(userId, parseInt(page));
    res.status(200).json(dummyMissions);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};