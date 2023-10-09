import SignIn from './screens/SignIn';
import SignUp from './screens/Signup';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="signin" screenOptions= {{ 
          headerShown: false
        }}>
      <Stack.Screen name="signin" component={SignIn}/>
      <Stack.Screen name="signup" component={SignUp}/>
      <Stack.Screen name="main" component={BottomTabNavigation}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

