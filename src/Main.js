import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSharedValue } from "react-native-reanimated";
// import components
import BottomTabBar from "./components/main-components/BottomTabBar";
import SlidingBottom from "./components/main-components/SlidingBottom";
import Home from "./screens/Home";
import Search from "./screens/Search";
// import icons
import HomeIcon from "../assets/bottom-tab-bar/home.svg";
import SearchIcon from "../assets/bottom-tab-bar/search.svg";
// import constants
import { SNAP_BOTTOM } from "./constants/dimensions";

const BottomTab = createBottomTabNavigator();

const Main = () => {
    // this contains bottom positon value of bottom tab navigator
    const translationY = useSharedValue(SNAP_BOTTOM);

    return (
        <>
            {/* this component contain all screen and bottom tab navigator */}
            <BottomTab.Navigator
                backBehavior="history"
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarLabelPosition: "below-icon",
                }}
                tabBar={(props) => <BottomTabBar {...props} translationY={translationY} />}
            >
                <BottomTab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, focused, size }) => <HomeIcon height={size} width={size} fill={color} />

                    }}
                />
                <BottomTab.Screen
                    name="Search"
                    component={Search}
                    options={{
                        tabBarLabel: "Search",
                        tabBarIcon: ({ color, focused, size }) => <SearchIcon height={size} width={size} fill={color} />
                    }}
                />
            </BottomTab.Navigator>
            {/* this component contains the mini player & player page */}
            <SlidingBottom translationY={translationY} />
        </>
    );
}

export default Main;
