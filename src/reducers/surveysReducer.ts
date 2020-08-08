import { SurveyModel } from './../types/modelTypes';
import { SurveyActionTypes, RECEIVE_SURVEY_LIST, RECEIVE_SURVEY_DETAIL_WITH_ID, ReceiveSurveyList } from './../actionTypes/surveysActionTypes';
import { SurveyStateType } from './../types/reducerStateTypes';

const _initData: SurveyStateType = {
    surveyList: null
}
const _initState: SurveyStateType = {
    ..._initData
};

const _updateSurveyList = (state: SurveyStateType, action: SurveyActionTypes): SurveyStateType => {
    const _action = action as ReceiveSurveyList
    const { data } = _action
    return {
        ...state,
        surveyList: data
    }
};

const _updateSurveyDetail = (state: SurveyStateType, action: SurveyActionTypes): SurveyStateType => {
    return state
};

export default (state = _initState, action: SurveyActionTypes): SurveyStateType => {
    switch (action.type) {
        case RECEIVE_SURVEY_LIST:
            return _updateSurveyList(state, action);
        case RECEIVE_SURVEY_DETAIL_WITH_ID:
            return _updateSurveyDetail(state, action);
        default:
    }
    return state;
}
