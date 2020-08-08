import { requestSurveyList } from './../actions/surveyActions';
import { getLastTimeFetch } from './../helpers';
import { useSelector, useDispatch } from "react-redux";
import { selectSurveyList } from './../selectors/surveysSelectors';
import { SurveyModel } from './../types/modelTypes';

export const useSurveysList = (): SurveyModel[] | null | undefined => {
    const dispatch = useDispatch()
    const _surveys = useSelector(selectSurveyList);
    if(!_surveys || _surveys.length === 0) {
        dispatch(requestSurveyList())
    }
    return _surveys
};