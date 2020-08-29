import React, {memo} from "react";
import {StackNavigator} from "navigation/index";
import {commonStyles, headerOptions} from "common/styles";
import {DRAWER_NAVIGATOR, ROUTE_USER} from "navigation/routeNames";
import DrawerNavigator from "navigation/DrawerNavigator";
import UserRoute from "routes/userRoute/UserRoute";

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
                name={DRAWER_NAVIGATOR}
                component={DrawerNavigator}
                options={headerOptions.headerShown}
            />
            <StackNavigator.Screen
                name={ROUTE_USER}
                component={UserRoute}
                options={headerOptions.headerShown}/>
        </StackNavigator.Navigator>
    );
})