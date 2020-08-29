import React, {memo, useCallback} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import OpacityButton from "widgets/button/OpacityButton";
import {useDispatch} from "react-redux";
import {popAction} from "actions/navigationActions";

interface UserRouteProps {

}

const UserRoute = memo(({

}: UserRouteProps) => {

    const dispatch = useDispatch()
    const _onButtonPress = useCallback(() => {
        dispatch(popAction())
    }, [])
    return (
        <View style={styles.container}>
            <OpacityButton
                style={styles.buttonStyle}
                onPress={_onButtonPress}>
                <Text style={styles.labelStyle}>USER</Text>
            </OpacityButton>
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
