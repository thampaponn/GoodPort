import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StudentMain from './screens/StudentMain';
import TeacherMain from './screens/TeacherMain';
import VisitorMain from './screens/VisitorMain';
import VisitorAddPort from './screens/VisitorAddPort';
import SignIn from './screens/SignIn';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header title="GoodPort" />
      {/* <StudentMain /> */}
      {/* <TeacherMain /> */}
      {/* <VisitorMain /> */}
      {/* <VisitorAddPort /> */}
      <SignIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
