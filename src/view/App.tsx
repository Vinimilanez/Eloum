/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { DefaultTheme } from './themes/DefaultTheme';

const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {}, [loading]);

  return (
    <SafeAreaView style={{backgroundColor: DefaultTheme.colors.background, flex: 1, flexDirection:'column'}}>
      <View>
        <Button mode='contained' disabled={false} loading={loading} onPress={() => setLoading(x => !x)}>Ok</Button>
      </View>
    </SafeAreaView>
  );
};



export default App;
