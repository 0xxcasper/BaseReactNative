import React, {memo} from 'react';
import MainAppNavigation from "navigation/MainAppNavigation";
import {StackNavigator} from "navigation/index";
import {NAVIGATION_MAIN_APP} from "navigation/routeNames";

/**
 |--------------------------------------------------
 | login, logout, if login success push to main app
 | handle all flow below here
 | MainAppNavigation contain app content
 | add more LoginNavigation && IntroduceNavigation
 |--------------------------------------------------
 */

export default memo(() => {
    return (
        <StackNavigator.Navigator
            headerMode={'none'}>
            <StackNavigator.Screen
                name={NAVIGATION_MAIN_APP}
                component={MainAppNavigation}
            />
        </StackNavigator.Navigator>
    );
})