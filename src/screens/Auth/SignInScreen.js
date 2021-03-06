import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-remix-icon';
import { Collapse, Alert } from "native-base"
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../../components/context';
import auth from '@react-native-firebase/auth';

const SignInScreen = ({ navigation }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        messageShow: false,
        message: '',
    });

    const { colors } = useTheme();
    const { signIn } = useContext(AuthContext);

    const textInputChange = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(val)) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(val)) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = async () => {
        if (data.email.length == 0 || data.password.length == 0) {
            setData({ ...data, messageShow: true, message: 'Giri?? bilgilerini bo?? b??rakmay??n??z!' })
            return;
        }
        else {
            try {
                let response = await auth().signInWithEmailAndPassword(data.email, data.password)
                signIn(response.user);
                if (response && response.user) {
                    navigation.navigate('StackPages')
                }
            } catch (e) {
                setData({ ...data, messageShow: true, message: 'Kullan??c?? ad?? veya ??ifre yanl????!' })
                return;
            }
            //setData({ ...data, messageShow: false, message: '' })
            //return;
        }
        // const foundUser = Users.filter(item => {
        //     return eMail == item.email && password == item.password;
        // });
        // RNSmtpMailer.sendMail({
        //     mailhost: "smtp.gmail.com",
        //     port: "465",
        //     ssl: true,
        //     username: 'ahmetazanpa@gmail.com',
        //     password: '@51@1997!Feyza#?',
        //     recipients: 'ahmetazanpa@hotmail.com',
        //     subject: "subject",
        //     htmlBody: "<h1>header</h1><p>body</p>",
        //     attachmentNames: [
        //         "image.jpg",
        //         "firstFile.txt",
        //         "secondFile.csv",
        //         "pdfFile.pdf",
        //         "zipExample.zip",
        //         "pngImage.png"
        //       ],
        // })
        // .then(success => console.log("data: ", success))
        // .catch(error => console.log("err: ", error))


    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#0e7490' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>BT DESTEK</Text>
                <Collapse isOpen={data.messageShow}>
                    <Alert status="error" w="100%" >
                        <Alert.Icon />
                        <Alert.Description>
                            {data.message}
                        </Alert.Description>
                    </Alert>
                </Collapse>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>E-Mail Adresi</Text>
                <View style={styles.action}>
                    <Icon
                        name="ri-mail-line"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="E-Mail Adresinizi Yaz??n??z"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Icon
                                name="ri-check-line"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Ge??ersiz e-mail adresi girdiniz.</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Parola</Text>
                <View style={styles.action}>
                    <Icon
                        name="ri-rotate-lock-line"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Parolan??z?? Yaz??n??z"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Icon
                                name="ri-eye-off-line"
                                color="grey"
                                size={20}
                            />
                            :
                            <Icon
                                name="ri-eye-line"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>??ifre 8 karakter uzunlu??unda olmal??d??r.</Text>
                    </Animatable.View>
                }
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={{ color: '#0e7490', marginTop: 15 }}>??ifremi Unuttum?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => loginHandle()}
                    >
                        <LinearGradient
                            colors={['#22d3ee', '#06b6d4']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Giri?? Yap</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('StackPages')}
                        style={[styles.signIn, {
                            borderColor: '#0e7490',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#0e7490'
                        }]}>Kaydolmadan Devam Et</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e7490'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 15,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
