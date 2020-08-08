import { UsedCarModel, UsedCarDetailModel, FilterNewCarModel } from './../types/newCarModelTypes';
import { CBErrorType } from './../types/errors';

const PREFIX = 'USED_CAR/';
export const REQUEST_USED_CAR_LIST = PREFIX + 'REQUEST_USED_CAR_LIST';
export const RECEIVE_USED_CAR_LIST = PREFIX + 'RECEIVE_USED_CAR_LIST';
export const REQUEST_USED_CAR_DETAIL = PREFIX + 'REQUEST_USED_CAR_DETAIL';
export const RECEIVE_USED_CAR_DETAIL = PREFIX + 'RECEIVE_USED_CAR_DETAIL';
export const CLEAR_PAGE= PREFIX + 'CLEAR_PAGE';

export interface RequestUsedCarList {
    type: typeof REQUEST_USED_CAR_LIST,
    searchKey: string | null | undefined,
    filterModel: FilterNewCarModel | null | undefined, 
}

export interface ReceiveUsedCarList {
    type: typeof RECEIVE_USED_CAR_LIST,
    carList: UsedCarModel[],
    total_pages: number,
    current_page: number
}

export interface RequestUsedCarDetail {
    type: typeof REQUEST_USED_CAR_DETAIL,
    params: any | null | undefined
}
export interface ReceiveUsedCarDetail {
    type: typeof RECEIVE_USED_CAR_DETAIL,
    carDetail: UsedCarDetailModel | null | undefined
    carId: string | number
}

export type UsedCarActionTypes = RequestUsedCarList | ReceiveUsedCarList | RequestUsedCarDetail | ReceiveUsedCarDetail;