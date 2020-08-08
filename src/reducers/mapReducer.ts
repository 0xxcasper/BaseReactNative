import { GoogleMapBuilder } from './../builders';
import { isBlank, getDistanceFromLatLonInKm, estimateTimeTwoLocation } from './../helpers';
import { LocationModel } from './../types/modelTypes';
import { Map } from 'immutable';
import { MapActionTypes, ReceiveCurrentLocation, RECEIVE_CURRENT_LOCATION, RECEIVE_LOCATION_NEARLY, ReceiveLocationNearly, UPDATE_FAVORITE_LOCATION, UpdateFavoriteLocation, UPDATE_SEARCH_KEY_MAKER, UpdateSearchKeyMarker, CLEAR_DATA_GOOGLE_MAP_SEARCH, UPDATE_END_LOCATION_GOOGLE_MAP_DIRECTION, UPDATE_RADIUS, UPDATE_TRAFFIC_STATE, UpdateRadius, UpdateTrafficState, UPDATE_FIXED_ADDRESS, UpdateFixedAddress } from './../actionTypes/mapActionTypes';
import { MapStateType } from './../types/reducerStateTypes';
import _ from 'lodash';
import { UpdateEndLocationGoogleMapDirection } from '../actionTypes/mapActionTypes';
import { TYPE_FIXED_ADDRESS } from '../common/const';

const _initRadius = 1
const _initState: MapStateType = {
    currentLocation: null,
    locationsNearlyMap: Map<string, LocationModel[]>(),
    favoriteLocationsList: Map<string, LocationModel>(),
    searchKeyMarker: null,
    endLocationDirection: null,
    showTraffic: true,
    radius: _initRadius,
    homeAddress: null,
    companyAddress: null,
};

const _receiveCurrentLocation = (state: MapStateType, action: MapActionTypes): MapStateType => {
    const _action = action as ReceiveCurrentLocation;
    const {
        location
    } = _action
    return {
        ...state,
        currentLocation: Object.assign(location, {
            latitudeDelta: 0.0,
            longitudeDelta: 0.1
        })
    }
};

const _receiveLocationFromApi = (state: MapStateType, action: MapActionTypes): MapStateType => {
    const _action = action as ReceiveLocationNearly;
    const {
        typeSearch,
        locations,
    } = _action
    let {
        locationsNearlyMap,
        currentLocation
    } = state
    if (locations && locations.length > 0 && !isBlank(typeSearch) && currentLocation) {
        let _locations = _.cloneDeep(locations)
        _locations = _locations.map((_location) => {
            return GoogleMapBuilder.fromApi(_location, currentLocation);
        })
        locationsNearlyMap = locationsNearlyMap.set(typeSearch, _locations)
    }
    return {
        ...state,
        locationsNearlyMap
    }
};

const _updateFavoriteLocation = (state: MapStateType, action: MapActionTypes): MapStateType => {
    const _action = action as UpdateFavoriteLocation;
    const {
        location
    } = _action
    let {
        favoriteLocationsList
    } = state

    if (location) {
        const { place_id } = location
        const _value = favoriteLocationsList.get(place_id + '')
        if (_value) {
            favoriteLocationsList = favoriteLocationsList.delete(place_id + '')
        } else {
            favoriteLocationsList = favoriteLocationsList.set(place_id + '', location)
        }
    }
    return {
        ...state,
        favoriteLocationsList
    }
};

const _updateSearchKeyMarker = (state: MapStateType, action: MapActionTypes): MapStateType => {
    const _action = action as UpdateSearchKeyMarker;
    const {
        searchKey
    } = _action
    return {
        ...state,
        searchKeyMarker: searchKey
    }
};

const _clearDataGoogleMapSearch = (state: MapStateType, action: MapActionTypes): MapStateType => {
    return {
        ...state,
        searchKeyMarker: null,
        endLocationDirection: null,
        showTraffic: true,
        radius: _initRadius
    }
};

const _updateEndLocationMapDirection = (state: MapStateType, action: MapActionTypes): MapStateType => {
    const _action = action as UpdateEndLocationGoogleMapDirection
    const {
        endLocation
    } = _action
    return {
        ...state,
        endLocationDirection: endLocation
    }
};

const _updateRadius = (state: MapStateType, action: MapActionTypes): MapStateType => {
    const _action = action as UpdateRadius
    const {
        radius
    } = _action
    return {
        ...state,
        radius
    }
};

const _updateTrafficState = (state: MapStateType, action: MapActionTypes): MapStateType => {
    const _action = action as UpdateTrafficState
    const {
        isShowTraffic
    } = _action
    return {
        ...state,
        showTraffic: isShowTraffic
    }
};

const _updateFixedAddress = (state: MapStateType, action: MapActionTypes): MapStateType => {
    const _action = action as UpdateFixedAddress
    const {
        location,
        typeAddress
    } = _action

    let {
        companyAddress,
        homeAddress,
        favoriteLocationsList
    } = state

    if (typeAddress && location) {
        const { keyItem } = typeAddress
        const { place_id } = location
        switch (keyItem.toLowerCase()) {
            case TYPE_FIXED_ADDRESS.HOME:
                homeAddress = location
                break;
            case TYPE_FIXED_ADDRESS.COMPANY:
                companyAddress = location
                break;
            default:
                favoriteLocationsList = favoriteLocationsList.set(place_id + '', location)
                break;
        }
    }

    return {
        ...state,
        favoriteLocationsList,
        companyAddress,
        homeAddress,
    }
};

export default (state = _initState, action: MapActionTypes): MapStateType => {
    switch (action.type) {
        case RECEIVE_CURRENT_LOCATION:
            return _receiveCurrentLocation(state, action);
        case RECEIVE_LOCATION_NEARLY:
            return _receiveLocationFromApi(state, action);
        case UPDATE_FAVORITE_LOCATION:
            return _updateFavoriteLocation(state, action);
        case UPDATE_SEARCH_KEY_MAKER:
            return _updateSearchKeyMarker(state, action);
        case CLEAR_DATA_GOOGLE_MAP_SEARCH:
            return _clearDataGoogleMapSearch(state, action);
        case UPDATE_END_LOCATION_GOOGLE_MAP_DIRECTION:
            return _updateEndLocationMapDirection(state, action);
        case UPDATE_RADIUS:
            return _updateRadius(state, action);
        case UPDATE_TRAFFIC_STATE:
            return _updateTrafficState(state, action);
        case UPDATE_FIXED_ADDRESS:
            return _updateFixedAddress(state, action);
        default:
    }
    return state;
}

export const mapStateToJs = (state: MapStateType): any => {
    const {
        currentLocation,
        locationsNearlyMap,
        favoriteLocationsList,
        searchKeyMarker,
        endLocationDirection,
        showTraffic,
        radius,
        homeAddress,
        companyAddress,
    } = state;
    return {
        currentLocation,
        locationsNearlyMap: locationsNearlyMap.toObject(),
        favoriteLocationsList: favoriteLocationsList.toObject(),
        searchKeyMarker,
        endLocationDirection,
        showTraffic,
        radius,
        homeAddress,
        companyAddress,
    }
};

export const mapStateFromJs = (state: any): MapStateType => {
    const {
        favoriteLocationsList,
        homeAddress,
        companyAddress,
    } = state;
    return {
        currentLocation: null,
        locationsNearlyMap: Map(),
        favoriteLocationsList: Map(favoriteLocationsList),
        searchKeyMarker: null,
        endLocationDirection: null,
        showTraffic: true,
        radius: _initRadius,
        homeAddress,
        companyAddress,
    }
};
