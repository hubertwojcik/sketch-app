// const ColorPicker = () => {
//     // const [isOpen, toggle] = useReducer(val => !val, false);
//     const firstValue = useSharedValue(30);
//     const secondValue = useSharedValue(30);
//     const thirdValue = useSharedValue(30);
//     const isOpen = useSharedValue(false);

//     const handlePress = () => {
//         const config = {
//             easing: Easing.bezier(0.67, -0.6, 0.32, 1.6),
//             duration: 500
//         };
//         if (isOpen.value) {
//             firstValue.value = withTiming(30, config);
//             secondValue.value = withDelay(50, withTiming(30, config));
//             thirdValue.value = withDelay(100, withTiming(30, config));
//         } else {
//             firstValue.value = withDelay(200, withSpring(130));
//             secondValue.value = withDelay(100, withSpring(210));
//             thirdValue.value = withSpring(290);
//         }
//         isOpen.value = !isOpen.value;
//     };

//     const firstIconValue = useAnimatedStyle(() => {
//         const scale = interpolate(firstValue.value, [30, 130], [0, 1], Extrapolate.CLAMP);
//         return { bottom: firstValue.value, transform: [{ scale }] };
//     });
//     const secondIconValue = useAnimatedStyle(() => {
//         const scale = interpolate(secondValue.value, [30, 130], [0, 1], Extrapolate.CLAMP);
//         return { bottom: secondValue.value, transform: [{ scale }] };
//     });
//     const thirdIconValue = useAnimatedStyle(() => {
//         const scale = interpolate(thirdValue.value, [30, 130], [0, 1], Extrapolate.CLAMP);
//         return { bottom: thirdValue.value, transform: [{ scale }] };
//     });

//     return (
//         <View style={styles.container}>
//             <Animated.View style={[styles.contentContainer, { bottom: 290 }, thirdIconValue]}>
//                 <View style={styles.iconContainer}>
//                     <Dot color="yellow" />
//                 </View>
//             </Animated.View>
//             <Animated.View style={[styles.contentContainer, { bottom: 210 }, secondIconValue]}>
//                 <View style={styles.iconContainer}>
//                     <Dot color="orange" />
//                 </View>
//             </Animated.View>
//             <Animated.View style={[styles.contentContainer, { bottom: 130 }, firstIconValue]}>
//                 <View style={styles.iconContainer}>
//                     <Dot color="red" />
//                 </View>
//             </Animated.View>

//             <Pressable onPress={handlePress} style={styles.contentContainer}>
//                 <View style={styles.iconContainer}>
//                     <Dot color="black" />
//                 </View>
//             </Pressable>
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "red"
//     },
//     contentContainer: {
//         // backgroundColor: "#0f56b3",
//         position: "absolute",
//         bottom: 30,
//         borderRadius: 50

//         // left: 30
//     },
//     iconContainer: { height: 60, width: 60, justifyContent: "center", alignItems: "center" },
//     icon: {}
// });
