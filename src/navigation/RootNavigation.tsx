import React, { memo } from 'react';
// import { NAVIGATION_MAIN_APP } from './routeNames';
// import MainAppNavigation from './MainAppNavigation';
import { View } from 'react-native';
import { StackNavigator } from 'navigation';
import { NAVIGATION_MAIN_APP } from './routeNames';
import OnBoarding from 'routes/onboarding/Onboarding';


export default memo((props) => {
    return (
        <StackNavigator.Navigator
            headerMode={'none'}>
             <StackNavigator.Screen
                name={NAVIGATION_MAIN_APP}
                component={OnBoarding}
            />
        </StackNavigator.Navigator>
        // <StackNavigator.Navigator
        //     headerMode={'none'}>
        //     <StackNavigator.Screen
        //         name={NAVIGATION_MAIN_APP}
        //         component={MainAppNavigation}
        //     />
        // </StackNavigator.Navigator>
        // <View style={{
        //     width: "100%",
        //     height: "100%",
        //     backgroundColor: "red"
        // }} />
    );
})
