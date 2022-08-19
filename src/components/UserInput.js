import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Controller } from 'react-hook-form';

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
      <Text style={styles.textProp}>{title}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: error ? 'red' : '#6A539D',
                borderBottomWidth: error ? 1 : 0.5,
                marginTop: 5,
              }}
            >
              <TextInput
                style={{
                  flexGrow: 1,
                }}
                placeholder={placeholder}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={secureTextEntry}
              />
            </View>
            {error && (
              <Text style={{ color: 'red', alignSelf: 'stretch' }}>
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
  textProp: {
    color: '#6A539D',
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});

export default UserInput;
