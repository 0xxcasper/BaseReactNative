import React, { memo } from 'react';
import { NAVIGATION_MAIN_APP } from './routeNames';
import MainAppNavigation from "./MainAppNavigation";
import {StackNavigator} from "./index";
import {View} from "react-native";

export default memo((props) => {
    /**
    |--------------------------------------------------
    | Handle login, logout => main navigator below here
    |--------------------------------------------------
    */
    return (
        // <StackNavigator.Navigator
        //     headerMode={'none'}>
        //     <StackNavigator.Screen
        //         name={NAVIGATION_MAIN_APP}
        //         component={MainAppNavigation}
        //     />
        // </StackNavigator.Navigator>
        <View style={{
            width: "100%",
            height: "100%",
            backgroundColor: "red"
        }}/>
    );
})
