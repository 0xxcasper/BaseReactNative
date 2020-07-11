import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

interface onBoardingProps {

}

const onBoarding = memo(({

}: onBoardingProps) => {
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
    },
});

export default onBoarding;
