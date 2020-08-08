import React, { memo } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import OpacityButton from "widgets/button/OpacityButton";

interface UserRouteProps {

}

const UserRoute = memo(({

}: UserRouteProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <OpacityButton
                    style={styles.buttonStyle}>
                    <Text style={styles.labelStyle}>USER</Text>
                </OpacityButton>
            </View>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f59042',
    },
    buttonStyle: {
        width: 140,
        height: 60,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },
    labelStyle: {
        fontSize: 18,
        fontWeight: "bold"
    }
});

export default UserRoute;
