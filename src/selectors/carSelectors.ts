import { CarBrandDealer, CarModelTestDrive } from './../types/modelTypes';
import {AllState, CarStateType} from "../types/reducerStateTypes";
import {Map} from 'immutable';
import {CarBrand, CarEditor, CarGrade, CarInfo, CarModel} from "../types/modelTypes";
import { Accessories } from '../types/newCarModelTypes';

const selectCarState = (state: AllState): CarStateType => {
    return state?.carState;
};
export const selectCarInfoMap = (state: AllState): Map<string, CarInfo> => {
    return selectCarState(state)?.carInfoMap;
};
export const selectCarBrandMap = (state: AllState): Map<string, CarBrand> => {
    return selectCarState(state)?.carBrandMap;
};
export const selectCarModelMap = (state: AllState): Map<string, CarModel> => {
    return selectCarState(state)?.carModelMap;
};
export const selectCarGradeMap = (state: AllState): Map<string, CarGrade> => {
    return selectCarState(state)?.carGradeMap;
};
export const selectCarEditorMap = (state: AllState): Map<string, CarEditor> => {
    return selectCarState(state)?.carEditorMap;
};
export const selectCarBrandDealerMap = (state: AllState): Map<string, CarBrandDealer> => {
    return selectCarState(state)?.carBrandDealerMap;
};

export const selectCarAvailTestDriveMap = (state: AllState): Map<string, CarModelTestDrive> => {
    return selectCarState(state)?.carVailTestDriveMap;
};

export const selectCarAvailUpdateTime = (state: AllState): number => {
    return selectCarState(state)?.updateTimeCarTestDrive;
};

export const selectAccessoryMap = (state: AllState): Map<string, Accessories> => {
    return selectCarState(state)?.accessoryMap;
};
