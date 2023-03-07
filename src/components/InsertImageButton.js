import { View, Text, Pressable, TextInput } from 'react-native';
import globalStyles from '../globals/styles'
import { Controller } from 'react-hook-form';
import { moderateScale } from '../utils/scaling';

const InsertImageButton = ({
  onPress,
  name,
  control = {},
  rules = {},
  image,
  description = ''
}) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error, },
        }) => (
          <>
            {console.log(value)}
            <View style={styles.imgButtonContainer}>
              <Pressable onPress={onPress} style={[styles.button, error && { borderColor: globalStyles.colorSet.red }]}>
                <Text style={[styles.buttonText, error && { color: globalStyles.colorSet.red }]}>Choose file</Text>
              </Pressable>
            </View>
            <View style={{ marginLeft: 20 }}>
              {error &&
                <Text style={styles.TextColorErr}>{error.message}</Text>
              }
              {value ? (
                <>
                  <Text style={styles.imageName}>
                    Selected Image
                  </Text>
                  <TextInput
                    value={value}
                    style={styles.imageName}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={false}
                  />
                </>

              ) : <Text style={styles.buttonDescription}>{description}</Text>
              }
            </View>
          </>



        )}
      />
    </View>
  );
};

const styles = {
  imgButtonContainer: {
    marginLeft: 20,
    marginTop: 5,

  },

  button: {
    maxWidth: moderateScale(200),
    minHeight: moderateScale(90),
    maxHeight: moderateScale(90),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: globalStyles.colorSet.SECONDARY,
    borderColor: globalStyles.colorSet.PRIMARY,
    color: globalStyles.colorSet.PRIMARY,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontWeight: 'bold',
    color: globalStyles.colorSet.PRIMARY,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  imageName: {
    color: globalStyles.colorSet.PRIMARY,
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontWeight: 'bold',
  },
  buttonDescription: {
    color: globalStyles.colorSet.gray,
    fontSize: globalStyles.fontSizeSet.fontSmall,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary
  },
  TextColorErr: {
    color: globalStyles.colorSet.red,
    fontSize: globalStyles.fontSizeSet.fontSmall,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    alignSelf: 'stretch'
  },
};
export default InsertImageButton;
