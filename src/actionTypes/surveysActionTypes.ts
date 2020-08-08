import { SurveyModel } from './../types/modelTypes';
import { CBErrorType } from './../types/errors';

const PREFIX = 'SURVEY/';
export const REQUEST_SURVEY_LIST                = PREFIX + 'REQUEST_SURVEY_LIST';
export const RECEIVE_SURVEY_LIST                = PREFIX + 'RECEIVE_SURVEY_LIST';
export const REQUEST_SURVEY_DETAIL_WITH_ID      = PREFIX + 'REQUEST_SURVEY_DETAIL_WITH_ID';
export const RECEIVE_SURVEY_DETAIL_WITH_ID      = PREFIX + 'RECEIVE_SURVEY_DETAIL_WITH_ID';
export const SEND_SURVEY_WITH_PARAMS            = PREFIX + 'SEND_SURVEY_WITH_PARAMS';

export interface RequestSurveyList {
    type: typeof REQUEST_SURVEY_LIST,
}

export interface ReceiveSurveyList {
    type: typeof RECEIVE_SURVEY_LIST,
    data: SurveyModel[]
}

export interface RequestSurveyDetailWithId {
    type: typeof REQUEST_SURVEY_DETAIL_WITH_ID,
    surveyId: string
}

export interface ReceiveSurveyDetailWithId {
    type: typeof REQUEST_SURVEY_DETAIL_WITH_ID,
    surveyId: string,
    data: any
}

export interface SendSurveyListWithParams {
    type: typeof SEND_SURVEY_WITH_PARAMS,
    params: any
}

export type SurveyActionTypes =
     RequestSurveyList
    | ReceiveSurveyList
    | RequestSurveyDetailWithId
    | ReceiveSurveyDetailWithId
    | SendSurveyListWithParams;