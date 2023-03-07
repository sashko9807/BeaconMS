import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';

import { Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

import globalStyles from '../globals/styles'
import { moderateScale } from '../utils/scaling';

const DataInput = ({
  title,
  control,
  name,
  rules = {},
  placeholder,
  keyboardType = 'default',
  multiline = false,
  customTextAreaStyle = {},
  description = '',
  hasPrefix = false,
  prefix = '',
}) => {
  return (
    <View>
      <Text adjustsFontSizeToFit style={styles.fieldTitle}>{title}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <View style={styles.fieldContainer}>
            <View style={[!multiline && styles.fieldInputs, { flexDirection: 'row', borderColor: error ? globalStyles.colorSet.red : globalStyles.colorSet.PRIMARY }]}>
              {hasPrefix &&
                <View style={[styles.prefixContainer, { borderColor: error ? globalStyles.colorSet.red : globalStyles.colorSet.PRIMARY }]}>
                  <Text adjustsFontSizeToFit style={[styles.prefixText, { color: error && globalStyles.colorSet.red }]}>{prefix}</Text>
                </View>
              }
              <TextInput
                style={[
                  { paddingHorizontal: 15, width: '100%', fontSize: globalStyles.fontSizeSet.fontSmall },
                  customTextAreaStyle
                ]}
                multiline={multiline}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={error ? globalStyles.colorSet.red : globalStyles.colorSet.PRIMARY}
                keyboardType={keyboardType}
              />
            </View>
            {error && (
              <Text style={styles.fieldInputTextColorErr}>
                {error.message}
              </Text>
            )}
            <Text style={styles.description}>
              {description}
            </Text>
          </View>


        )
        }
      />
    </View >
  );
};

const styles = new StyleSheet.create({
  fieldTitle: {
    marginLeft: 10,
    marginTop: 30,
    color: globalStyles.colorSet.PRIMARY,
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontWeight: 'bold',
  },
  fieldContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,

  },
  fieldInputs: {
    minHeight: moderateScale(50),
    borderWidth: 1,
    borderRadius: 10,
    color: globalStyles.colorSet.PRIMARY,
    borderColor: globalStyles.colorSet.PRIMARY,
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
  },
  prefixContainer: {
    width: '23%',
    justifyContent: 'center',
    borderRightWidth: 1,
    alignItems: 'center'
  },
  prefixText: {
    fontSize: globalStyles.fontSizeSet.fontSmall,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary
  },
  fieldInputTextColorErr: {
    color: globalStyles.colorSet.red,
    fontSize: globalStyles.fontSizeSet.fontSmall,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    alignSelf: 'stretch'
  },
  description: {
    color: globalStyles.colorSet.gray,
    fontSize: globalStyles.fontSizeSet.fontSmall,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontWeight: '400',
  },
});

export default DataInput;
