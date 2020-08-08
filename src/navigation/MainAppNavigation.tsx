import React, { memo } from 'react';
import {StackNavigator} from "navigation/index";
import BottomTabNavigation from "navigation/BottomTabNavigation";
import {NAVIGATION_BOTTOM_TAB} from "navigation/routeNames";

/**
|--------------------------------------------------
| Connect to the Bottom Tab Navigator
| I create MainAppNavigation because
| *case 1: if you want make a DRAWER all screen
|  in your app, put DRAWER here
| *case 2: if you just want make DRAWER in HOME SCREEN
| go to BottomTabNavigation -> HomeNavigation put your
| DRAWER here
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