import React, { memo } from "react";

// import { TabNavigator, StackNavigator } from 'navigation';

import HomeRoute from 'routes/homeRoute/HomeRoute';
import UserRoute from 'routes/userRoute/UserRoute';
// import BottomTabBar from "components/bottomTabBar/BottomTabBar";
import {TabNavigator, StackNavigator} from "navigation/index";
import {BottomTabBar} from "@react-navigation/bottom-tabs";
import {View} from "react-native";
import {ROUTE_HOME, ROUTE_USER} from "navigation/routeNames";

export default memo((props) => {
    return (
        <TabNavigator.Navigator>
            <StackNavigator.Screen
                name={ROUTE_HOME}
                component={HomeRoute}
                options={{
                    title: 'Trang chủ'
                }}/>
            <StackNavigator.Screen
                name={ROUTE_USER}
                component={UserRoute}
                options={{
                    title: 'Thông tin'
                }}/>
        </TabNavigator.Navigator>
    );
})
