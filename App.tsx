import SignIn from './screens/SignIn';
import SignUp from './screens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentMain from './screens/StudentMain';
import TeacherMain from './screens/TeacherMain';
import VisitSignUp from './screens/visitor/VisitorSignUpScreen';
import ProfSignUp from './screens/professor/ProfessorSignUpScreen';
import StudSignUp from './screens/student/StudentSignUpScreen';


const Stack = createNativeStackNavigator();

const App = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VisitSignUp" screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="StudentMain" component={StudentMain} />
        <Stack.Screen name="TeacherMain" component={TeacherMain} />
        <Stack.Screen name="VisitSignUp" component={VisitSignUp} />
        <Stack.Screen name="ProfSignUp" component={ProfSignUp} />
        <Stack.Screen name="StudSignUp" component={StudSignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

