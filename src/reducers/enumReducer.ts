import { SET_CAR_FILTER_ENUM, SetEnumFilterCarAction } from './../actionTypes/enumActionTypes';
import { Map } from 'immutable';
import { EnumActionTypes, SetCarInsuranceProviderAction, SetCarInsuranceTypesAction, SET_CAR_INSURANCE_PROVIDERS, SET_CAR_INSURANCE_TYPES } from "../actionTypes/enumActionTypes";
import labels from "../i18n/labels";
import { EnumEntry } from "../types/modelTypes";
import { EnumStateType } from "../types/reducerStateTypes";

const _initState: EnumStateType = {
    carRelationshipMap: Map([['OWNER', {
        value: 'OWNER',
        label: labels.car_owner,
        sortValue: 0,
    }], ['DRIVER', {
        value: 'DRIVER',
        label: labels.car_driver,
        sortValue: 1,
    }], ['RELATED', {
        value: 'RELATED',
        label: labels.car_related,
        sortValue: 2,
    }]]),
    genderMap: Map([['MALE', {
        value: 'MALE',
        label: labels.man,
        sortValue: 0,
    }], ['FEMALE', {
        value: 'FEMALE',
        label: labels.women,
        sortValue: 1,
    }]]),
    filterPriceMap: Map([['duoi-500-trieu', {
        label: 'Dưới 500 triệu',
        priceFrom: 0,
        priceTo: 500000000,
        value: 'duoi-500-trieu',
        sortValue: 0
    }], ['500-trieu-1-ty', {
        label: '500 triệu - 1 tỷ',
        priceFrom: Math.pow(10, 8) * 5,
        priceTo: Math.pow(10, 9),
        value: '500-trieu-1-ty',
        sortValue: 1
    }], ['1-ty-2-ty', {
        label: '1 tỷ - 2 tỷ',
        priceFrom: Math.pow(10, 9),
        priceTo: Math.pow(10, 9) * 2,
        value: '1-ty-2-ty',
        sortValue: 2
    }], ['2-ty-3-ty', {
        label: '2 tỷ - 3 tỷ',
        priceFrom: Math.pow(10, 9) * 2,
        priceTo: Math.pow(10, 9) * 3,
        value: '2-ty-3-ty',
        sortValue: 3
    }], ['tren-3-ty', {
        label: 'trên 3 tỷ',
        priceFrom: Math.pow(10, 9) * 3,
        priceTo: Math.pow(10, 9) * 20,
        value: 'tren-3-ty',
        sortValue: 4
    }]]),
    carInsuranceTypeMap: Map(),
    carInsuranceProviderMap: Map(),
    carModelsFilter: Map(),
    fuelTypesFilter: Map(),
    seatsTypesFilter: Map(),
    sourcesTypesFilter: Map(),
    typesCarFilter: Map(),
    updateFilterTime: 0
};

const _setCarInsuranceTypes = (state: EnumStateType, action: EnumActionTypes): EnumStateType => {
    const _action: SetCarInsuranceTypesAction = action as SetCarInsuranceTypesAction;
    const {
        carInsurances
    } = _action;
    if (carInsurances) {
        let {
            carInsuranceTypeMap
        } = state;
        carInsurances.forEach(_tempInsurance => {
            carInsuranceTypeMap = carInsuranceTypeMap.set(_tempInsurance.value, _tempInsurance);
        });
        return {
            ...state,
            carInsuranceTypeMap
        }
    }
    return state;
}
const _setCarInsuranceProvider = (state: EnumStateType, action: EnumActionTypes): EnumStateType => {
    const _action: SetCarInsuranceProviderAction = action as SetCarInsuranceProviderAction;
    const {
        carInsuranceProviders
    } = _action;
    if (carInsuranceProviders) {
        let {
            carInsuranceProviderMap
        } = state;
        carInsuranceProviders.forEach(_tempProvider => {
            carInsuranceProviderMap = carInsuranceProviderMap.set(_tempProvider.value, _tempProvider);
        });
        return {
            ...state,
            carInsuranceProviderMap
        }
    }
    return state;
}

