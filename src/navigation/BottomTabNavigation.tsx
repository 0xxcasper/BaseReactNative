import React, { memo } from "react";
import {
    ROUTE_HOME,
    ROUTE_USER
} from "navigation/routeNames";
import {TabNavigator, StackNavigator} from "navigation/index";
import HomeRoute from 'routes/homeRoute/HomeRoute';
import UserRoute from 'routes/userRoute/UserRoute';

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
