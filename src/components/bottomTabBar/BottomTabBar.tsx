import React, { memo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface BottomTabBarProps {
    state: any,
    descriptors: any,
    navigation: any
}

const BottomTabBar = memo(({ state, descriptors, navigation }: BottomTabBarProps) => {

    return (
        <View style={styles.container}>
            <View style={styles.tabBarStyle}>
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            //  @ts-ignore
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityRole="button"
                            key={route.key}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            style={styles.tabButtonStyle}
                            onLongPress={onLongPress}>
                            <Text style={[
                                styles.tabLabelStyle,
                                isFocused ? styles.tabLabelSelected : styles.tabLabelUnSelected
                            ]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    tabBarStyle: {
        flexDirection: 'row',
        height: 50,
        justifyContent: "space-around",
        alignItems: "center",
    },
    tabButtonStyle: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center"
    },
    tabLabelStyle: {
        fontSize: 16,
        opacity: 0.8
    },
    tabLabelUnSelected: {
        fontWeight: "normal",
        color: '#222',
    },
    tabLabelSelected: {
        fontWeight: "700",
        color: '#673ab7'
    }
});

export default BottomTabBar;
