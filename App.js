import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
