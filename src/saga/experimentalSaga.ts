import {select, takeEvery} from 'redux-saga/effects';
import {FIRE_EXPERIMENTAL} from "../actionTypes/experimentalActionTypes";
import {getAllInsuranceProvidersApi} from "../network/index";
import {selectToken} from "../selectors/authSelectors";

function* fireExperimental() {
    const token = yield select(selectToken);
    try {
        console.log('===>>Call Experiment: ', token);
        const result = yield getAllInsuranceProvidersApi();
        console.log('===>>Experiment: ', result);
    } catch (e) {
        console.log('===>>Experiment Error: ', e);
    }
}

export default function* () {
    yield takeEvery(FIRE_EXPERIMENTAL, fireExperimental);
}
