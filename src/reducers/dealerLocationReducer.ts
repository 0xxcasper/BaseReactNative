import { RECEIVE_TEST_DRIVE_AVAIL_ACTION, ReceiveLocationTestDrive } from './../actionTypes/dealerLocationActionTypes';
import { DealerLocationStateType } from "../types/reducerStateTypes";
import { Map } from 'immutable';
import {
    DealerLocationActionTypes,
    ERROR_DEALER_LOCATION_LIST,
    ErrorDealerLocationListAction,
    REQUEST_DEALER_LOCATION_LIST,
    UPDATE_DEALER_LOCATION_LIST,
    UpdateDealerLocationListAction
} from "../actionTypes/dealerLocationActionTypes";
import { DealerLocation } from "../types/modelTypes";

const _initState: DealerLocationStateType = {
    dealerLocationMap: Map(),
    locationAvailMap: Map(),
    actionStatus: undefined,
    updateTime: 0,
    updateLocationAvailTime: 0
};

const _updateDealerLocations = (state: DealerLocationStateType, action: DealerLocationActionTypes): DealerLocationStateType => {
    const _action = action as UpdateDealerLocationListAction;
    const {
        dealerLocations
    } = _action;
    if (dealerLocations && dealerLocations.length > 0) {
        let _dealerLocationMap = Map<string, DealerLocation>()
        dealerLocations.forEach((_dealerLocation: DealerLocation) => {
            _dealerLocationMap = _dealerLocationMap.set(_dealerLocation.id + '', _dealerLocation);
        });
        state = {
            ...state,
            dealerLocationMap: _dealerLocationMap,
            updateTime: Date.now(),
            actionStatus: {
                action: action.type
            }
        }
    }
    return state;
};
const _errorDealerLocations = (state: DealerLocationStateType, action: DealerLocationActionTypes): DealerLocationStateType => {
    const _action = action as ErrorDealerLocationListAction;
    return {
        ...state,
        actionStatus: {
            action: _action.type,
            error: _action.error,
        }
    }
};
const _updateAvailLocationTestDrive = (state: DealerLocationStateType, action: DealerLocationActionTypes): DealerLocationStateType => {
    const _action = action as ReceiveLocationTestDrive;
    const {
        locations
    } = _action;
    if (locations && locations.length > 0) {
        let {
            locationAvailMap
        } = state;
        locationAvailMap = Map()
        locations.forEach((_dealerLocation: DealerLocation) => {
            locationAvailMap = locationAvailMap.set(_dealerLocation.id + '', _dealerLocation);
        });

        state = {
            ...state,
            locationAvailMap,
            updateLocationAvailTime: Date.now()
        }
    }
    return state;
};

export default (state = _initState, action: DealerLocationActionTypes): DealerLocationStateType => {
    switch (action.type) {
        case UPDATE_DEALER_LOCATION_LIST:
            return _updateDealerLocations(state, action);
        case REQUEST_DEALER_LOCATION_LIST:
            return {
                ...state,
                actionStatus: {
                    action: action.type,
                }
            };
        case ERROR_DEALER_LOCATION_LIST:
            return _errorDealerLocations(state, action);
        case RECEIVE_TEST_DRIVE_AVAIL_ACTION:
            return _updateAvailLocationTestDrive(state, action);

    }
    return state;
}
export const dealerLocationStateToJs = (state: DealerLocationStateType): any => {
    const {
        dealerLocationMap,
        updateTime,
        locationAvailMap,
        updateLocationAvailTime
    } = state;
    return {
        updateTime,
        updateLocationAvailTime,
        dealerLocationMap: dealerLocationMap.toObject(),
        locationAvailMap: locationAvailMap.toObject()
    }
};
export const dealerLocationStateFromJs = (state: any): DealerLocationStateType => {
    const {
        dealerLocationMap,
        updateTime,
        locationAvailMap,
        updateLocationAvailTime
    } = state;
    return {
        ...state,
        updateTime,
        updateLocationAvailTime,
        dealerLocationMap: Map(dealerLocationMap),
        locationAvailMap: Map(locationAvailMap)
    }
};
