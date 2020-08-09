import {
    AllState,
    HomeStateType
} from "types/reducerStateTypes";

export const selectHomeState = (state: AllState): HomeStateType => {
    return state.homeState;
};