import {AllState, AuthStateType} from "types/reducerStateTypes";

export const selectAuthState = (state: AllState): AuthStateType | null => {
    return state?.authState;
};