import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';

import { Controller } from 'react-hook-form';

const DataInput = ({
  title,
  control,
  name,
  rules = {},
  placeholder,
  keyboardType = 'default',
}) => {
  return (
    <View>
      <Text style={informationString.text}>{title}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <TextInput
              style={[
                informationString.inputs,
                { borderColor: error ? 'red' : '#6A539D' },
              ]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
              placeholderTextColor={'#6A539D'}
              keyboardType={keyboardType}
            />
            {error && (
              <Text
                style={{ marginLeft: 40, color: 'red', alignSelf: 'stretch' }}
              >
                {error.message}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const informationString = new StyleSheet.create({
  text: {
    marginLeft: 10,
    marginTop: 30,
    color: '#6A539D',
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputs: {
    marginLeft: 40,
    borderWidth: 1,
    width: '80%',
    minHeight: 60,
    borderRadius: 10,
    alignContent: 'center',
    color: '#6A539D',
    borderColor: '#6A539D',
    fontSize: 15,
  },
});

export default DataInput;
