# LegencyMakeBySNX
## Base Project Written by Typescript

Search and remove all contents include

```bash
SangNX-make-test
```

Make your snippets in IntelliJ

```bash
import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { commonStyles } from "common/styles";
import { APP_COLOR } from "common/colors";
import { RouteList } from 'types/routeTypes';
import { RouteProp } from '@react-navigation/native';
/* type RouteProps = RouteProp<RouteList, ''>; */

type $TM_FILENAME_BASE$Props = {
}

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
