import { moderateScale } from "../utils/scaling"

export default {
    colorSet: {
        PRIMARY: "#6A539D",
        SECONDARY: "#FFF",
        gray: 'gray',
        lightGray: '#F8F7F7',
        red: 'red'
    },
    fontSizeSet: {
        fontSmall: moderateScale(15),
        fontRegular: moderateScale(17),
        fontMedium: moderateScale(20),
        fontLarge: moderateScale(36)
    },
    fontFamilySet: {
        fontFamilyPrimary: 'system-font',
        fontFamilySecondary: 'Abel'
    }
}