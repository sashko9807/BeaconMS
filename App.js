import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
