import { POP_STACK_NUMBER, SELECTED_BOTTOM_TAB } from 'actionTypes/navigationActionTypes';
import {
    CLOSE_DRAWER,
    NAVIGATE,
    PUSH,
    POP,
    POP_TO_ROOT,
    RESET_STACK,
    NavigationActionTypes
} from "actionTypes/navigationActionTypes";

export function navigateAction(name: string, params: any): NavigationActionTypes {
    return {
        type: NAVIGATE,
        name: name,
        params: params
    }
}

export function pushAction(name: string, params?: any): NavigationActionTypes {
    return {
        type: PUSH,
        name: name,
        params: params
    }
}

export function closeDrawerAction(): NavigationActionTypes {
    return {
        type: CLOSE_DRAWER,
    }
}

export function popAction(screen: string, params?: any): NavigationActionTypes {
    return {
        type: POP,
        screen,
        params
    }
}

export function popToRootAction(): NavigationActionTypes {
    return {
        type: POP_TO_ROOT,
    }
}

export function resetStack(screen: string, params?: any): NavigationActionTypes {
    return {
        type: RESET_STACK,
        screen,
        params
    }
}

export function popStackNumberAction(number: (number | string) | null | undefined): NavigationActionTypes {
    return {
        type: POP_STACK_NUMBER,
        number
    }
}

export function selectedBottomTabAction(screen: string, params: any): NavigationActionTypes {
    return {
        type: SELECTED_BOTTOM_TAB,
        screen,
        params
    }
}