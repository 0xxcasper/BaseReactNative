import {all, put, takeLatest} from 'redux-saga/effects'
import {getTFSFinanceApi, requestServicesTFSFinanceApi} from "../network/index";
import {GET_TFS_DETAIL_FINANCE, REQUEST_TFS_FINANCE} from "../actionTypes/financeActionTypes";
import {setTFSDetailFinance, setTFSFinance} from "../actions/financeAction";

function* _requestServiceTFSFinance(actions: any) {
  const { resolve, reject } = actions
  try {
      const result = yield requestServicesTFSFinanceApi();
      if(result) {
          yield put(setTFSFinance(result));
      }
      resolve && resolve()
  } catch (error) {
    reject && reject({
        code: error?.code,
        message: error?.message
    });
  }
}

function* _getTFSDetailFinance(actions: any) {
    const { tfsInput, resolve, reject } = actions
    try {
        const result = yield getTFSFinanceApi(tfsInput);
        if (result && result.tfs) {
            yield put(setTFSDetailFinance(result.tfs))
        }
        resolve && resolve()
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}

function* watchServicesTFSFinanceAction() {
  yield takeLatest(REQUEST_TFS_FINANCE, _requestServiceTFSFinance)
}

function* watchGetTFSDetailFinanceAction() {
    yield takeLatest(GET_TFS_DETAIL_FINANCE, _getTFSDetailFinance)
}

export default function* () {
    yield all([watchServicesTFSFinanceAction(), watchGetTFSDetailFinanceAction()]);
}
