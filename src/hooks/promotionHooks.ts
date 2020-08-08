import { useState, useEffect } from 'react';
import { Promotion } from './../types/modelTypes';
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../actions";
import { REQUEST_PROMOTIONS, RESET_PROMOTIONS } from '../actionTypes/PromotionsActionTypes';
import { selectPromotionMap } from './../selectors/promotionSeclecter';
import { Map } from 'immutable';
import _ from 'lodash'
import { PROMOTION_TYPE, PROMOTION_REFRESH_KEY } from '../common/const';

export const usePromotionMap = (): Map<string, Promotion> => {
    return useSelector(selectPromotionMap);
};

export const useResetPromotion = () => {
    const dispatch = useDispatch();
    dispatch(createAction(RESET_PROMOTIONS));
};

export const usePromotionGift = (): Promotion[] | undefined => {
    const _promotion = useSelector(selectPromotionMap);
    if (_promotion && !_.isEmpty(_promotion)) {
        return _promotion.toIndexedSeq().toArray().filter((value) => {
            return value.type !== PROMOTION_TYPE.VOUCHER
        });
    }
    return []
};

export const usePromotionVoucher = (): Promotion[] | undefined => {
    const _promotion = useSelector(selectPromotionMap);
    if (_promotion) {
        return _promotion.toIndexedSeq().toArray().filter((value) => {
            return value.type === PROMOTION_TYPE.VOUCHER
        });
    }
    return []
};

export const usePromotionId = (promotionId: string): Promotion | undefined => {
    const _promotion = useSelector(selectPromotionMap);
    return _promotion.get(promotionId || '');
};
