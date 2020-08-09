import {AllState, AppStateType} from "types/reducerStateTypes";

const selectAppState = (state: AllState): AppStateType => {
    return state?.appState;
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