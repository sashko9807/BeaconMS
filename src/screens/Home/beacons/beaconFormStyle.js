import globalStyles from '../../../globals/styles'

export default {
    heading: {
        marginLeft: 10,
        marginTop: 30,
        color: globalStyles.colorSet.PRIMARY,
        fontSize: globalStyles.fontSizeSet.fontRegular,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        fontWeight: 'bold',
    },

    messageTextArea: {
        borderWidth: 1,
        minHeight: 200,
        textAlignVertical: 'top',
        width: '100%',
        aspectRatio: 16 / 7,
        borderRadius: 10,
        borderColor: globalStyles.colorSet.PRIMARY,
        fontSize: globalStyles.fontSizeSet.fontRegular,
        paddingHorizontal: 10,
    },
    informationString: {
        color: globalStyles.colorSet.gray,
        fontSize: globalStyles.fontSizeSet.fontSmall,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        fontWeight: '400',
    },

    beaconMessageInputError: {
        color: globalStyles.colorSet.red,
        alignSelf: 'stretch'
    },
}