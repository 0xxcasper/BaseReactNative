import { Map } from 'immutable';
import {TFSFinanceStateType} from './../types/reducerStateTypes';
import {
    FinanceActionTypes, GetTFSDetailFinance,
    RECEIVE_TFS_FINANCE,
    ReceiveTFSFinance, SET_TFS_DETAIL_FINANCE, SetTFSDetailFinance,
    UPDATE_TFS_FINANCE,
    UpdateTFSFinance
} from "../actionTypes/financeActionTypes";
import {TFSFinance, TFSInput} from "../types/modelTypes";

const _initState: {tfsFinanceMap: Map<String, TFSFinance>, tfsFinanceUpdate: TFSInput} = {
    tfsFinanceMap: Map(),
    tfsFinanceUpdate: {
        supplier: 'Toyota',
        grade_id: null,
        price: null,
        price_accessory: 0,
        finance: null,
        loan_period: null,
        rate: null,
        payment_period: null,
        amount_prepaid: null
    }
};

const receiveTFSFinanceState = (state: { tfsFinanceMap: Map<String, TFSFinance>; tfsFinanceUpdate: TFSInput }, action: FinanceActionTypes) => {
    const _actions = action as ReceiveTFSFinance
    const { tfsFinance } = _actions
    return {
        ...state,
        tfsFinanceMap: tfsFinance
    }
}

const updateTFSFinanceState = (state: { tfsFinanceMap: Map<String, TFSFinance>; tfsFinanceUpdate: TFSInput }, action: FinanceActionTypes) => {
    const _actions = action as UpdateTFSFinance
    const { tfsFinanceUpdate } = _actions
    const _financeUpdate = Object.assign(state.tfsFinanceUpdate, tfsFinanceUpdate)
    return {
        ...state,
        tfsFinanceUpdate: _financeUpdate
    }
}

const setTFSDetailState = (state: { tfsFinanceMap: Map<String, TFSFinance>; tfsFinanceUpdate: TFSInput }, action: FinanceActionTypes) => {
    const _actions = action as SetTFSDetailFinance
    const { tfsDetail } = _actions
    return {
        ...state,
        tfsDetail: tfsDetail
    }
}

export default (state = _initState, action: FinanceActionTypes) => {
    switch (action.type) {
        case RECEIVE_TFS_FINANCE:
            return receiveTFSFinanceState(state, action)
        case UPDATE_TFS_FINANCE:
            return updateTFSFinanceState(state, action)
        case SET_TFS_DETAIL_FINANCE:
            return setTFSDetailState(state, action)
        default:
    }
    return state;
}