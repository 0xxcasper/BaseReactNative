import {AllState, ProductEnumStateType} from "../types/reducerStateTypes";

const selectProductEnumState = (state: AllState): ProductEnumStateType => {
    return state.productEnumState;
}

export const selectEnumMap = (state: AllState) => {
    return selectProductEnumState(state)?.productEnum;
}