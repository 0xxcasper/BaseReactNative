import { SurveyModel } from './../types/modelTypes';
import { AllState } from "../types/reducerStateTypes";
import { SurveyStateType } from './../types/reducerStateTypes';

const selectSurveyState = (state: AllState): SurveyStateType => {
    return state.surveyState;
};

export const selectSurveyList = (state: AllState): SurveyModel[] | null | undefined => {
    return selectSurveyState(state).surveyList
};