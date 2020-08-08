import { CarCompareModel, CarCompareSuggestionModel, ListIdCompareModel } from './../types/newCarModelTypes';
import { CarCompareStateType } from './../types/reducerStateTypes';
import {AllState, PromotionStateType} from "../types/reducerStateTypes";
import {Map} from 'immutable';
import { Promotion } from "../types/modelTypes";

const selectCarCompareState = (state: AllState): CarCompareStateType => {
    return state.carCompareState;
};

export const selectCarCompareMap = (state: AllState): Map<string, CarCompareModel> => {
    return Map(selectCarCompareState(state)?.carCompareMap);
};

export const selectSuggestCarCompareMap = (state: AllState): Map<string, CarCompareSuggestionModel> => {
    return Map(selectCarCompareState(state)?.suggestListMap);
};

export const selectListIdsCompareSuggestion = (state: AllState): ListIdCompareModel[] | null => {
    return selectCarCompareState(state)?.carCompareIdsDisplay;
};

export const selectCarCompareSuggestionIdsBase = (state: AllState): ListIdCompareModel[] | null => {
    return selectCarCompareState(state)?.carCompareIdsBase;
};

export const selectFirstCarSelected = (state: AllState): CarCompareSuggestionModel | null | undefined => {
    return selectCarCompareState(state)?.firstCarCompareChoose;
};

export const selectSecondCarSelected = (state: AllState): CarCompareSuggestionModel | null | undefined => {
    return selectCarCompareState(state)?.secondCarCompareChoose;
};

export const selectCarsOverViewShowing = (state: AllState): any | null | undefined => {
    return selectCarCompareState(state)?.carsOverViewShowing;
};

export const selectCarsFeaturesShowing = (state: AllState): any | null | undefined => {
    return selectCarCompareState(state)?.carsFeaturesShowing;
};