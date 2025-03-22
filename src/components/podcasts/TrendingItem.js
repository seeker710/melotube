import { StyleSheet, View } from "react-native";
// import components
import SongItem from "../music/SongItem";

/**
 * @description 
 * we want gap between two rows of TrendingPodcasts carousel
 * that's why we are modifying SongItem from music-components
 * basically, we are adding marginBottom to SongItem
 */
const TrendingItem = ({ trendingData }) => {
    return (
        <View style={styles.trendingItemContainer}>
            <SongItem songData={trendingData} />
        </View>
    );
}

const styles = StyleSheet.create({
    trendingItemContainer: {
        marginBottom: 28,
    },
});

export default TrendingItem;
