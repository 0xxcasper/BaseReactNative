import React, {memo} from "react";
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import {NAVIGATION_TAB_HOME, NAVIGATION_TAB_USER,} from "navigation/routeNames";
import {StackNavigator, TabNavigator} from "navigation/index";
import TabHomeNavigation from "navigation/TabHomeNavigation";
import TabUserNavigation from "navigation/TabUserNavigation";
import {Platform, SafeAreaView, StyleSheet, Text} from "react-native";
import {commonStyles, navigationStyles} from "common/styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default memo((props) => {
    return (
        <TabNavigator.Navigator
            tabBarOptions={{
                style: styles.tabContainerStyle,
                activeTintColor: 'red',
                inactiveTintColor: 'black',
                keyboardHidesTabBar: Platform.select({
                    ios: false,
                    android: true
                })
            }}
            tabBar={RoundTopCornerTabBar}
        >
            <StackNavigator.Screen
                name={NAVIGATION_TAB_HOME}
                component={TabHomeNavigation}
                options={{
                    // @ts-ignore
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={25} />
                    ),
                    // @ts-ignore
                    tabBarLabel: ({ focused, color }) => {
                        return (
                            <Text style={[
                                focused ? styles.selectedLabelStyle : styles.unSelectedLabelStyle,
                                { color: color }]}>
                                Trang Chủ
                            </Text>);
                    },
                }}/>
            <StackNavigator.Screen
                name={NAVIGATION_TAB_USER}
                component={TabUserNavigation}
                options={{
                    // @ts-ignore
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={25} />
                    ),
                    // @ts-ignore
                    tabBarLabel: ({ focused, color }) => {
                        return (
                        <Text style={[
                            focused ? styles.selectedLabelStyle : styles.unSelectedLabelStyle,
                            { color: color }]}>
                            Thông tin
                        </Text>);
                    },
                }}/>
        </TabNavigator.Navigator>
    );
})

const RoundTopCornerTabBar = (props: any) => {
    return (
        <SafeAreaView style={styles.tabContentStyle}>
            <BottomTabBar {...props} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    tabContainerStyle: {
        borderTopWidth: 0,
        alignItems: 'flex-start',
        height: 57,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 0,
        marginBottom: 0,
        backgroundColor: "white",
    },
    tabContentStyle: {
        ...commonStyles.shadow2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
    },
    selectedLabelStyle: {
        fontSize: 13,
        fontWeight: "500"
    },
    unSelectedLabelStyle: {
        fontSize: 12,
        fontWeight: "normal"
    }
})
