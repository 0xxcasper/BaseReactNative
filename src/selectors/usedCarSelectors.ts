import { Map } from 'immutable';
import { AllState } from "../types/reducerStateTypes";
import { UsedCarModel, UsedCarDetailModel } from './../types/newCarModelTypes';
import { UsedCarStateType } from './../types/reducerStateTypes';

const selectUsedCarState = (state: AllState): UsedCarStateType => {
    return state.usedCarState;
};

export const selectUsedCarListMap = (state: AllState): Map<string, UsedCarModel> => {
    return selectUsedCarState(state).usedCarListMap;
};

export const selectCurrentPage = (state: AllState): number => {
    return selectUsedCarState(state).currentPage;
};

export const selectTotalPages = (state: AllState): number => {
    return selectUsedCarState(state).totalPages;
};

export const selectUsedCarDetailMap = (state: AllState): Map<string, UsedCarDetailModel> => {
    return selectUsedCarState(state).usedCarDetailMap;
};