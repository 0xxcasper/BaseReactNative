import { CarCompareModel, CarCompareSuggestionModel, NewCarModel } from './../types/newCarModelTypes';

const PREFIX = 'CAR_COMPARE_ACTION/';
export const REQUEST_CAR_COMPARE = PREFIX + 'REQUEST_CAR_COMPARE';
export const RECEIVE_CAR_COMPARE = PREFIX + 'RECEIVE_CAR_COMPARE';
export const REQUEST_SUGGESTION_CAR_COMPARE = PREFIX + 'REQUEST_SUGGESTION_CAR_COMPARE';
export const RECEIVE_SUGGESTION_CAR_COMPARE = PREFIX + 'RECEIVE_SUGGESTION_CAR_COMPARE';
export const DID_CHOOSE_CAR_COMPARE = PREFIX + 'DID_CHOOSE_CAR_COMPARE';
export const RECEIVE_CHOOSE_CAR_COMPARE = PREFIX + 'RECEIVE_CHOOSE_CAR_COMPARE';
export const RECEIVE_SUGGESTION_CAR_COMPARE_MERGE = PREFIX + 'RECEIVE_SUGGESTION_CAR_COMPARE_MERGE';
export const MERGE_CAR_COMPARE_FROM_BASE_TO_DISPLAY = PREFIX + 'MERGE_CAR_COMPARE_FROM_BASE_TO_DISPLAY';
export const CLEAR_CAR_COMPARE_SELECTED = PREFIX + 'CLEAR_CAR_COMPARE_SELECTED';

export interface RequestCarCompareAction {
    type: typeof REQUEST_CAR_COMPARE,
    carIds: string[] | null | undefined
}

export interface ReceiveCarCompareAction {
    type: typeof RECEIVE_CAR_COMPARE,
    carsCompare: CarCompareModel[] | null | undefined,
    overView: any,
    features: any
}

export interface RequestSuggestionCompare {
    type: typeof REQUEST_SUGGESTION_CAR_COMPARE,
    carId: string | null | undefined
}

export interface ReceiveSuggestionCompare {
    type: typeof RECEIVE_SUGGESTION_CAR_COMPARE,
    suggestList: any[] | null | undefined
}

export interface ReceiveSuggestionCompareMerge {
    type: typeof RECEIVE_SUGGESTION_CAR_COMPARE_MERGE,
    suggestList: any[] | null | undefined,
    carId: string | null | undefined
}

export interface ChooseCarCompare {
    type: typeof DID_CHOOSE_CAR_COMPARE,
    carId: string | null | undefined,
    isFirst: Boolean
}

export interface ReceiveChooseCarCompare {
    type: typeof RECEIVE_CHOOSE_CAR_COMPARE,
    carInfo: CarCompareSuggestionModel | null | undefined,
    isFirst: Boolean
}

export type CarCompareActionTypes =
    RequestCarCompareAction
    | ReceiveCarCompareAction
    | RequestSuggestionCompare
    | ReceiveSuggestionCompare
    | ChooseCarCompare
    | ReceiveChooseCarCompare;
