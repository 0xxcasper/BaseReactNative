import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OpacityButton from "widgets/button/OpacityButton";

interface HomeRouteProps {

}
const HomeRoute = memo(({}: HomeRouteProps) => {
    return (
        <View style={styles.container}>
            <OpacityButton
                style={styles.buttonStyle}>
                <Text style={styles.labelStyle}>HOME</Text>
            </OpacityButton>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
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

export default HomeRoute;
