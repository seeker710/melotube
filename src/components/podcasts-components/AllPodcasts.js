import { StyleSheet, View } from "react-native";
// import components
import MusicHeader from "../music-components/MusicHeader";
import AllPodcastsItem from "./AllPodcastsItem";
// import constants
import { STYLES } from "../../constants/styles";

const AllPodcasts = ({ podcasts }) => {

    // header & subheader for all podcasts section as we are not getting from API
    const allHeader = "All Podcasts";
    const allSubheader = "Voices Unbound";

    return (
        <View style={[STYLES.SECTION, { marginTop: -12 }]}>
            {/* this is the header for all podcasts */}
            <MusicHeader headerText={allHeader} subHeaderText={allSubheader} />
            {/* this is the body for all podcasts */}
            <View style={styles.allPodcastsContainer}>
                {
                    podcasts.map((item, index) => <AllPodcastsItem key={index} allPodcastsData={item} />)
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    allPodcastsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
    },
});

export default AllPodcasts;
