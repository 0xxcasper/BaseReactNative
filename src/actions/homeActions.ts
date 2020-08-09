//---->SangNX-make-test
import {
    HomeActionTypes,
    TEST_REQUEST_HOME_ACTION
} from 'actionTypes/homeActionTypes';

export const updateHomeBannerPopup = (): HomeActionTypes => {
    return {
        type: TEST_REQUEST_HOME_ACTION,
    }
};
//---->End