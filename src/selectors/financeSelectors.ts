import {AllState, TFSFinanceStateType} from "../types/reducerStateTypes";
import {TFSFinance} from "../types/modelTypes";

export const selectFinance = (state: AllState): TFSFinanceStateType => {
    return state.financeState
}

export const selectTFSFinance = (state: AllState) => {
    return selectFinance(state)?.tfsFinanceMap
}

export const selectTFSFinanceUpdate = (state: AllState) => {
    return selectFinance(state)?.tfsFinanceUpdate
}

export const selectTFSDetailFinance = (state: AllState): [] | null | undefined => {
    return selectFinance(state)?.tfsDetail
}