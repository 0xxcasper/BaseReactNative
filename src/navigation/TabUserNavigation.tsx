import React, {memo} from "react";
import {ROUTE_USER} from "navigation/routeNames";
import UserRoute from "routes/userRoute/UserRoute";
import {commonStyles, headerOptions} from "common/styles";
import {StackNavigator} from "navigation/index";

export default memo(() => {
    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: 'black',
                headerTitleAlign: 'left',
                headerLeftContainerStyle: commonStyles.headerLeftContainerStyle
            }}
        >
            <StackNavigator.Screen
                name={ROUTE_USER}
                component={UserRoute}
                options={headerOptions.headerShown}
            />
        </StackNavigator.Navigator>
    );
})