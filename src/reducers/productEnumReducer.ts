import { Map } from 'immutable';
import {ProductEnumStateType} from './../types/reducerStateTypes';
import {
    ProductEnumActionTypes,
    RECEIVE_PRODUCT_ENUM,
    ReceiveProductEnum
} from "../actionTypes/productEnumActionTypes";

const _initState: ProductEnumStateType = {
    productEnum: Map()
};

const productEnumState = (state: ProductEnumStateType, action: ProductEnumActionTypes) => {
    const _action = action as ReceiveProductEnum
    const { productEnum } = _action
    return {
        ...state,
        productEnum: productEnum
    }
}

export default (state = _initState, action: ProductEnumActionTypes) => {
    switch (action.type) {
        case RECEIVE_PRODUCT_ENUM:
            return productEnumState(state, action);
        default:
    }
    return state;
}
