import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from '../screens/Home';
import {Provider} from 'react-redux';
import {store} from '../store/Store';
import Splash from '../screens/Splash';
const StackScreen: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'Splash'}
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Home'}
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default StackScreen;
