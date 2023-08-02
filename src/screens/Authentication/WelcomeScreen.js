import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import globalStyles from '../../globals/styles'
import UserIcon from '../../assets/user.svg';
import PasswordIcon from '../../assets/PasswordIcon.svg';
import { useState } from 'react';
import { InlineButton, OutlineButton } from '../../components/Buttons';
import { REGISTER_MODAL, FORGOTTEN_PASSWORD_MODAL } from '../../globals/NavigationNames';
import { useLoginMutation } from '../../api/userQueries';
import ApiResultModal from '../../components/ApiResultModal'
import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent';
import { useApiResultReducer, ACTIONS } from '../../hooks/useApiResultReducer';
import { moderateScale } from '../../utils/scaling';
import KeyboardAwareScrollViewWrapper from '../../components/KeyboardAwareScrollView';

const WelcomeScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
    const [store, dispatch] = useApiResultReducer()

    const handleSubmit = async () => {
        try {
            const userData = await login({
                email: email.toLowerCase(),
                password,
            }).unwrap();
        } catch (err) {
            dispatch({
                type: ACTIONS.ERROR,
                status: err?.data?.status ?? "Oops something went wrong",
                message: err?.data?.message ?? "Request couldn't be fullfilled"
            })
        }
    };

    return (
        <>
            {isLoading && (
                <ApiResultModal
                    isVisible={true}
                    message={<ActivityIndicatorComponent text={"Logging in"} />}
                />
            )}
            <ApiResultModal
                isVisible={store.showResultModal}
                title={store.title}
                message={store.message}
                onConfirm={() => dispatch({ type: ACTIONS.HIDE_MODAL })}
            />

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.headerText, { textAlign: 'center' }]}>Welcome!</Text>
                    <Text
                        style={[styles.headerText, {
                            textAlign: 'center',
                            marginTop: 20,

                        }]}
                    >
                        Please sign in to access your devices
                    </Text>
                </View>
                <View style={styles.authContainer}>
                    <KeyboardAwareScrollViewWrapper>
                        <View style={styles.authFields}>
                            <View style={styles.authEmail}>
                                <Text adjustsFontSizeToFit style={styles.authTitle}>Email</Text>
                                <View style={styles.authInput}>
                                    <UserIcon width={moderateScale(25)} height={moderateScale(25)} />
                                    <TextInput
                                        adjustsFontSizeToFit
                                        placeholder="Your Email"
                                        value={email}
                                        onChangeText={setEmail}
                                        style={styles.inputs}
                                    />
                                </View>
                            </View>
                            <View style={styles.authPassword}>
                                <Text adjustsFontSizeToFit style={styles.authTitle}>Password</Text>
                                <View style={styles.authInput}>
                                    <PasswordIcon width={moderateScale(25)} height={moderateScale(25)} />
                                    <TextInput
                                        adjustsFontSizeToFit
                                        value={password}
                                        secureTextEntry
                                        onChangeText={setPassword}
                                        placeholder="Password"
                                        style={styles.inputs}
                                    />
                                </View>
                                <Pressable style={{ alignSelf: 'flex-start' }}
                                    onPress={() => navigation.navigate(FORGOTTEN_PASSWORD_MODAL)}
                                >
                                    <Text style={styles.btnForgottenPassword}>
                                        Forgot password?
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.btnContainer}>
                            <InlineButton title="Sign in" onPress={() => handleSubmit()} borderRadius={10} />
                            <OutlineButton
                                onPress={() => navigation.navigate(REGISTER_MODAL)}
                                title="Sign up"
                                borderRadius={10}
                                additionStyle={{ marginTop: 10 }}
                            />
                        </View>
                    </KeyboardAwareScrollViewWrapper>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.colorSet.PRIMARY,
        flex: 1
    },
    header: {
        paddingVertical: 10,
    },
    headerText: {
        fontSize: globalStyles.fontSizeSet.fontLarge,
        color: globalStyles.colorSet.SECONDARY,
        fontFamily: globalStyles.fontFamilySet.fontFamilySecondary,
    },
    authContainer: {
        flex: 1,
        flexGrow: 1,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: globalStyles.colorSet.SECONDARY,
        //borderWidth: 2,
        // borderColor: 'red',
    },
    authFields: {
        flex: 2,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        flexGrow: 0.7
    },
    authTitle: {
        color: globalStyles.colorSet.PRIMARY,
        fontSize: globalStyles.fontSizeSet.fontMedium,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        fontWeight: 'bold',
    },
    authEmail: {
        // flexGrow: 1
        marginVertical: moderateScale(10)
    },

    authPassword: {
        marginVertical: moderateScale(10)
        // flexGrow: 1

    },
    authInput: {
        flexDirection: 'row',
        borderBottomColor: globalStyles.colorSet.PRIMARY,
        borderBottomWidth: 0.5,
        marginTop: 5,
        alignItems: 'center',
        flexGrow: 0.32
    },
    btnForgottenPassword: {
        fontSize: globalStyles.fontSizeSet.fontRegular,
        fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        color: globalStyles.colorSet.PRIMARY,
        fontWeight: 'bold',
    },
    btnContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(10),
    },
    buttons: {
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 4,
    },
    inputs: {
        paddingLeft: 5,
        fontSize: globalStyles.fontSizeSet.fontSmall,
        width: '100%'
    },
})

export default WelcomeScreen