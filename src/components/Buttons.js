import { View, Text, Pressable, StyleSheet } from 'react-native';
import globalStyles from '../globals/styles'
import { moderateScale } from '../utils/scaling';

export const InlineButton = ({ onPress, title = "NO TITLE", width = '80%', height = 0, borderRadius = 0 }) => {
  return (
    <View style={{ width: width }}>
      <Pressable onPress={onPress} style={[styles.buttonInline, { borderRadius: moderateScale(borderRadius) }]}>
        <Text style={styles.buttonInlineText}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export const OutlineButton = ({ onPress, title = "NO TITLE", width = '80%', height = 0, borderRadius = 0 }) => {
  return (
    <View style={[styles.imgButtonContainer, { width: width }]}>
      <Pressable onPress={onPress} style={[styles.buttonOutline, { borderRadius: moderateScale(borderRadius) }]}>
        <Text style={styles.buttonOutlineText}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonInline: {
    backgroundColor: globalStyles.colorSet.PRIMARY,
    borderColor: globalStyles.colorSet.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: moderateScale(50)
  },

  buttonInlineText: {
    fontSize: globalStyles.fontSizeSet.fontMedium,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontWeight: 'bold',
    color: globalStyles.colorSet.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: globalStyles.colorSet.SECONDARY,
    borderColor: globalStyles.colorSet.PRIMARY,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: moderateScale(50)
  },
  buttonOutlineText: {
    fontSize: globalStyles.fontSizeSet.fontMedium,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontWeight: 'bold',
    color: globalStyles.colorSet.PRIMARY,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
