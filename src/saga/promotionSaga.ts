import { all, put, select, take, takeLatest } from 'redux-saga/effects';
import { updatePromotions, resetPromotions } from '../actions/promotionAction';
import { REQUEST_PROMOTIONS, RESET_PROMOTIONS } from '../actionTypes/PromotionsActionTypes';
import { TIME_DAY, TIME_MIN } from "../common/const";
import { getAllPromotionsApi } from "../network/index";
import { selectFcmToken } from "../selectors/appSelectors";
import { ERROR_PROMOTIONS, RECEIVE_PROMOTIONS, DID_RESET_PROMOTIONS } from './../actionTypes/PromotionsActionTypes';
import { delay } from "./index";

const _EXPIRE_DATA_TIME = TIME_DAY * 3;

function* requestPromotion() {
    try {
        const token = yield select(selectFcmToken);
        const _result = yield getAllPromotionsApi(token);
        if (_result) {
            yield put(updatePromotions(_result))
        }
    } catch (e) {
    }
}


function* requestResetPromotion() {
    try {
        yield put(resetPromotions())
    } catch (e) {
    }
}

function* watchPromotion() {
    yield takeLatest(REQUEST_PROMOTIONS, requestPromotion);
}

function* watchResetPromotion() {
    while (true) {
        yield take(RESET_PROMOTIONS);
        yield requestResetPromotion();
        const { type } = yield take([DID_RESET_PROMOTIONS]);
        if (type === DID_RESET_PROMOTIONS) {
            break;
        }
        yield delay(TIME_MIN);
    }
}

export default function* () {
    yield all([watchPromotion(), watchResetPromotion()]);
}
