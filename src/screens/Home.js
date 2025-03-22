import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import components
import Music from "./Music";
import Podcasts from "./Podcasts";
import TopTabBar from "../components/home/TopTabBar";

const TopTab = createMaterialTopTabNavigator();

const Home = () => {
    return (
        <TopTab.Navigator
            backBehavior="history"
            initialRouteName="Music"
            screenOptions={{
                swipeEnabled: false,
            }}
            tabBar={(props) => <TopTabBar {...props} />}
        >
            <TopTab.Screen
                name="Music"
                component={Music}
                options={{
                    tabBarLabel: "Music",
                }}
            />
            <TopTab.Screen
                name="Podcasts"
                component={Podcasts}
                options={{
                    tabBarLabel: "Podcasts",
                }}
            />
        </TopTab.Navigator>
    );
}

export default Home;
