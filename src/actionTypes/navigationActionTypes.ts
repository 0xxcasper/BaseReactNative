const PREFIX                            = 'NAVIGATION_ACTION/';
export const NAVIGATE                   = PREFIX + 'NAVIGATE';
export const PUSH                       = PREFIX + 'PUSH';
export const CLOSE_DRAWER               = PREFIX + 'CLOSE_DRAWER';
export const POP                        = PREFIX + 'POP';
export const POP_TO_ROOT                = PREFIX + 'POP_TO_ROOT';
export const RESET_STACK                = PREFIX + 'RESET_STACK';
export const POP_STACK_NUMBER           = PREFIX + 'POP_STACK_NUMBER';
export const SELECTED_BOTTOM_TAB        = PREFIX + 'SELECTED_BOTTOM_TAB';

interface NavigateAction {
    type: typeof NAVIGATE;
    name: string;
    params?: any;
}

interface PushAction {
    type: typeof PUSH;
    name: string;
    params?: any;
}

interface CloseDrawerAction {
    type: typeof CLOSE_DRAWER;
}

interface PopAction {
    type: typeof POP
    screen?: string
}

interface PopToRootAction {
    type: typeof POP_TO_ROOT
    params?: any;
}

interface ResetStackAction {
    type: typeof RESET_STACK
    screen?: string,
    params?: any;
}

interface PopStackNumber {
    type: typeof POP_STACK_NUMBER;
    number?: number | string | null | undefined
}

interface SelectedBottomTab {
    type: typeof SELECTED_BOTTOM_TAB;
    screen: string,
    params?: any;
}

export type NavigationActionTypes =
    NavigateAction
    | PushAction
    | CloseDrawerAction
    | PopAction
    | PopToRootAction
    | ResetStackAction
    | PopStackNumber
    | SelectedBottomTab;