import { StyleSheet } from "react-native";

// styles for app
export const STYLES = StyleSheet.create({
    MAIN_CONTAINER: {
        flex: 1,
    },
    SECTION: {
        marginTop: 18,
        marginLeft: 18,
        marginBottom: 12,
    },
    THUMBNAIL: {
        aspectRatio: 1,
        objectFit: "cover",
        resizeMode: "cover",
        verticalAlign: "middle",
        width: "100%",
    },
});
