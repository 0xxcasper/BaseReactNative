import { receiveSurveyList } from './../actions/surveyActions';
import { all, put, takeLatest, take } from 'redux-saga/effects';
import { setAppLoadingAction } from '../actions/appActions';
import { REQUEST_SURVEY_LIST } from '../actionTypes/surveysActionTypes';
import { getSurveyListApi } from '../network';

function* _requestSurveyList() {
    try {
        const _result = yield getSurveyListApi()
        if (_result && _result.length > 0) {
            yield put(receiveSurveyList(_result))
        }
    } catch (error) {
        yield put(setAppLoadingAction(false))
    }
}

function* watchRequestSurveyList() {
    yield take([REQUEST_SURVEY_LIST]);
    yield _requestSurveyList();
}

export default function* () {
    yield all([
        watchRequestSurveyList()
    ]);
}