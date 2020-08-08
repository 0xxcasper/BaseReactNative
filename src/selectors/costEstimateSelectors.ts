import {AllState, CostEstimateStateType} from "../types/reducerStateTypes";

const selectCostEstimateState = (state: AllState): CostEstimateStateType => {
    return state.costEstimateState;
};

export const selectLocationsMap = (state: AllState) => {
    return selectCostEstimateState(state)?.locationMap;
};

export const selectProvinceMap = (state: AllState) => {
    return selectCostEstimateState(state)?.provinceMap;
}

export const selectCostEstimate = (state: AllState) => {
    return selectCostEstimateState(state)?.costEstimate;
}

export const selectCalculateCostEstimate = (state: AllState) => {
    return selectCostEstimateState(state)?.calculateCostEstimate;
}