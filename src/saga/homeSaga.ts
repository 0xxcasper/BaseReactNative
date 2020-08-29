import {all, take, put} from 'redux-saga/effects';
import {REQUEST_HOME_BANNER} from "actionTypes/homeActionTypes";
import {getHomeBannerApi} from "network";
import {receiveHomeBannerAction} from "actions/homeActions";
import {HomeBuilder} from "Builders";

function* _requestHomeBanner(resolve: any, reject: any) {
    try {
        const _result = HomeBuilder.bannerFromApi(yield getHomeBannerApi());
        yield put(receiveHomeBannerAction(_result))
        resolve && resolve()
    } catch (e) {
        reject && reject(e)
    }
}

function* watchHomeBanners() {
    const { resolve, reject } = yield take(REQUEST_HOME_BANNER);
    yield _requestHomeBanner(resolve, reject);
}

export default function* () {
    yield all([
        watchHomeBanners()
    ]);
}
