import React, { memo } from 'react';
import { StackNavigator } from 'navigation';
import MainAppNavigation from './MainAppNavigation';
import { NAVIGATION_MAIN_APP } from './routeNames';

export default memo((props) => {
    /**
    |--------------------------------------------------
    | Handle login, logout => main navigator below here
    |--------------------------------------------------
    */
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
