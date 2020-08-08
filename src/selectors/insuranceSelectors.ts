import {AllState, InsuranceStateType} from "../types/reducerStateTypes";

export const selectInsurance = (state: AllState): InsuranceStateType => {
    return state.insuranceState
}

export const selectInsuranceRate = (state: AllState) => {
    return selectInsurance(state)?.insuranceRateMap
}