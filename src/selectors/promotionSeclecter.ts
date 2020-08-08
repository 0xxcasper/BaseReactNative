import {AllState, PromotionStateType} from "../types/reducerStateTypes";
import {Map} from 'immutable';
import { Promotion } from "../types/modelTypes";

const selectPromotionState = (state: AllState): PromotionStateType => {
    return state.promotionState;
};

export const selectPromotionMap = (state: AllState): Map<string, Promotion> => {
    return Map(selectPromotionState(state)?.promotionMap);
};