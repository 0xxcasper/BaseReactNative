import { Promotion } from './../types/modelTypes';
import { Map, Set } from 'immutable';
import { PromotionActionTypes, RECEIVE_PROMOTIONS, UpdatePromotionsAction, RESET_PROMOTIONS } from './../actionTypes/PromotionsActionTypes';
import { PromotionStateType } from './../types/reducerStateTypes';

const _initState: PromotionStateType = {
    promotionMap: Map(),
};
const _updatePromotions = (state: PromotionStateType, action: PromotionActionTypes): PromotionStateType => {
    const _action = action as UpdatePromotionsAction;
    const {
        promotions
    } = _action;

    if (promotions) {
        let {
            promotionMap,
        } = state;

        var _promotionMap = Map<string, Promotion>()

        promotions.forEach((_promotion: any) => {
            _promotionMap = _promotionMap.set(_promotion.id + '', _promotion);
        })
        state = {
            ...state,
            promotionMap: _promotionMap,
        }
    }
    return state;
};


const _resetPromotions = (state: PromotionStateType, action: PromotionActionTypes): PromotionStateType => {
    return {
        ...state,
        promotionMap: Map(),
    };
};

export default (state = _initState, action: PromotionActionTypes): PromotionStateType => {
    switch (action.type) {
        case RECEIVE_PROMOTIONS:
            return _updatePromotions(state, action);
        case RESET_PROMOTIONS:
            return _resetPromotions(state, action);
        default:
    }
    return state;
}
