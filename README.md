# LegencyMadeBySNX
## Base Project Written by Typescript

Search and remove all contents include

```bash
SangNX-make-test
```

Make your snippet create new Route in IntelliJ

```bash
import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { commonStyles } from "common/styles";
import { APP_COLOR } from "common/colors";
import { RouteList } from 'types/routeTypes';
import { RouteProp } from '@react-navigation/native';

type $TM_FILENAME_BASE$Props = {
}

/* type RouteProps = RouteProp<RouteList, ''>; */

const $TM_FILENAME_BASE$ = memo((props: $TM_FILENAME_BASE$Props): JSX.Element => {
   return (
       <View style={styles.container}>
       </View>
   );
})

const styles = StyleSheet.create({
    container: {
       ...commonStyles.fillFull,
       backgroundColor: APP_COLOR,
    }
})

export default $TM_FILENAME_BASE$;

$END$
```
