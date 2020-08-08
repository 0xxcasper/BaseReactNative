import { Map, Set } from 'immutable';
import {
    CostEstimateActionTypes,
    RECEIVE_COST_ESTIMATE_LOCATIONS,
    RECEIVE_PROVINCES,
    RECEIVE_COST_ESTIMATE,
    RECEIVE_CALCULATE_COST_ESTIMATE,
    ReceiveLocations,
    ReceiveProvinces,
    ReceiveCostEstimateInput,
    ReceiveCalculateCostEstimate
} from './../actionTypes/costEstimateActionTypes';
import { CostEstimateStateType } from './../types/reducerStateTypes';

const _initState: CostEstimateStateType = {
    locationMap: Map(),
    provinceMap: Map(),
    costEstimate: {
        grade_id: null,
        province_id: null,
        customer_type: "INDIVIDUAL",
        accessoryPrice: 0,
        trans_bussiness: false,
        road_tax_period_id: null
    },
    calculateCostEstimate: {
        colors: [],
        fees: [],
        name: null,
        slug: null,
        totalFee: 0
    }
};

const locationState = (state: CostEstimateStateType, action: CostEstimateActionTypes) => {
    const _action = action as ReceiveLocations
    const { locations } = _action
    return {
        ...state,
        locationMap: locations
    }
}

const provinceState = (state: CostEstimateStateType, action: CostEstimateActionTypes) => {
    const _action = action as ReceiveProvinces
    const { provinces } = _action
    return {
        ...state,
        provinceMap: provinces
    }
}

const costEstimateState = (state: CostEstimateStateType, action: CostEstimateActionTypes) => {
    const _action = action as ReceiveCostEstimateInput
    const { costEstimate } = _action
    const _costEstimateUpdate = Object.assign(state.costEstimate, costEstimate)
    return {
        ...state,
        costEstimate: _costEstimateUpdate
    }
}

const calculateCostEstimate = (state: CostEstimateStateType, action: CostEstimateActionTypes) => {
    const _action = action as ReceiveCalculateCostEstimate
    const {costEstimate} = _action
    return {
        ...state,
        calculateCostEstimate: costEstimate
    };
}

export default (state = _initState, action: CostEstimateActionTypes) => {
    switch (action.type) {
        case RECEIVE_COST_ESTIMATE_LOCATIONS:
            return locationState(state, action);
        case RECEIVE_PROVINCES:
            return provinceState(state, action);
        case RECEIVE_COST_ESTIMATE:
            return costEstimateState(state, action);
        case RECEIVE_CALCULATE_COST_ESTIMATE:
            return calculateCostEstimate(state, action);
        default:
    }
    return state;
}
