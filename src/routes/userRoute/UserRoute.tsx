import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

interface UserRouteProps {

}

const UserRoute = memo(({

}: UserRouteProps) => {
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
        backgroundColor: 'red',
        opacity: 0.5
    },
});

export default UserRoute;
