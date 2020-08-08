import {AllState, AuthStateType} from "../types/reducerStateTypes";
import {CBErrorType} from "../types/errors";

const selectAuthState = (state: AllState): AuthStateType | null => {
    return state?.authState;
};
export const selectToken = (state: AllState): string | null | undefined => {
    return selectAuthState(state)?.token;
};
export const selectAuthPhoneNumber = (state: AllState): string | null | undefined => {
    return selectAuthState(state)?.phoneNumber;
};
export const selectAuthOtp = (state: AllState): string | null | undefined => {
    return selectAuthState(state)?.otp;
};
export const selectAuthUserName = (state: AllState): string | null | undefined => {
    return selectAuthState(state)?.userName;
};
export const selectAuthStatusAction = (state: AllState): string | null | undefined => {
    return selectAuthState(state)?.status?.action;
};
export const selectAuthError = (state: AllState): CBErrorType | null | undefined => {
    return selectAuthState(state)?.status?.error;
};
export const selectFirebaseDocId = (state: AllState): string | null | undefined => {
    return selectAuthState(state)?.firebaseDocId;
};
export const selectIsAuthenticated = (state: AllState): boolean => {
    return selectAuthState(state)?.authenticated || false;
};
export const selectDidShowIntroduce = (state: AllState): boolean => {
    return selectAuthState(state)?.didShowIntroduce || false;
};