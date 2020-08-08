import { LatLongLocation, LocationModel } from './../types/modelTypes';
const PREFIX = 'GOOGLE_MAP_LOCATION/';
export const REQUEST_LOCATION_NEARLY = PREFIX + 'REQUEST_LOCATION_NEARLY';
export const RECEIVE_LOCATION_NEARLY = PREFIX + 'RECEIVE_LOCATION_NEARLY';
export const RECEIVE_CURRENT_LOCATION = PREFIX + 'REQUEST_USED_CAR_LIST';
export const UPDATE_FAVORITE_LOCATION = PREFIX + 'UPDATE_FAVORITE_LOCATION';
export const REQUEST_LOCATION_BY_SEARCH = PREFIX + 'REQUEST_LOCATION_BY_SEARCH';
export const UPDATE_SEARCH_KEY_MAKER = PREFIX + 'UPDATE_SEARCH_KEY_MAKER';
export const CLEAR_DATA_GOOGLE_MAP_SEARCH = PREFIX + 'CLEAR_DATA_GOOGLE_MAP_SEARCH';
export const UPDATE_END_LOCATION_GOOGLE_MAP_DIRECTION = PREFIX + 'UPDATE_END_LOCATION_GOOGLE_MAP_DIRECTION';
export const UPDATE_RADIUS = PREFIX + 'UPDATE_RADIUS';
export const UPDATE_TRAFFIC_STATE = PREFIX + 'UPDATE_TRAFFIC_STATE';
export const UPDATE_FIXED_ADDRESS = PREFIX + 'UPDATE_FIXED_ADDRESS';

export interface RequestLocationNearly {
    type: typeof REQUEST_LOCATION_NEARLY,
    typeSearch: string,
    radius: number | null
}

export interface ReceiveLocationNearly {
    type: typeof RECEIVE_LOCATION_NEARLY,
    typeSearch: string,
    locations: LocationModel[] | null | undefined
}

export interface ReceiveCurrentLocation {
    type: typeof RECEIVE_CURRENT_LOCATION,
    location: LatLongLocation
}

export interface UpdateFavoriteLocation {
    type: typeof UPDATE_FAVORITE_LOCATION,
    location: LocationModel
}

export interface RequestLocationBySearch {
    type: typeof REQUEST_LOCATION_BY_SEARCH,
    searchText: string | null | undefined
}

export interface UpdateSearchKeyMarker {
    type: typeof UPDATE_SEARCH_KEY_MAKER,
    searchKey: string
}

export interface UpdateEndLocationGoogleMapDirection {
    type: typeof UPDATE_END_LOCATION_GOOGLE_MAP_DIRECTION,
    endLocation: LocationModel
}

export interface UpdateRadius {
    type: typeof UPDATE_RADIUS,
    radius: number
}

export interface UpdateTrafficState {
    type: typeof UPDATE_TRAFFIC_STATE,
    isShowTraffic: boolean
}

export interface UpdateFixedAddress {
    type: typeof UPDATE_FIXED_ADDRESS,
    location: LocationModel, 
    typeAddress: any
}



export type MapActionTypes = RequestLocationNearly
    | ReceiveCurrentLocation
    | ReceiveLocationNearly
    | UpdateFavoriteLocation
    | RequestLocationBySearch
    | UpdateSearchKeyMarker
    | UpdateEndLocationGoogleMapDirection
    | UpdateRadius
    | UpdateTrafficState
    | UpdateFixedAddress;