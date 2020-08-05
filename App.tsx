import React, { memo, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import OnBoarding from 'routes/onboarding/Onboarding';
import RootNavigation from 'navigation/RootNavigation';

const App = memo(() => {
    const navigationRef = useRef<NavigationContainerRef | null>(null);

    return (
        <NavigationContainer
            ref={navigationRef}>
            <RootNavigation />
        </NavigationContainer>
        // <OnBoarding/>
    )
})
export default App
