import React, { memo } from "react";

import { TabNavigator, StackNavigator } from 'navigation';
import { ROUTE_USER, ROUTE_HOME } from './routeNames';

import HomeRoute from 'routes/homeRoute/HomeRoute';
import UserRoute from 'routes/userRoute/UserRoute';
import BottomTabBar from "components/bottomTabBar/BottomTabBar";

export default memo((props) => {
    return (
        <TabNavigator.Navigator
            tabBar={props => <BottomTabBar {...props} />}>
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
