import {AllState, UsedCarCostEstimateStateType} from "../types/reducerStateTypes";
import {OnSaleGrade, SimpleObject, UsedCarCostEstimate} from "../types/modelTypes";

export const selectCostEstimateUsedCar = (state: AllState): UsedCarCostEstimateStateType => {
    return state?.usedCarCostEstimateState
}

export const selectUsedCarPlateTypes = (state: AllState): SimpleObject[] | null | undefined => {
    return selectCostEstimateUsedCar(state)?.plateTypes
}

export const selectUsedCarOnSaleGrade = (state: AllState): OnSaleGrade[] | null | undefined => {
    return selectCostEstimateUsedCar(state)?.onSaleGrades
}

export const selectUsedCarQualitys = (state: AllState): SimpleObject[] | null | undefined => {
    console.log('state', state)
    return selectCostEstimateUsedCar(state)?.qualitys
}

export const selectUsedCarInput = (state: AllState): UsedCarCostEstimate => {
    return selectCostEstimateUsedCar(state)?.usedCarCostEstimate
}