import { HomeStateType } from "types/reducerStateTypes";
import { Map, OrderedMap } from 'immutable';
import {
    HomeActionTypes, RECEIVE_HOME_BANNER, ReceiveHomeBannerAction,
} from "actionTypes/homeActionTypes";

const _initState: HomeStateType = {
    banners: []
};

export const _updateHomeBanner = (state: HomeStateType, action: HomeActionTypes): HomeStateType => {
    const _action       = action as ReceiveHomeBannerAction;
    const { banners }   = _action
    return {
        ...state,
        banners
    }
}

export default (state = _initState, action: HomeActionTypes): HomeStateType => {
    switch (action.type) {
        case RECEIVE_HOME_BANNER:
            return _updateHomeBanner(state, action);
    }
    return state;
}
