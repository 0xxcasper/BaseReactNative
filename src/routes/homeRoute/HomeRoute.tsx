import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

interface HomeRouteProps {

}

const HomeRoute = memo(({

}: HomeRouteProps) => {
    return (
        <View style={styles.container}>
            
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
