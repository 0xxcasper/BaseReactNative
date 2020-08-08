import {
    CostEstimateUsedCarActionTypes,
    RECEIVE_ONSALE_GRADES,
    RECEIVE_PLATE_TYPES, RECEIVE_QUALITYS,
    ReceiveOnSaleGrades,
    ReceivePlateTypes, ReceiveQualitys, RESET_COST_ESTIMATE, UPDATE_COST_ESTIMATE, UpdateCostEstimate
} from "../actionTypes/costEstimateUsedCarActionTypes";
import {UsedCarCostEstimateStateType} from "../types/reducerStateTypes";
import _ from 'lodash';

const _initState: { plateTypes: any[]; onSaleGrades: any[]; qualitys: any[]; usedCarCostEstimate: any } = {
    plateTypes: [],
    onSaleGrades: [],
    qualitys: [],
    usedCarCostEstimate: {
        image: null,
        grade_group_name: null,
        launching_date: null,
        index_plate_type_id: null,
        km_used: null,
        color: null,
        index_quality_id: null
    }
}
export default (state = _initState, action: CostEstimateUsedCarActionTypes): UsedCarCostEstimateStateType => {
    switch (action.type) {
        case RECEIVE_PLATE_TYPES:
            return plateTypeState(state, action)
        case RECEIVE_ONSALE_GRADES:
            return onSaleGradeState(state, action)
        case RECEIVE_QUALITYS:
            return qualityState(state, action)
        case UPDATE_COST_ESTIMATE:
            return updateCostEstimateState(state, action)
        case RESET_COST_ESTIMATE:
            return resetCostEstimateState(state)
    }
    return state
}

export const plateTypeState = (state: any, action: CostEstimateUsedCarActionTypes) => {
    const _action = action as ReceivePlateTypes
    return {
        ...state,
        plateTypes: _action.plateTypes
    }
}

export const onSaleGradeState = (state: any, action: CostEstimateUsedCarActionTypes) => {
    const _action = action as ReceiveOnSaleGrades
    return {
        ...state,
        onSaleGrades: _action.onSaleGrades
    }
}

export const qualityState = (state: any, action: CostEstimateUsedCarActionTypes) => {
    const _action = action as ReceiveQualitys
    return {
        ...state,
        qualitys: _action.qualitys
    }
}

export const updateCostEstimateState = (state: any, action: CostEstimateUsedCarActionTypes) => {
    const _action = action as UpdateCostEstimate
    const _mergeOject = Object.assign(state.usedCarCostEstimate, _action.costEstimate)
    return {
        ...state,
        usedCarCostEstimate: _mergeOject
    }
}

export const resetCostEstimateState = (state: any) => {
    return {
        ...state,
        usedCarCostEstimate: initUsedCarCostEstimate()
    }
}

const initUsedCarCostEstimate = () => {
    return {
        image: null,
        grade_group_name: null,
        launching_date: null,
        index_plate_type_id: null,
        km_used: null,
        color: null,
        index_quality_id: null
    }
}