import {AllState, DealerLocationStateType} from "../types/reducerStateTypes";
import {Map} from 'immutable';
import {DealerLocation} from "../types/modelTypes";

const selectDealerLocationState = (state: AllState): DealerLocationStateType | null => {
    return state?.dealerLocationState;
};
export const selectDealerLocationMap = (state: AllState): Map<string, DealerLocation> | null | undefined => {
    return selectDealerLocationState(state)?.dealerLocationMap;
};

export const selectDealerLocationLastUpdateTime = (state: AllState): number => {
    return selectDealerLocationState(state)?.updateTime || 0;
};

export const selectLocationTestDriveLastUpdateTime = (state: AllState): number => {
    return selectDealerLocationState(state)?.updateLocationAvailTime || 0;
};

export const selectLocationAvailTestDriveMap = (state: AllState): Map<string, DealerLocation> | null | undefined => {
    return selectDealerLocationState(state)?.locationAvailMap;
};
