import { useState } from "react";
import { LayoutAnimation, Platform, UIManager, View } from "react-native";
// import components
import SearchHeader from "./SearchHeader";
import TrendingSearchesItem from "./TrendingSearchesItem";
// import constants
import { STYLES } from "../../constants/styles";
// import fake data
import { searchData } from "../../data/data3";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TrendingSearches = () => {

    // setting fake data in state, later actual data will be fetched from backend
    const [myData, _] = useState(searchData);
    // inital # of items to render
    const [renderNum, setRenderNum] = useState(3);
    // state for see all or collapse
    const [seeAllText, setSeeAllText] = useState("See All");
    // function to show more items
    const onPress = () => {
        LayoutAnimation.linear;
        setRenderNum((prev) => (prev === 3) ? 10 : 3);
        setSeeAllText((prev) => (prev === "See All") ? "Collapse" : "See All");
    }
    const title = "Trending";

    return (
        <View style={[STYLES.SECTION, { marginRight: 18 }]}>
            <SearchHeader headerText={title} seeAllText={seeAllText} onPress={onPress} />
            {/* spawning data */}
            {
                myData.slice(0, renderNum).map((item, index) => <TrendingSearchesItem key={index.toString()} searchData={item} />)
            }
        </View>
    );
}

export default TrendingSearches;
