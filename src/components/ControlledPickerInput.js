import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';

import { Controller } from 'react-hook-form';

import globalStyles from '../globals/styles'

import { Picker } from '@react-native-picker/picker';
import { moderateScale } from '../utils/scaling';

const DataInput = ({
    title,
    control,
    name,
    rules = {},
    renderPicker = {},
    description = '',
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
                    <View style={styles.fieldContainer}>
                        {console.log(value)}
                        <View style={[styles.fieldInputs, { borderColor: error ? globalStyles.colorSet.red : globalStyles.colorSet.PRIMARY }]}>
                            <Picker
                                selectedValue={value}
                                style={[styles.pickerStyle, error && { borderColor: globalStyles.colorSet.red, color: globalStyles.colorSet.red }]}
                                onValueChange={(value) => {
                                    onChange(value);
                                }}
                            >
                                {Object.entries(renderPicker).map((currentValue, index) => {
                                    return (
                                        <Picker.Item style={{ fontSize: moderateScale(14) }} key={currentValue[0]} label={currentValue[0]} value={currentValue[1]} />
                                    )
                                })}
                            </Picker>
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


                )}
            />
        </View>
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
        flexGrow: 1,
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
    pickerStyle: {
        flex: 1,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default DataInput;
