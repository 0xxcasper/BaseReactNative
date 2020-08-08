import { LocationModel } from './../types/modelTypes';
import { LatLongLocation } from '../types/modelTypes';
import { AllState } from "../types/reducerStateTypes";
import { MapStateType } from './../types/reducerStateTypes';
import { Map } from 'immutable';

const selectMapState = (state: AllState): MapStateType => {
    return state.mapState;
};

export const selectCurrentLocation = (state: AllState): LatLongLocation | null | undefined => {
    return selectMapState(state)?.currentLocation;
};

export const selectLocationNearlyMap = (state: AllState): Map<string, LocationModel[]> | null | undefined => {
    return selectMapState(state)?.locationsNearlyMap;
};

export const selectFavoriteListMap = (state: AllState): Map<string, LocationModel> | null | undefined => {
    return selectMapState(state)?.favoriteLocationsList;
};

export const selectSearchKeyMarker = (state: AllState): string | null | undefined => {
    return selectMapState(state)?.searchKeyMarker;
};

export const selectEndLocationDirection = (state: AllState): LocationModel | null | undefined => {
    return selectMapState(state)?.endLocationDirection;
};

export const selectRadius = (state: AllState): number => {
    return selectMapState(state)?.radius;
};

export const selectIsShowTraffic = (state: AllState): boolean => {
    return selectMapState(state)?.showTraffic;
};

export const selectHomeAddress = (state: AllState): LocationModel | null | undefined => {
    return selectMapState(state)?.homeAddress;
};

export const selectCompanyAddress = (state: AllState): LocationModel | null | undefined => {
    return selectMapState(state)?.companyAddress;
};