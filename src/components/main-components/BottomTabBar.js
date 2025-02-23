import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS, SNAP_BOTTOM, SNAP_TOP } from "../../constants/dimensions";
// import hooks
import useKeyboardVisible from "../../hooks/useKeyboardVisibile";

const BottomTabBar = ({ state, descriptors, navigation, translationY }) => {

    // check if keyboard is visible or not
    const isKeyboardVisible = useKeyboardVisible();

    // animation stuff
    const translationYAnimation = useAnimatedStyle(() => {
        'worlet';
        return {
            transform: [
                { translateY: interpolate(translationY.value, [SNAP_TOP, SNAP_BOTTOM], [DIMENSIONS.HEIGHT_BOTTOM_TAB_BAR, 0], Extrapolation.CLAMP) },
            ]
        };
    });

    return (
        <Animated.View style={[styles.tabBarContainer, translationYAnimation, isKeyboardVisible && { display: "none" }]} >
            {
                state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                    const isFocused = state.index === index;

                    {/* function for onPress event */ }
                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,

                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    }

                    {/* function for onLongPress event */ }
                    const onLongPress = () => {
                        const event = navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,

                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    }

                    {/* setting color of icon and label */ }
                    const color = isFocused ? COLORS.FOCUSED_TEXT_COLOR : COLORS.UNFOCUSED_TEXT_COLOR;
                    const widthSharedValue = useSharedValue(isFocused ? 1 : 0);

                    useEffect(() => {
                        widthSharedValue.set(() => withTiming(isFocused ? 1 : 0, {
                            duration: 300,
                            easing: Easing.bounce,
                        }));
                    }, [state.index]);

                    const widthAnimation = useAnimatedStyle(() => {
                        'worklet';
                        return {
                            width: `${widthSharedValue.value * 100}%`,
                        };
                    });

                    return (
                        <TouchableOpacity
                            key={index} // we can also use route.key 
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarButtonTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            <View style={styles.navItem}>
                                {/* this view contains icon */}
                                <View>
                                    {options.tabBarIcon({ color, focused: isFocused, size: DIMENSIONS.ICON_SIZE_30 })}
                                </View>
                                {/* this view contains label */}
                                <View style={styles.labelContainer}>
                                    <Text style={[styles.label, { color }]}>{label}</Text>
                                </View>
                                {/* this view contains underline */}
                                <Animated.View style={[styles.underline, widthAnimation]} />
                            </View>
                        </TouchableOpacity>
                    );
                })
            }
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        backgroundColor: COLORS.CARD_COLOR,
        borderTopColor: COLORS.BORDER_COLOR,
        borderTopWidth: DIMENSIONS.WIDTH_BORDER,
        height: DIMENSIONS.HEIGHT_BOTTOM_TAB_BAR,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: DIMENSIONS.Z_INDEX_BOTTOM_TAB_BAR,
    },
    navItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    labelContainer: {
        marginTop: -2,
        marginBottom: 0.5,
        marginHorizontal: "auto",
        width: "auto",
    },
    label: {
        fontSize: 10,
        fontWeight: "400",
    },
    underline: {
        backgroundColor: COLORS.FOCUSED_TEXT_COLOR,
        borderRadius: 2,
        height: 2,
    },
});

export default BottomTabBar;
