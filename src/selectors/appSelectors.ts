import {AllState, AppStateType} from "../types/reducerStateTypes";
import { _TEST_FCM_TOKEN } from "../common/config";

const selectAppState = (state: AllState): AppStateType => {
    return state?.appState;
};
export const selectFcmToken = (state: AllState): string | null | undefined => {
    return selectAppState(state)?.fcmToken;
    // return "4bb45e15db5aa2a965804ad62726fbf2019943627872f0636300b8003bb25e52"
};

export const selectEmailAnonymousToken = (state: AllState): string | null | undefined => {
    return selectAppState(state)?.emailAnonymous;
};

export const selectAppBadge = (state: AllState): number | null | undefined => {
    return selectAppState(state)?.applicationBadge;
};

export const selectAppLoading = (state: AllState): boolean => {
    return selectAppState(state)?.isLoading;
};

export const selectCurrentAppState = (state: AllState): string | null | undefined => {
    return selectAppState(state)?.currentAppState
    ;
};