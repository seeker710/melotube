import { ScrollView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import components
import SearchBar from "../components/search-components/SearchBar";
import TrendingSearches from "../components/search-components/TrendingSearches";
// import constants
import { COLORS } from "../constants/colors";
import { STYLES } from "../constants/styles";
import Channel from "../components/search-components/Channel";

const Search = () => {
    return (
        <View style={STYLES.MAIN_CONTAINER}>
            {/* this is the background gardient, looks good */}
            <LinearGradient colors={COLORS.GRADIENT_COLORS} style={StyleSheet.absoluteFill} />
            {/* SearchBar is fixed at the top */}
            <SearchBar />
            {/* this will contain the rest of content */}
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 128 }}
            >
                {/* here we are displaying trending searches */}
                <TrendingSearches />
                {/* here we will be displaying channels */}
                <Channel />
            </ScrollView>
        </View>
    );
}

export default Search;