import React, { memo } from 'react';
import { StackNavigator } from "./index";
import { NAVIGATION_MAIN_APP } from './routeNames';
import MainAppNavigation from './MainAppNavigation';


export default memo((props) => {
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
