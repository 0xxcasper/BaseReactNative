import { Map } from 'immutable';
import { AllState } from "../types/reducerStateTypes";
import { Feature, NewCarInfoDetail, NewCarModel, Overview, Competitor, OtherGrade, Thumb, ExteriorImage, Accessories, FilterNewCarModel } from './../types/newCarModelTypes';
import { NewCarStateType } from './../types/reducerStateTypes';

const selectNewCarState = (state: AllState): NewCarStateType => {
    return state.newCarState;
};

export const selectNewCarInfoMap = (state: AllState): Map<string, NewCarModel> => {
    return Map(selectNewCarState(state)?.newCarInfoMap);
};

export const selectNewCarDisplayMap = (state: AllState): Map<string, NewCarModel> => {
    return Map(selectNewCarState(state)?.newCarInfoDisplayMap);
};

export const selectNewCarInfoDetail = (state: AllState): NewCarInfoDetail | null | undefined => {
    return selectNewCarState(state)?.newCarInfoDetail;
};

export const selectCarSpecificationsOverViewMap = (state: AllState): Map<string, Overview> | null | undefined => {
    return selectNewCarInfoDetail(state)?.overview;
};

export const selectCarSpecificationsFeaturesMap = (state: AllState): Map<string, Feature> | null | undefined => {
    return selectNewCarInfoDetail(state)?.features;
};

export const selectCarGalleriesThumb = (state: AllState): string[] | null | undefined => {
    return selectNewCarInfoDetail(state)?.galleriesThumb;
};

export const selectCarCompetitors = (state: AllState): Map<string, Competitor> | null | undefined => {
    return selectNewCarInfoDetail(state)?.competitors;
};

export const selectOtherGrades = (state: AllState): Map<string, OtherGrade> | null | undefined => {
    return selectNewCarInfoDetail(state)?.otherGrades;
};

export const selectExteriorGalleries = (state: AllState): Thumb[] | null | undefined => {
    return selectNewCarInfoDetail(state)?.exteriorGalleries;
};

export const selectInteriorGalleries = (state: AllState): Thumb[] | null | undefined => {
    return selectNewCarInfoDetail(state)?.interiorGalleries;
};

export const selectOperationGalleries = (state: AllState): Thumb[] | null | undefined => {
    return selectNewCarInfoDetail(state)?.operationGalleries;
};

export const selectSafetiesGalleries = (state: AllState): Thumb[] | null | undefined => {
    return selectNewCarInfoDetail(state)?.safetiesGalleries;
};

export const selectOthersGalleries = (state: AllState): Thumb[] | null | undefined => {
    return selectNewCarInfoDetail(state)?.othersGalleries;
};

export const selectColorsMap = (state: AllState): Map<string, ExteriorImage> | null | undefined => {
    return selectNewCarInfoDetail(state)?.colors;
};

export const selectColorsKeys = (state: AllState): string[] | null | undefined => {
    return selectColorsMap(state)?.keySeq().toArray();
};

export const selectAccessory = (state: AllState): Accessories | null | undefined => {
    return selectNewCarInfoDetail(state)?.accessories;
};

export const selectAccessoryThumb = (state: AllState): string[] | null | undefined => {
    return selectAccessory(state)?.thumbs;
};

export const selectExteriorAccessory = (state: AllState): ExteriorImage[] | null | undefined => {
    return selectAccessory(state)?.exterior;
};

export const selectInteriorAccessory = (state: AllState): ExteriorImage[] | null | undefined => {
    return selectAccessory(state)?.interior;
};

export const selectUtilityAccessory = (state: AllState): ExteriorImage[] | null | undefined => {
    return selectAccessory(state)?.utility;
};

export const selectCareAccessory = (state: AllState): ExteriorImage[] | null | undefined => {
    return selectAccessory(state)?.care;
};

export const selectElectronicAccessory = (state: AllState): ExteriorImage[] | null | undefined => {
    return selectAccessory(state)?.electronic;
};

export const selectFilterCarModel = (state: AllState): FilterNewCarModel | null | undefined => {
    return selectNewCarState(state)?.filterNewCarModel;
};
export const selectUpdateCarListTime = (state: AllState): number => {
    return selectNewCarState(state)?.updateCarListTime;
};
export const selectListCarDetailMap = (state: AllState): Map<string, NewCarInfoDetail> => {
    return selectNewCarState(state)?.newCarDetailMap;
};
