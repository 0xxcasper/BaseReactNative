import {AccountStateType, AllState} from "types/reducerStateTypes";

export const selectAccountState = (state: AllState): AccountStateType => {
    return state?.accountState;
};