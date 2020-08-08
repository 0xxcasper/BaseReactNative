import { EnumEntry } from "../types/modelTypes";

const PREFIX = 'ENUM_ACTION/';
export const SET_CAR_RELATIONSHIPS = PREFIX + 'SET_CAR_RELATIONSHIPS';
export const REQUEST_CAR_INSURANCE_TYPES = PREFIX + 'REQUEST_CAR_INSURANCE_TYPES';
export const SET_CAR_INSURANCE_TYPES = PREFIX + 'SET_CAR_INSURANCE_TYPES';
export const REQUEST_CAR_INSURANCE_PROVIDERS = PREFIX + 'REQUEST_CAR_INSURANCE_PROVIDERS';
export const SET_CAR_INSURANCE_PROVIDERS = PREFIX + 'SET_CAR_INSURANCE_PROVIDERS';
export const REQUEST_CAR_FILTER_ENUM = PREFIX + 'REQUEST_CAR_FILTER_ENUM';
export const SET_CAR_FILTER_ENUM = PREFIX + 'SET_CAR_FILTER_ENUM';
export const CLEAR_CAR_FILTER = PREFIX + 'CLEAR_CAR_FILTER';

interface SetCarRelationshipAction {
    type: string,
}

export interface SetCarInsuranceTypesAction {
    type: typeof SET_CAR_INSURANCE_TYPES,
    carInsurances: EnumEntry[],
}
export interface SetCarInsuranceProviderAction {
    type: typeof SET_CAR_INSURANCE_PROVIDERS,
    carInsuranceProviders: EnumEntry[],
}

export interface SetEnumFilterCarAction {
    type: typeof SET_CAR_FILTER_ENUM,
    enums: any
}

export type EnumActionTypes = SetCarRelationshipAction | SetCarInsuranceTypesAction | SetCarInsuranceProviderAction | SetEnumFilterCarAction;
