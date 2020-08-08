import {all, put, takeLatest} from 'redux-saga/effects'
import {getProductEnumApi} from "../network/index";
import {REQUEST_PRODUCT_ENUM} from "../actionTypes/productEnumActionTypes";
import {setProductEnum} from "../actions/productEnumAction";

function* _requestProductEnum(actions: any) {
  const { resolve, reject } = actions
  try {
      const _productEnum = yield getProductEnumApi();
      if (_productEnum) {
          yield put(setProductEnum(_productEnum))
      }
      resolve && resolve(_productEnum)
  } catch (error) {
      reject && reject({
          code: error?.code,
          message: error?.message
      })
  }
}

function* watchGetProductEnumAction() {
  yield takeLatest(REQUEST_PRODUCT_ENUM, _requestProductEnum)
}

export default function* () {
    yield all([watchGetProductEnumAction()]);
}
