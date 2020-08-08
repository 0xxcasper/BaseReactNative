import {CBErrorType} from "../types/errors";
import {OnSaleGrade, SimpleObject} from "../types/modelTypes";

const PREFIX = 'COST_ESTIMATE_USED_CAR/';
export const REQUEST_PLATE_TYPES = PREFIX + 'REQUEST_PLATE_TYPES';
export const RECEIVE_PLATE_TYPES = PREFIX + 'RECEIVE_PLATE_TYPES';
export const REQUEST_ONSALE_GRADES = PREFIX + 'REQUEST_ONSALE_GRADES';
export const RECEIVE_ONSALE_GRADES = PREFIX + 'RECEIVE_ONSALE_GRADES';
export const REQUEST_QUALITYS = PREFIX + 'REQUEST_QUALITYS';
export const RECEIVE_QUALITYS = PREFIX + 'RECEIVE_QUALITYS';
export const UPDATE_COST_ESTIMATE = PREFIX + 'UPDATE_COST_ESTIMATE';
export const RESET_COST_ESTIMATE = PREFIX + 'RESET_COST_ESTIMATE';
export const USED_CAR_COST_ESTIMATE = PREFIX + 'USED_CAR_COST_ESTIMATE';

export interface RequestPlateTypes {
    type: typeof REQUEST_PLATE_TYPES,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void
}

export interface ReceivePlateTypes {
    type: typeof RECEIVE_PLATE_TYPES,
    plateTypes: SimpleObject[] | null | undefined
}

export interface RequestOnSaleGrades {
    type: typeof REQUEST_ONSALE_GRADES,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void
}

export interface ReceiveOnSaleGrades {
    type: typeof RECEIVE_ONSALE_GRADES,
    onSaleGrades: OnSaleGrade[] | null | undefined
}

export interface RequestQualitys {
    type: typeof REQUEST_QUALITYS,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void
}

export interface ReceiveQualitys {
    type: typeof RECEIVE_QUALITYS,
    qualitys: SimpleObject[] | null | undefined
}

export interface UpdateCostEstimate {
    type: typeof UPDATE_COST_ESTIMATE,
    costEstimate: any
}

export interface ResetCostEstimate {
    type: typeof RESET_COST_ESTIMATE
}

export interface UsedCarCostEstimate {
    type: typeof USED_CAR_COST_ESTIMATE,
    body: any,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void
}

export type CostEstimateUsedCarActionTypes =
    RequestPlateTypes |
    ReceivePlateTypes |
    RequestOnSaleGrades |
    ReceiveOnSaleGrades |
    RequestQualitys |
    ReceiveQualitys |
    UpdateCostEstimate |
    UsedCarCostEstimate