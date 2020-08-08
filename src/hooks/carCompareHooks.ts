import { CarCompareBuilder } from './../builders';
import { Feature, Overview, CarCompareSuggestionModel, ListIdCompareModel } from './../types/newCarModelTypes';
import { Map } from 'immutable';
import { useSelector } from "react-redux";
import { CarCompareModel } from '../types/newCarModelTypes';
import { selectCarCompareMap, selectSuggestCarCompareMap, selectListIdsCompareSuggestion, selectFirstCarSelected, selectSecondCarSelected, selectCarCompareSuggestionIdsBase, selectCarCompareShowing, selectCarsOverViewShowing, selectCarsFeaturesShowing } from './../selectors/carCompareSelectors';
import _ from 'lodash';
import { useRef, useEffect } from 'react';

export const useCarCompareMap = (): Map<string, CarCompareModel> => {
    return useSelector(selectCarCompareMap);
};

export const useCarCompareId = (carId: string): CarCompareModel | null | undefined => {
    return useCarCompareMap().get(carId + '');
};

export const useIsHaveCarCompare = (firstCarId: string, secondCarId: string): boolean => {
    const _firstCar = useCarCompareMap().get(firstCarId + '')
    const _secondCar = useCarCompareMap().get(secondCarId + '')
    if (!_firstCar || !_secondCar) return false;
    return true
};

export const useCarCompareFeaturesId = (carId: string): Feature[] | null | undefined => {
    const _useCarCompareId = useCarCompareId(carId)
    if (!_useCarCompareId) return null
    return _useCarCompareId.features;
};

export const useCarCompareOverViewId = (carId: string): Overview[] | null | undefined => {
    const _useCarCompareId = useCarCompareId(carId)
    if (!_useCarCompareId) return null
    return _useCarCompareId.overview;
};

export const useMapFeatures = (firstCarId: string, secondCarId: string): any | null | undefined => {
    const isFirstRender = useRef(true)
    const firstCar = useCarCompareFeaturesId(firstCarId)
    const secondCar = useCarCompareFeaturesId(secondCarId)

    // useEffect(() => {
    //     if (isFirstRender.current) {
    //         isFirstRender.current = false
    //         return
    //     }
    // })

    
    if (!firstCar || !secondCar) {
        return null
    }
    return CarCompareBuilder.fromTwoCarGetFeatures(firstCar, secondCar)
};

export const useMapOverView = (firstCarId: string, secondCarId: string): any | null | undefined => {
    // const firstCar = useCarCompareOverViewId(firstCarId)
    // const secondCar = useCarCompareOverViewId(secondCarId)
    // if(!firstCar || !secondCar) {
    //     return null
    // }
    // return CarCompareBuilder.fromTwoCarOverView(firstCar, secondCar)
    return null
};

export const useSuggestionMap = (): Map<string, CarCompareSuggestionModel> | null | undefined => {
    return useSelector(selectSuggestCarCompareMap);
};

export const useSuggestionId = (carId: string): CarCompareSuggestionModel | null | undefined => {
    return useSuggestionMap()?.get(carId);
};

export const useSuggestionListIds = (): ListIdCompareModel[] | null => {
    return useSelector(selectListIdsCompareSuggestion)
};

export const useSuggestionListIdsBase = (): ListIdCompareModel[] | null => {
    return useSelector(selectCarCompareSuggestionIdsBase)
};

export const useFirstCarSelected = (): CarCompareSuggestionModel | null | undefined => {
    return useSelector(selectFirstCarSelected)
};

export const useSecondCarSelected = (): CarCompareSuggestionModel | null | undefined => {
    return useSelector(selectSecondCarSelected)
};

export const useIsHaveTwoCarSelected = (): Boolean => {
    const _firstCar = useFirstCarSelected()
    const _secondCar = useSecondCarSelected()
    if (!_firstCar || !_secondCar) return false;
    return true
};


export const useCarsCompareShowingFeatures = (): any | null | undefined => {
    const _result = useSelector(selectCarsFeaturesShowing)
    return _result
};

export const useCarsCompareShowingOverView = (): any | null | undefined => {
    
    const _result = useSelector(selectCarsOverViewShowing)
    return _result
};