const _setCarCarEnumFilterProvider = (state: EnumStateType, action: EnumActionTypes): EnumStateType => {
    const _action: SetEnumFilterCarAction = action as SetEnumFilterCarAction;
    const {
        enums
    } = _action;
    if (enums) {
        const {
            carModels,
            fuelTypes,
            seats,
            sources,
            types
        } = enums

        let {
            carModelsFilter,
            fuelTypesFilter,
            seatsTypesFilter,
            sourcesTypesFilter,
            typesCarFilter
        } = state

        if (carModels && carModels.length > 0) {
            carModels.forEach(({ id, name }: any, _index: number) => {
                carModelsFilter = carModelsFilter.set(id + '', {
                    value: id + '',
                    label: name,
                    sortValue: _index
                });
            });
        }

        if (fuelTypes && fuelTypes.length > 0) {
            fuelTypes.forEach(({ name, displayName }: any, _index: number) => {
                fuelTypesFilter = fuelTypesFilter.set(name + '', {
                    value: name + '',
                    label: displayName,
                    sortValue: _index
                });
            });
        }

        if (seats && seats.length > 0) {
            seats.forEach((seat: string, _index: number) => {
                seatsTypesFilter = seatsTypesFilter.set(seat + '', {
                    value: seat + '',
                    label: seat,
                    sortValue: _index
                });
            });
        }

        if (sources && sources.length > 0) {
            sources.forEach(({ id, name }: any, _index: number) => {
                sourcesTypesFilter = sourcesTypesFilter.set(id + '', {
                    value: id + '',
                    label: name,
                    sortValue: _index
                });
            });
        }

        if (types && types.length > 0) {
            types.forEach(({ id, name }: any, _index: number) => {
                typesCarFilter = typesCarFilter.set(id + '', {
                    value: id + '',
                    label: name,
                    sortValue: _index
                });
            });
        }

        return {
            ...state,
            carModelsFilter,
            fuelTypesFilter,
            seatsTypesFilter,
            sourcesTypesFilter,
            typesCarFilter,
            updateFilterTime: Date.now()
        }
    }
    return state;
}

export default function (state = _initState, action: EnumActionTypes): EnumStateType {
    switch (action.type) {
        case SET_CAR_INSURANCE_TYPES:
            return _setCarInsuranceTypes(state, action);
        case SET_CAR_INSURANCE_PROVIDERS:
            return _setCarInsuranceProvider(state, action);
        case SET_CAR_FILTER_ENUM:
            return _setCarCarEnumFilterProvider(state, action);
    }
    return state;
}

export const enumStateToJs = (state: EnumStateType): any => {
    const {
        carRelationshipMap,
        carInsuranceTypeMap,
        carInsuranceProviderMap,
        carModelsFilter,
        fuelTypesFilter,
        seatsTypesFilter,
        sourcesTypesFilter,
        typesCarFilter,
        genderMap,
        updateFilterTime,
        filterPriceMap
    } = state;
    return {
        carRelationshipMap: carRelationshipMap.toObject(),
        filterPriceMap: filterPriceMap.toObject(),
        carInsuranceTypeMap: carInsuranceTypeMap.toObject(),
        carInsuranceProviderMap: carInsuranceProviderMap.toObject(),
        carModelsFilter: carModelsFilter.toObject(),
        fuelTypesFilter: fuelTypesFilter.toObject(),
        seatsTypesFilter: seatsTypesFilter.toObject(),
        sourcesTypesFilter: sourcesTypesFilter.toObject(),
        typesCarFilter: typesCarFilter.toObject(),
        genderMap: genderMap.toObject(),
        updateFilterTime
    }
};

export const enumStateFromJs = (state: any): EnumStateType => {
    const {
        carRelationshipMap,
        carInsuranceTypeMap,
        carInsuranceProviderMap,
        carModelsFilter,
        fuelTypesFilter,
        seatsTypesFilter,
        sourcesTypesFilter,
        typesCarFilter,
        genderMap,
        updateFilterTime,
        filterPriceMap
    } = state;
    return {
        carRelationshipMap: Map(carRelationshipMap),
        filterPriceMap: Map(filterPriceMap),
        carInsuranceTypeMap: Map(carInsuranceTypeMap),
        carInsuranceProviderMap: Map(carInsuranceProviderMap),
        carModelsFilter: Map(carModelsFilter),
        fuelTypesFilter: Map(fuelTypesFilter),
        seatsTypesFilter: Map(seatsTypesFilter),
        sourcesTypesFilter: Map(sourcesTypesFilter),
        typesCarFilter: Map(typesCarFilter),
        genderMap: Map(genderMap),
        updateFilterTime,
    }
};