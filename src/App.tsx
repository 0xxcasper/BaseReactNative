import React, {memo, useRef} from 'react';
import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import RootNavigation from "navigation/RootNavigation";
import OpacityButton from "widgets/button/OpacityButton";

const App = memo(() => {
    const navigationRef = useRef<NavigationContainerRef | null>(null);

    return (
        <NavigationContainer
            ref={navigationRef}>
            <RootNavigation/>
        </NavigationContainer>
    )
})
export default App
