import { useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
// import icons
import ArrowBackIcon from "../../../assets/icons/arrow_back.svg";
import CloseIcon from "../../../assets/icons/close.svg";
import MicIcon from "../../../assets/icons/mic.svg";
import SearchBoldIcon from "../../../assets/icons/search_bold.svg";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS } from "../../constants/dimensions";

const SearchBar = () => {

    const ICON_SIZE_22 = 22;
    // state for search query
    const [query, setQuery] = useState("");
    // check if keyboard is visible or not
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    // reference of input (usage: focus on when search botton is clicked)
    const inputRef = useRef();
    // placeholder text for TextInput
    const placeholderText = "Music, Artists, and Podcasts";

    // function when search icon is clicked
    const searchPress = () => {
        inputRef.current.focus();
        setKeyboardVisible(true);
    }

    // function when arrow back icon is clicked
    const arrowBackPress = () => {
        Keyboard.dismiss();
        setKeyboardVisible(false);
        setQuery("");
    }

    return (
        <View style={styles.searchBarPosition}>
            <View style={styles.searchBarContainer}>
                {/* this view contains search/arrow back button */}
                {
                    keyboardVisible
                        ? <ArrowBackIcon onPress={arrowBackPress} height={ICON_SIZE_22} width={ICON_SIZE_22} fill={COLORS.FOCUSED_TEXT_COLOR} />
                        : <SearchBoldIcon onPress={searchPress} height={ICON_SIZE_22} width={ICON_SIZE_22} fill={COLORS.FOCUSED_TEXT_COLOR} />
                }
                {/* this view contains TextInput */}
                <TextInput
                    autoCorrect={false}
                    placeholder={placeholderText}
                    placeholderTextColor={COLORS.BORDER_COLOR}
                    cursorColor={COLORS.PRIMARY_COLOR}
                    value={query}
                    onBlur={() => setKeyboardVisible(false)}
                    onChangeText={setQuery}
                    onFocus={() => setKeyboardVisible(true)}
                    style={styles.searchBarInput}
                    ref={inputRef}
                />
                {/* this view contains mic/close icon */}
                {
                    query.length !== 0
                        ? <CloseIcon onPress={() => setQuery("")} height={ICON_SIZE_22} width={ICON_SIZE_22} fill={COLORS.FOCUSED_TEXT_COLOR} />
                        : <MicIcon height={ICON_SIZE_22} width={ICON_SIZE_22} fill={COLORS.FOCUSED_TEXT_COLOR} />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarPosition: {
        padding: 16,
        paddingTop: 16 + DIMENSIONS.HEIGHT_STATUS_BAR,
    },
    searchBarContainer: {
        backgroundColor: COLORS.CARD_COLOR,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
    },
    searchBarInput: {
        flex: 1,
        color: COLORS.FOCUSED_TEXT_COLOR,
        fontSize: 16,
        fontWeight: "500",
        marginHorizontal: 6
    },
});

export default SearchBar;
