import React, { memo, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import Onboarding from 'routes/onboarding/Onboarding';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';

const App = memo(() => {
    const navigationRef = useRef<NavigationContainerRef | null>(null);
    return (
        // <NavigationContainer
        //     ref={navigationRef}>
        //     <RootNavigation />
        // </NavigationContainer>
        <Onboarding/>
    )
})
export default App
