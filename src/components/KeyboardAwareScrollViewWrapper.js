
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAwareScrollViewWrapper = ({ children }) => {
    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} keyboardShouldPersistTaps>
            {children}
        </KeyboardAwareScrollView>
    )
}

export default KeyboardAwareScrollViewWrapper