import { NewCarModel, NewCarInfoDetail, FilterNewCarModel } from './../types/newCarModelTypes';
import { CBErrorType } from './../types/errors';
import { Notification } from './../types/modelTypes';
const PREFIX = 'NEW_CAR_ACTION/';
export const REQUEST_NEW_CAR_LIST = PREFIX + 'REQUEST_NEW_CAR_LIST';
export const RECEIVE_NEW_CAR_LIST = PREFIX + 'REQUEST_NEW_CAR_LIST';
export const REQUEST_NEW_CAR_INFO_DETAIL = PREFIX + 'REQUEST_NEW_CAR_INFO_DETAIL';
export const RECEIVE_NEW_CAR_INFO_DETAIL = PREFIX + 'RECEIVE_NEW_CAR_INFO_DETAIL';
export const UPDATE_NEW_CAR_INFO_DETAIL = PREFIX + 'UPDATE_NEW_CAR_INFO_DETAIL';
export const CLEAR_NEW_CAR_INFO_DETAIL = PREFIX + 'CLEAR_NEW_CAR_INFO_DETAIL';
export const REQUEST_SEARCH_CAR = PREFIX + 'REQUEST_SEARCH_CAR';
export const UPDATE_FILTER_NEW_CAR = PREFIX + 'UPDATE_FILTER_NEW_CAR';
export const REQUEST_FILTER_CAR = PREFIX + 'REQUEST_FILTER_CAR';
export const RECEIVE_FILTER_CAR = PREFIX + 'RECEIVE_FILTER_CAR';
export const REQUEST_DOWNLOAD_PRICE = PREFIX + 'REQUEST_DOWNLOAD_PRICE';
export const REQUEST_DOWNLOAD_SPECIFICATION = PREFIX + 'REQUEST_DOWNLOAD_SPECIFICATION';
export const UPDATE_CAR_SHOWING_ID = PREFIX + 'UPDATE_CAR_SHOWING_ID';
export const CHECK_CAR_SHOWING_WITH_ID = PREFIX + 'CHECK_CAR_SHOWING_WITH_ID';

export interface RequestNewCarList {
    type: typeof REQUEST_NEW_CAR_LIST,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface ReceiveNewCarList {
    type: typeof RECEIVE_NEW_CAR_LIST,
    newCars: NewCarModel[] | null | undefined
}

export interface RequestNewCarInfoDetail {
    type: typeof REQUEST_NEW_CAR_INFO_DETAIL,
    carId: string,
}

export interface ReceiveNewCarInfoDetail {
    type: typeof RECEIVE_NEW_CAR_INFO_DETAIL,
    newCarInfo: any | null | undefined
}

export interface UpdateNewCarInfoDetail {
    type: typeof UPDATE_NEW_CAR_INFO_DETAIL,
    newCarInfo: any | null | undefined
}

export interface RequestSearchCar {
    type: typeof REQUEST_SEARCH_CAR,
    searchKey: string | null | undefined
}

export interface UpdateFilterNewCar {
    type: typeof UPDATE_FILTER_NEW_CAR,
    filterModel: FilterNewCarModel
}

export interface RequestFilterCar {
    type: typeof REQUEST_FILTER_CAR,
    filerModel: FilterNewCarModel,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface ReceiveCarFilter {
    type: typeof RECEIVE_FILTER_CAR,
    newCars: NewCarModel[] | null | undefined
}

export interface RequestDownloadPrice {
    type: typeof REQUEST_DOWNLOAD_PRICE,
    resolve: (result: any | null | undefined) => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface RequestDownloadSpecifications {
    type: typeof REQUEST_DOWNLOAD_SPECIFICATION,
    carGrade: string,
    resolve: (result: any | null | undefined) => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface UpdateCarShowingId {
    type: typeof UPDATE_CAR_SHOWING_ID,
    carId: string | null | undefined
}

export interface CheckCarShowingId {
    type: typeof CHECK_CAR_SHOWING_WITH_ID,
    carId: string | null | undefined
}

export type NewCarActionTypes =
    RequestNewCarList
    | ReceiveNewCarList
    | RequestNewCarInfoDetail
    | ReceiveNewCarInfoDetail
    | RequestSearchCar
    | UpdateFilterNewCar
    | RequestFilterCar
    | ReceiveCarFilter
    | RequestDownloadPrice
    | RequestDownloadSpecifications
    | UpdateCarShowingId
    | CheckCarShowingId
    | UpdateNewCarInfoDetail; 