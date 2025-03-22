import { FlatList, ScrollView, View } from "react-native";
// import components
import MusicHeader from "../music/MusicHeader";
import TrendingItem from "./TrendingItem";
// import constants
import { STYLES } from "../../constants/styles";

const TrendingPodcasts = ({ podcasts: [{ items: trendingData, module }] }) => {

    // specifying # of rows in trending podcasts
    const noOfRows = 2;

    return (
        <View style={STYLES.SECTION}>
            {/* this is header of trending podcasts */}
            <MusicHeader headerText={module.title} subHeaderText={module.subtitle} />
            {/* this is podcasts carousel */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={trendingData}
                    initialNumToRender={5}
                    numColumns={Math.ceil(trendingData.length / noOfRows)} // numColumns does not support horizontal scrolling, that's why we use ScrollView
                    renderItem={({ item }) => <TrendingItem trendingData={item} />}
                    keyExtractor={(_, index) => index.toString()}
                />
            </ScrollView>
        </View>
    );
}

export default TrendingPodcasts;
