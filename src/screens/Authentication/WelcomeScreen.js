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

const WelcomeScreen = ({ navigation }) => {
    const [email, setEmail] = useState('sashko506@gmail.com');
    const [password, setPassword] = useState('kxzkzk');

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
                        <View style={styles.buttons}>
                            <InlineButton title="Sign in" onPress={() => handleSubmit()} borderRadius={10} />
                            <OutlineButton
                                onPress={() => navigation.navigate(REGISTER_MODAL)}
                                title="Sign up"
                                borderRadius={10}
                            />
                        </View>
                    </View>
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
        flex: 4,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: globalStyles.colorSet.SECONDARY,
        flexGrow: 1
        //borderWidth: 2,
        // borderColor: 'red',
    },
    authFields: {
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
        flexGrow: 1
    },

    authPassword: {
        flexGrow: 1

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
        borderColor: 'red',
        justifyContent: 'flex-end',
        flexGrow: 2,
        alignItems: 'stretch'
    },
    buttons: {
        flexGrow: 0.2,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    inputs: {
        paddingLeft: 5,
        fontSize: globalStyles.fontSizeSet.fontSmall,
    },
})

export default WelcomeScreen