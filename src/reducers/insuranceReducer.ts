import { Map } from 'immutable';
import {InsuranceRate} from "../types/modelTypes";
import {InsuranceActionTypes, RECEIVE_INSURANCE_RATE, ReceiveInsuranceRate} from "../actionTypes/insuranceActionTypes";

const _initState: {insuranceRateMap: Map<string, InsuranceRate>} = {
    insuranceRateMap: Map()
};

const receiveInsuranceRateState = (state: {insuranceRateMap: Map<string, InsuranceRate>}, action: InsuranceActionTypes) => {
    const _action = action as ReceiveInsuranceRate
    const { insuranceRate } = _action
    return {
        ...state,
        insuranceRateMap: insuranceRate
    }
}

export default (state = _initState, action: InsuranceActionTypes) => {
    switch (action.type) {
        case RECEIVE_INSURANCE_RATE:
            return receiveInsuranceRateState(state, action)
        default:
    }
    return state;
}