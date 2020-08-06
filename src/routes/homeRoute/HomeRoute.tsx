import React, { memo, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ROUTE_HOME } from 'navigation/routeNames';
import ExamplePicker from 'widgets/picker/examplePicker/ExamplePicker';
import OpacityButton from 'widgets/button/OpacityButton';

interface HomeRouteProps {

}

const HomeRoute = memo(({}: HomeRouteProps) => {

    const _onPress = useCallback(() => {
            
    },[])

    const _onSelect = useCallback(() => {
            
    },[])

    return (
        <View style={styles.container}>
            {/* <ExamplePicker
                selections={null}
                onPress={_onPress}
                onSelect={_onSelect}>
                <View>
                    <Text>{ROUTE_HOME}</Text>
                </View>
            </ExamplePicker> */}
            <OpacityButton/>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        opacity: 0.5
    },
});

export default HomeRoute;
