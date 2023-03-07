import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Controller } from 'react-hook-form';

import globalStyles from '../globals/styles'

const UserInput = ({
  title,
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View>
      <Text style={styles.fieldTitle}>{title}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View style={[styles.fieldContainer, {
              borderBottomColor: error ? globalStyles.colorSet.red : globalStyles.colorSet.PRIMARY,
              borderBottomWidth: error ? 1 : 0.5,
            }]} >
              <TextInput
                placeholder={placeholder}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={styles.input}
                secureTextEntry={secureTextEntry}
              />
            </View>
            {error && (
              <Text style={styles.fieldErrorText}>
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldTitle: {
    color: globalStyles.colorSet.PRIMARY,
    fontSize: globalStyles.fontSizeSet.fontMedium,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontWeight: 'bold',
  },
  fieldContainer: {
    flexDirection: 'row',
    marginTop: 5,
    flexGrow: 0.32
  },
  fieldErrorText: {
    fontSize: globalStyles.fontSizeSet.fontSmall,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    color: globalStyles.colorSet.red,
    alignSelf: 'stretch',
    flexShrink: 1
  },
  input: {
    width: '100%',
    fontSize: globalStyles.fontSizeSet.fontRegular
  }
});

export default UserInput;
