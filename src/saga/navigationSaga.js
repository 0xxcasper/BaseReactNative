import {all, delay, take} from 'redux-saga/effects'
import {
    CLOSE_DRAWER,
    NAVIGATE,
    POP,
    POP_STACK_NUMBER,
    POP_TO_ROOT,
    PUSH,
    RESET_STACK,
    SELECTED_BOTTOM_TAB
} from "actionTypes/navigationActionTypes";
import {CommonActions, DrawerActions, StackActions, TabActions} from '@react-navigation/native';
import {NAVIGATION_MAIN_APP} from 'navigation/routeNames';

let navigationRef;
export function setNavigationRef(_ref) {
    navigationRef = _ref;
}
export function getNavigationRef() {
    return navigationRef;
}

function* watchNavigationAction() {
    while (true) {
        const { type, name, params, screen, number } = yield take([
            NAVIGATE,
            PUSH,
            POP,
            POP_TO_ROOT,
            RESET_STACK,
            POP_STACK_NUMBER,
            SELECTED_BOTTOM_TAB
        ]);
        if(!navigationRef || !navigationRef.current) return;
        switch (type) {
            case NAVIGATE:
                navigationRef.current.navigate(name, params);
                break;
            case PUSH:
                navigationRef.current?.dispatch(StackActions.push(name, params));
                break;
            case POP:
                navigationRef.current.goBack(screen)
                break;
            case POP_TO_ROOT:
                navigationRef.current.navigate(NAVIGATION_MAIN_APP, params);
                break;
            case RESET_STACK:
                navigationRef.current.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: screen, params }],
                    })
                );
                break;
            case POP_STACK_NUMBER:
                const popAction = StackActions.pop(number ? number : 1);
                navigationRef.current?.dispatch(popAction);
                break;
            case SELECTED_BOTTOM_TAB: {
                const jumpToAction = TabActions.jumpTo(screen, params);
                navigationRef.current?.dispatch(jumpToAction)
            }
        }
        /*Delay avoid user duple tap*/
        yield delay(2000)
    }
}

function* watchDrawerAction() {
    while (true) {
        const { type } = yield take([CLOSE_DRAWER]);
        if (type === CLOSE_DRAWER && navigationRef && navigationRef.current) {
            navigationRef.current?.dispatch(DrawerActions.closeDrawer());
        }
    }
}

export default function* () {
    yield all([
        watchNavigationAction(), 
        watchDrawerAction()
    ]);
}
