import React, {memo} from "react";
import {NAVIGATION_BOTTOM_TAB, NAVIGATION_MAIN_APP, ROUTE_HOME} from "navigation/routeNames";
import {DrawerNavigator, StackNavigator} from "navigation/index";
import HomeRoute from "routes/homeRoute/HomeRoute";
import DrawerContent from "components/drawer_content/DrawerContent";

export default memo(() => {
    return (
        <DrawerNavigator.Navigator
            drawerStyle={{ width: '90%' }}
            drawerContent={(props) => <DrawerContent {...props} />}>
            <StackNavigator.Screen
                name={ROUTE_HOME}
                component={HomeRoute}
            />
        </DrawerNavigator.Navigator>
    );
})