import React, { memo } from 'react';
import { StackNavigator } from "./index";
import { NAVIGATION_BOTTOM_TAB } from './routeNames';
import BottomTabNavigation from './BottomTabNavigation';

/**
|--------------------------------------------------
| Connect to the Bottom Tab Navigator
|--------------------------------------------------
*/
export default memo((props) => {
    return (
        <StackNavigator.Navigator
            headerMode={'none'}>
            <StackNavigator.Screen
                name={NAVIGATION_BOTTOM_TAB}
                component={BottomTabNavigation}
                options={{
                    headerShown: false,
                }}
            />
        </StackNavigator.Navigator>

    );
})