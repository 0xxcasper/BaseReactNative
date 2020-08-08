import { EnumFilterPrice } from './../types/modelTypes';
import { Map } from 'immutable';
import { EnumEntry } from "../types/modelTypes";
import { AllState } from "../types/reducerStateTypes";

export const selectCarRelationshipMap = (state: AllState): Map<string, EnumEntry> => {
    return state?.enumState?.carRelationshipMap;
};
export const selectCarInsuranceTypes = (state: AllState): Map<string, EnumEntry> => {
    return state?.enumState?.carInsuranceTypeMap;
};
export const selectCarInsuranceProviders = (state: AllState): Map<string, EnumEntry> => {
    return state?.enumState?.carInsuranceProviderMap;
};

export const selectGenderMap = (state: AllState): Map<string, EnumEntry> => {
    return state?.enumState?.genderMap;
};

export const selectCarModels = (state: AllState): Map<string, EnumEntry> => {
    return state?.enumState?.carModelsFilter;
};

export const selectCarFuelTypes = (state: AllState): Map<string, EnumEntry> => {
    return state?.enumState?.fuelTypesFilter;
};

export const selectCarSeatTypes = (state: AllState): Map<string, EnumEntry> => {
    return state?.enumState?.seatsTypesFilter;
};

export const selectCarSourceTypes = (state: AllState): Map<string, EnumEntry> => {
    return state?.enumState?.sourcesTypesFilter;
};

export const selectCarTypesFilter = (state: AllState): Map<string, EnumEntry> => {
    return state?.enumState?.typesCarFilter;
};

export const selectUpdateTimeFilter = (state: AllState): number => {
    return state?.enumState?.updateFilterTime;
};

export const selectFilterPriceMap = (state: AllState): Map<string, EnumFilterPrice> => {
    return state?.enumState?.filterPriceMap;
};