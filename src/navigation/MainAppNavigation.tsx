import React, { memo } from 'react';
import { DrawerNavigator, StackNavigator } from "./index";
import { ROUTE_HOME } from "./routeNames";
import OnBoarding from 'routes/onboarding/Onboarding';

export default memo((props) => {
    return (
        <StackNavigator.Navigator
            headerMode={'none'}>
            <StackNavigator.Screen
                name={ROUTE_HOME}
                component={OnBoarding}
                options={{
                    headerShown: false,
                }}
            />
        </StackNavigator.Navigator>

    );
})