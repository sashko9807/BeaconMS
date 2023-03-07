import { StyleSheet } from "react-native";
import globalStyles from '../../globals/styles'

export const commonStyle = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.colorSet.PRIMARY,
        flex: 1
    },
    header: {
        paddingVertical: 10,
    },
    headerText: {
        fontSize: globalStyles.fontSizeSet.fontLarge,
        color: globalStyles.colorSet.SECONDARY,
        fontFamily: globalStyles.fontFamilySet.fontFamilySecondary,
    },
    authContainer: {
        flex: 1,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: globalStyles.colorSet.SECONDARY,
        //borderWidth: 2,
        // borderColor: 'red',
    },
    authFields: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 3,
    },
    authTitle: {
        color: globalStyles.colorSet.PRIMARY,
        fontSize: globalStyles.fontSizeSet.fontMedium,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        fontWeight: 'bold',
    },
    authInput: {
        flexDirection: 'row',
        borderBottomColor: globalStyles.colorSet.PRIMARY,
        borderBottomWidth: 0.5,
        marginTop: 5,
    },
    inputs: {
        width: '100%',
        paddingLeft: 5,
        fontSize: globalStyles.fontSizeSet.fontSmall
    },
})