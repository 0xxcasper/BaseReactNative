import { Accessories } from './../types/newCarModelTypes';
import { CarBrandDealer, CarModelTestDrive } from './../types/modelTypes';
import { CBErrorType } from "../types/errors";
import { CarEditor, CarInfo } from "../types/modelTypes";

const PREFIX = 'CAR_ACTION/';
export const REQUEST_CAR_BRAND_LIST = PREFIX + 'REQUEST_CAR_BRAND_LIST';
export const REQUEST_CAR_BRAND_LIST_OK = PREFIX + 'REQUEST_CAR_BRAND_LIST_OK';
export const REQUEST_CAR_BRAND_LIST_ERROR = PREFIX + 'REQUEST_CAR_BRAND_LIST_ERROR';
export const UPDATE_CAR_BRANDS_FROM_API = PREFIX + 'UPDATE_CAR_BRANDS_FROM_API';


export const REQUEST_CAR_LIST = PREFIX + 'REQUEST_CAR_LIST';
export const REQUEST_CAR_LIST_OK = PREFIX + 'REQUEST_CAR_LIST_OK';
export const REQUEST_CAR_LIST_ERROR = PREFIX + 'REQUEST_CAR_LIST_ERROR';
export const SET_CAR_INFOS = PREFIX + 'SET_CAR_INFOS';
export const ADD_CAR_INFOS = PREFIX + 'ADD_CAR_INFOS';
export const START_EDIT_CAR = PREFIX + 'START_EDIT_CAR';
export const UPDATE_CAR_EDITOR = PREFIX + 'UPDATE_CAR_EDITOR';
export const REQUEST_UPDATE_CAR = PREFIX + 'REQUEST_UPDATE_CAR';
export const UPDATE_CAR_OK = PREFIX + 'UPDATE_CAR_OK';
export const UPDATE_CAR_ERROR = PREFIX + 'UPDATE_CAR_ERROR';

export const REQUEST_DELETE_CAR = PREFIX + 'REQUEST_DELETE_CAR';
export const DELETE_CAR_OK = PREFIX + 'UPDATE_DELETE_CAR_OK';
export const DELETE_CAR_ERROR = PREFIX + 'UPDATE_DELETE_CAR_ERROR';

export const RESET_CAR_EDITOR = PREFIX + 'RESET_CAR_EDITOR';
export const REQUEST_CAR_BRAND_DEALER = PREFIX + 'REQUEST_CAR_BRAND_DEALER';
export const RECEIVE_CAR_BRAND_DEALER = PREFIX + 'RECEIVE_CAR_BRAND_DEALER';
export const REQUEST_CAR_AVAIL_TEST_DRIVE = PREFIX + 'REQUEST_CAR_AVAIL_TEST_DRIVE';
export const UPDATE_CAR_AVAIL_TEST_DRIVE = PREFIX + 'UPDATE_CAR_AVAIL_TEST_DRIVE';
export const RECEIVE_ACCESSORY_MODEL = PREFIX + 'RECEIVE_ACCESSORY_MODEL';

export const REQUEST_ACCESSORY = PREFIX + 'REQUEST_ACCESSORY';


export interface UpdateCarBrandsFromApiAction {
    type: string,
    carBrandData: any,
}


export interface SetCarInfosAction {
    type: string,
    carInfos: CarInfo[] | null | undefined,
}
export interface AddCarInfosAction {
    type: string,
    carInfos: CarInfo[] | null | undefined,
}

export interface UpdateCarEditorAction {
    type: string,
    carEditor: CarEditor | null | undefined,
}
export interface UpdateCarEditorAction {
    type: string,
    carEditor: CarEditor | null | undefined,
}

export interface StartEditCarAction {
    type: string,
    carId: string,
}

export interface RequestUpdateCarAction {
    type: string,
    carId: string,
    resolve: (carInfo: CarInfo) => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface UpdateCarAction {
    type: string,
    carInfo: CarInfo,
}

export interface DeleteCarAction {
    type: string,
    carId: string,
    resolve: (carId: string) => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface ResetCarEditor {
    type: typeof RESET_CAR_EDITOR,
    carId: string | null | undefined
}

export interface UpdateCarBrandDealer {
    type: typeof RECEIVE_CAR_BRAND_DEALER,
    carBrands: CarBrandDealer[] | null
}

export interface UpdateCarAvailTestDrive {
    type: typeof UPDATE_CAR_AVAIL_TEST_DRIVE,
    carsAvail: CarModelTestDrive[] | null
}

export interface RequestAccessory {
    type: typeof REQUEST_ACCESSORY,
    carId: string | number
}

export interface ReceiveAccessoryModel {
    type: typeof RECEIVE_ACCESSORY_MODEL,
    carId: string | number,
    accessories: Accessories
}

export type CarActionTypes = UpdateCarBrandsFromApiAction
    | SetCarInfosAction
    | AddCarInfosAction
    | UpdateCarEditorAction
    | StartEditCarAction
    | RequestUpdateCarAction
    | UpdateCarAction
    | DeleteCarAction
    | ResetCarEditor
    | UpdateCarBrandDealer
    | UpdateCarAvailTestDrive
    | RequestAccessory
    | ReceiveAccessoryModel;
