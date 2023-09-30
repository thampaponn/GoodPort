import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainPage from "../screens/MainPageScreen";

const Tab = createBottomTabNavigator();

export default BottomTabNavigation = () => {
    <Tab.Navigator initialRouteName="MainPage">
      <Tab.Screen name="MainPage" component={MainPage} />
    </Tab.Navigator>
}

