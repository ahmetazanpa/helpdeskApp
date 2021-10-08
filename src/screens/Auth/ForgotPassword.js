import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-remix-icon';
import { Collapse, Alert } from "native-base"
import { useTheme, Snackbar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({ navigation }) => {
    const [data, setData] = useState({
        email: '',
        check_textInputChange: false,
        isValidUser: true,
        messageShow: false,
        message: '',
    });
    const { colors } = useTheme();
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);

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

    const sendMail = async () => {
        if (data.email.length == 0) {
            setData({ ...data, messageShow: true, message: 'E-Mail Adresini boş bırakmayınız!' })
            return;
        }
        else {
            try {
                await auth().sendPasswordResetEmail(data.email),
                    setVisible(true);
                    setTimeout(() => {
                        navigation.navigate('SingIn')
                    }, 3000);
            } catch (e) {
                setData({ ...data, messageShow: true, message: 'Kayıtlı E-Mail adresi bulunamadı!' })
                return;
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#0e7490' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Şifremi Unuttum</Text>
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
                        placeholder="Kayıtlı E-Mail Adresinizi Yazınız"
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
                        <Text style={styles.errorMsg}>Geçersiz e-mail adresi girdiniz.</Text>
                    </Animatable.View>
                }
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => sendMail()}
                    >
                        <LinearGradient
                            colors={['#22d3ee', '#06b6d4']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Gönder</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SingIn')}
                        style={[styles.signIn, {
                            borderColor: '#0e7490',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#0e7490'
                        }]}>Giriş Sayfasına Dön</Text>
                    </TouchableOpacity>
                    <Snackbar
                        visible={visible}
                        onDismiss={onDismissSnackBar}
                        action={{
                            label: 'Bilgi',
                            onPress: () => {
                                // Do something
                            },
                        }}>
                        Şifre resetleme linki mail adresinize gönderildi. Girişe yönlendiriliyorsunuz!
                    </Snackbar>
                </View>
            </Animatable.View>
        </View>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e7490'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 80
    },
    footer: {
        flex: 1,
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