import { ScrollView, View } from "react-native";
// import components
import TrendingPodcasts from "../components/podcasts-components/TrendingPodcasts";
import AllPodcasts from "../components/podcasts-components/AllPodcasts";
// import constants
import { STYLES } from "../constants/styles";
import { useState } from "react";
import { podcastsData } from "../data/data2";

// UPDATES REQUIRED FOR EFFICIENCY (alternative for scrollView for lazy loading)
const Podcasts = () => {

    const [myData, _] = useState(podcastsData);

    return (
        <View style={STYLES.MAIN_CONTAINER}>
            <ScrollView
                /**
                 * @description padding to show last item in list, as it is hidden by mini player 
                 */
                contentContainerStyle={{ paddingBottom: 152 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <TrendingPodcasts podcasts={myData["trendingPodcasts"]} />
                <AllPodcasts podcasts={myData["data"]} />
            </ScrollView>
        </View>
    );
}

export default Podcasts;