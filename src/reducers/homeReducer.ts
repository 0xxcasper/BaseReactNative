import { HomeStateType } from "types/reducerStateTypes";
import { Map, OrderedMap } from 'immutable';
import {
    HomeActionTypes,
} from "actionTypes/homeActionTypes";

const _initState: HomeStateType = {};

export default (state = _initState, action: HomeActionTypes): HomeStateType => {
    switch (action.type) {
    }
    return state;
}
