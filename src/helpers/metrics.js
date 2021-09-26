import { Dimensions } from "react-native";

export const dimensions = {
    windowHeight: Dimensions.get('window').height,
    windowWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('screen').height,
    screenWidth: Dimensions.get('screen').width,
}

export const headerHeight = Platform.OS === 'ios' ? 44 : 56;