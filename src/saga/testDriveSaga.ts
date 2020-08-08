import { AccountStateType } from './../types/reducerStateTypes';
import { updateRegisterTestDriveInfo } from './../actions/testDriveAction';
import { selectAccountState } from './../selectors/accountSelectors';
import { useAccountInfo } from './../hooks/accountHooks';
import { all, select, takeLatest, put } from 'redux-saga/effects';
import { TIME_DAY, TIME_WEEK, TIME_YEAR } from "../common/const";
import { requestBookingTestDriveApi } from "../network/index";
import { MAKE_BOOKING_TEST_DRIVE, UPDATE_USER_INFO } from './../actionTypes/testDriveActionTypes';
import { TestDriveBuilder } from './../builders';
import { selectTestDriveRegisterInfo } from './../selectors/testDriveSelectors';
import labels from '../i18n/labels';
import moment from "moment"
import { capitalize } from '../helpers';

const _EXPIRE_DATA_TIME = TIME_DAY * 3;

function* _makeBookingTestDrive(action: any) {
    const {
        resolve,
        reject
    } = action
    try {
        const params = TestDriveBuilder.fromRedux(yield select(selectTestDriveRegisterInfo));
        const _result = yield requestBookingTestDriveApi(params)
        if (_result) {
            resolve && resolve(_result)
        }
    } catch (error) {
        const { errors } = error
        if (errors) {
            let message: string[] = []
            const _errors: string[][] = Object.values(errors)
            _errors.forEach((item: string[]) => {
                message.push(item[0])
            })
            reject && reject({
                code: error?.code,
                message: message.join('\n')
            });
            return
        }
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}

function* _updateUserInfo() {
    try {
        const _accountInfo: AccountStateType = yield select(selectAccountState)
        if (_accountInfo) {
            const _gender = _accountInfo.gender ? _accountInfo.gender.toUpperCase() : null
            let _age = null
            if(_accountInfo.birthday) {
                const _distance = Math.abs(new Date().getFullYear() - moment(_accountInfo.birthday, "DD-MM-YYYY").toDate().getFullYear())
                if(_distance >= 18) {
                    _age = moment(_accountInfo.birthday, "DD-MM-YYYY").toDate().getFullYear() + ''
                }
            }
            yield put(updateRegisterTestDriveInfo({
                name: capitalize(_accountInfo.fullName || labels.empty),
                phone: _accountInfo.phone?.value || labels.empty,
                age: _age,
                gender: _gender,
                carGradeId: null,
                carBrandId: null,
                carModelId: null,
                location: null,
                time: null
            }))
        }
    } catch (error) {
    }
}

function* watchBookingTestDrive() {
    yield takeLatest(MAKE_BOOKING_TEST_DRIVE, _makeBookingTestDrive);
}

function* watchUpdateDefaultInfo() {
    yield takeLatest(UPDATE_USER_INFO, _updateUserInfo);
}

export default function* () {
    yield all([watchBookingTestDrive(), watchUpdateDefaultInfo()]);
}
