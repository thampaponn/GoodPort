import SignIn from './screens/SignIn';
import SignUp from './screens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VisitSignUp from './screens/visitor/VisitorSignUpScreen';
import ProfSignUp from './screens/professor/ProfessorSignUpScreen';
import StudentSignUp from './screens/student/StudentSignUpScreen';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import MainPage from './screens/MainPageScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="VisitSignUp" component={VisitSignUp} />
        <Stack.Screen name="ProfSignUp" component={ProfSignUp} />
        <Stack.Screen name="StudSignUp" component={StudentSignUp} />
        <Stack.Screen name="home" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

