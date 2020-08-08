import { all, take, delay } from 'redux-saga/effects'
import { NAVIGATE, PUSH, CLOSE_DRAWER, POP, POP_TO_ROOT, RESET_STACK, POP_STACK_NUMBER, SELECTED_BOTTOM_TAB } from "../actionTypes/navigationActionTypes";
import { StackActions, useNavigation, DrawerActions, CommonActions, TabActions } from '@react-navigation/native';
import { NAVIGATION_MAIN_APP, NAVIGATION_LOGIN } from '../navigation/routeNames';

let navigationRef;
export function setNavigationRef(_ref) {
    navigationRef = _ref;
}
export function getNavigationRef() {
    return navigationRef;
}

function* watchNavigationAction() {
    while (true) {
        const {
            type,
            name,
            params,
            screen,
            number
        } = yield take([NAVIGATE, PUSH, POP, POP_TO_ROOT, RESET_STACK, POP_STACK_NUMBER, SELECTED_BOTTOM_TAB]);
        switch (type) {
            case NAVIGATE:
                if (navigationRef && navigationRef.current) {
                    navigationRef.current.navigate(name, params);
                }
                break;
            case PUSH:
                if (navigationRef && navigationRef.current) {
                    navigationRef.current?.dispatch(StackActions.push(name, params));
                }
                break;
            case POP:
                if (navigationRef && navigationRef.current) {
                    navigationRef.current.goBack(screen)
                }
                break;
            case POP_TO_ROOT:
                if (navigationRef && navigationRef.current) {
                    navigationRef.current.navigate(NAVIGATION_MAIN_APP, params);
                }
                break;
            case RESET_STACK:
                if (navigationRef && navigationRef.current) {
                    navigationRef.current.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{
                                name: screen,
                                params
                            }],
                        })
                    );
                }
                break;
            case POP_STACK_NUMBER:
                if (navigationRef && navigationRef.current) {
                    const popAction = StackActions.pop(number ? number : 1);
                    navigationRef.current?.dispatch(popAction);
                }
                break;
            case SELECTED_BOTTOM_TAB: {
                if (navigationRef && navigationRef.current) {
                    const jumpToAction = TabActions.jumpTo(screen, params);
                    navigationRef.current?.dispatch(jumpToAction)
                }
            }
        }
        yield delay(1000)
    }
}

function* watchDrawerAction() {
    while (true) {
        const {
            type,
            name,
            params,
            screen,
            number
        } = yield take([CLOSE_DRAWER]);
        if (type === CLOSE_DRAWER) {
            if (navigationRef && navigationRef.current) {
                navigationRef.current?.dispatch(DrawerActions.closeDrawer());
            }
        }
    }
}

export default function* () {
    yield all([
        watchNavigationAction(), 
        watchDrawerAction()
    ]);
}
