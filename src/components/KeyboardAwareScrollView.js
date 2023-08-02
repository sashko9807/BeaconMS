import { View, Text, KeyboardAvoidingView, Keyboard, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAwareScrollViewWrapper = ({ children }) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const deviceHeight = useWindowDimensions().height - StatusBar.currentHeight
    useEffect(() => {
        function onKeyboardDidShow(e) {
            setKeyboardHeight(e.endCoordinates.height - 10);
        }

        function onKeyboardDidHide() {
            setKeyboardHeight(0);
        }

        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

        return () => {
            showSubscription.remove();
            hideSubscription.remove()
        }
    }, [])
    return (
        <KeyboardAwareScrollView style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1 }} extraHeight={keyboardHeight}>
            {children}
        </KeyboardAwareScrollView>
    )
}

export default KeyboardAwareScrollViewWrapper