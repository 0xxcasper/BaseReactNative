const PREFIX = 'HOME_ACTION/';

//---->SangNX-make-test
export const TEST_REQUEST_HOME_ACTION = PREFIX + "TEST_REQUEST_HOME_ACTION";

export interface TestRequestHomeAction {
    type: typeof TEST_REQUEST_HOME_ACTION
}

export type HomeActionTypes = TestRequestHomeAction;
//---->End