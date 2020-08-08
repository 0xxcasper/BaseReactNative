import { Map } from 'immutable';
import _ from 'lodash';
import {
    CarCompareActionTypes,
    ReceiveCarCompareAction,
    ReceiveChooseCarCompare,
    ReceiveSuggestionCompare,
    ReceiveSuggestionCompareMerge,
    RECEIVE_CAR_COMPARE,
    RECEIVE_CHOOSE_CAR_COMPARE,
    RECEIVE_SUGGESTION_CAR_COMPARE,
    RECEIVE_SUGGESTION_CAR_COMPARE_MERGE,
    CLEAR_CAR_COMPARE_SELECTED,
    MERGE_CAR_COMPARE_FROM_BASE_TO_DISPLAY
} from './../actionTypes/carCompareActionTypes';
import { isBlank } from './../helpers';
import { CarCompareModel, CarCompareSuggestionModel, ListIdCompareModel } from './../types/newCarModelTypes';
import { CarCompareStateType } from './../types/reducerStateTypes';

const _initState: CarCompareStateType = {
    carCompareMap: Map<string, CarCompareModel>(),
    suggestListMap: Map<string, CarCompareSuggestionModel>(),
    carCompareIdsDisplay: [],
    carCompareIdsBase: [],
    firstCarCompareChoose: null,
    secondCarCompareChoose: null,
    listIdsCompare: [],
    carsOverViewShowing: [],
    carsFeaturesShowing: []
};

const _updateCarCompareList = (state: CarCompareStateType, action: CarCompareActionTypes): CarCompareStateType => {
    const _action = action as ReceiveCarCompareAction;
    const {
        carsCompare,
        overView,
        features
    } = _action;

    
    if (carsCompare && carsCompare.length > 0) {
        let {
            carCompareMap
        } = state
        carsCompare.forEach((item: CarCompareModel) => {
            carCompareMap = carCompareMap.set(item.id + '', item)
        })
        state = {
            ...state,
            carCompareMap,
            carsOverViewShowing: overView,
            carsFeaturesShowing: features
        }
    }
    return state;
};

const _updateSuggestionCarCompareList = (state: CarCompareStateType, action: CarCompareActionTypes): CarCompareStateType => {
    const _action = action as ReceiveSuggestionCompare;
    const {
        suggestList,
    } = _action;

    if (suggestList && suggestList.length > 0) {
        let {
            suggestListMap,
        } = state

        let _listId: ListIdCompareModel[] = []
        suggestList.forEach((items: CarCompareSuggestionModel[]) => {
            if (items && items.length === 2) {
                _listId?.push({
                    firstValue: items[0].id + '',
                    secondValue: items[1].id + ''
                })
                suggestListMap = suggestListMap.set(items[0].id + '', items[0])
                suggestListMap = suggestListMap.set(items[1].id + '', items[1])
            }
        })
        state = {
            ...state,
            suggestListMap,
            carCompareIdsDisplay: _.cloneDeep(_listId),
            carCompareIdsBase: _.cloneDeep(_listId)
        }
    }
    return state;
};

const _chooseCarCompare = (state: CarCompareStateType, action: CarCompareActionTypes): CarCompareStateType => {
    const _action = action as ReceiveChooseCarCompare;
    const {
        carInfo,
        isFirst
    } = _action;
    if (carInfo) {
        const {
            firstCarCompareChoose,
            secondCarCompareChoose,
        } = state
        state = {
            ...state,
            firstCarCompareChoose: isFirst ? carInfo : firstCarCompareChoose,
            secondCarCompareChoose: isFirst ? secondCarCompareChoose : carInfo,
        }
    }
    return state;
};

const _updateSuggestionCarCompareListMerge = (state: CarCompareStateType, action: CarCompareActionTypes): CarCompareStateType => {
    const _action = action as ReceiveSuggestionCompareMerge;
    const {
        suggestList,
        carId
    } = _action;

    if (suggestList && suggestList.length > 0 && !isBlank(carId)) {
        let {
            suggestListMap,
        } = state

        let _listId: ListIdCompareModel[] = []
        suggestList.forEach((items: CarCompareSuggestionModel[]) => {
            if (items && items.length == 1) {
                _listId?.push({
                    firstValue: carId + '',
                    secondValue: items[0].id + ''
                })
                suggestListMap = suggestListMap.set(items[0].id + '', items[0])
            }
        })
        state = {
            ...state,
            suggestListMap,
            carCompareIdsDisplay: _.cloneDeep(_listId),
        }
    }
    return state;
};

const _mergeCarCompareFromDisplayToBase = (state: CarCompareStateType, action: CarCompareActionTypes): CarCompareStateType => {
    const {
        carCompareIdsBase
    } = state
    return {
        ...state,
        carCompareIdsDisplay: _.cloneDeep(carCompareIdsBase || [])
    };
};

const _clearCarCompareSelected = (state: CarCompareStateType, action: CarCompareActionTypes): CarCompareStateType => {
    return {
        ...state,
        firstCarCompareChoose: null,
        secondCarCompareChoose: null,
    };
};

export default (state = _initState, action: CarCompareActionTypes): CarCompareStateType => {
    switch (action.type) {
        case RECEIVE_CAR_COMPARE:
            return _updateCarCompareList(state, action);
        case RECEIVE_SUGGESTION_CAR_COMPARE:
            return _updateSuggestionCarCompareList(state, action);
        case RECEIVE_SUGGESTION_CAR_COMPARE_MERGE:
            return _updateSuggestionCarCompareListMerge(state, action);
        case RECEIVE_CHOOSE_CAR_COMPARE:
            return _chooseCarCompare(state, action);
        case MERGE_CAR_COMPARE_FROM_BASE_TO_DISPLAY:
            return _mergeCarCompareFromDisplayToBase(state, action);
        case CLEAR_CAR_COMPARE_SELECTED:
            return _clearCarCompareSelected(state, action);
        default:
    }
    return state;
}

export const carCompareStateToJs = (state: CarCompareStateType): any => {
    const {
        carCompareMap,
        suggestListMap,
        carCompareIdsDisplay,
        carCompareIdsBase,
        firstCarCompareChoose,
        secondCarCompareChoose,
        listIdsCompare,
        carsOverViewShowing,
        carsFeaturesShowing
        } = state;
    return {
        carCompareMap: Map(carCompareMap),
        suggestListMap: Map(suggestListMap),
        carCompareIdsDisplay,
        firstCarCompareChoose,
        carCompareIdsBase,
        secondCarCompareChoose,
        listIdsCompare,
        carsOverViewShowing,
        carsFeaturesShowing
    }
};

export const carCompareStateFromJs = (state: any): CarCompareStateType => {
    const {
        carCompareMap,
        suggestListMap,
        carCompareIdsDisplay,
        carCompareIdsBase,
    } = state;
    return {
        carCompareMap: Map(carCompareMap),
        suggestListMap: Map(suggestListMap),
        carCompareIdsDisplay,
        carCompareIdsBase,
        firstCarCompareChoose: null,
        secondCarCompareChoose: null,
        listIdsCompare: [],
        carsOverViewShowing: null,
        carsFeaturesShowing: []
    }
};
