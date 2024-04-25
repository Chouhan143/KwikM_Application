import React, { useState, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"
// import { useFonts } from '@react-native-google-fonts'
import Font5 from "react-native-vector-icons/FontAwesome5"
import Font from "react-native-vector-icons/FontAwesome"
import { useNavigation } from '@react-navigation/native';
import { addDetails } from '../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';


const RegisterScreen = () => {

    // state
    let [name, setName] = useState('');
    let [phone, setPhone] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [msg, setMsg] = useState('')
    let [err, setErr] = useState('')
    const dispatch = useDispatch()
    let [status, setStaus] = useState(null)
    const navigation = useNavigation()
    const netInfo = useNetInfo()
    const [buttonIndicator, setButttonIndicator] = useState(false)


    const Submit = () => {
        setButttonIndicator(true)
        let ob = {
            "phone": phone,
            "email": email,
            "name": name,
            // "password":"12345"
        }
        dispatch(addDetails(ob))
        fetch('https://kwikm.in/dev_kwikm/api/send-otp.php', {
            method: 'POST', // Change to POST for registration
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ob),
        })
            .then(response => response.json())
            .then(data => {
                setStaus(data.status)
                setMsg(data.message)
                setErr(data.error)
                if (data.status) {
                    setTimeout(() => {
                        setButttonIndicator(false)
                        setEmail("")
                        setName("")
                        setPhone('')
                        setMsg('')
                        navigation.navigate("registerOtp")
                    }, 2000);
                }
                else {
                    setTimeout(() => {
                        setEmail("")
                        setName("")
                        setPhone('')
                        setErr('')
                        setButttonIndicator(false)
                        // navigation.navigate("registerOtp")
                    }, 2000);
                }

            })
            .catch(error => {
                // Handle any errors that occur during the API call
                setErr(error);
            });

    }


    return (
        <>
            {netInfo ?
                <View style={styles.container}>
                    <ScrollView style={{ width: responsiveWidth(100), height: responsiveHeight(100) }}>
                        <View style={styles.view1}>
                            <Image
                                source={{ uri: "https://kwikm.in/live/images/top-image.png" }}
                                style={{
                                    width: responsiveWidth(100),
                                    height: responsiveHeight(30),
                                    marginTop: responsiveWidth(8)
                                }}
                            />
                        </View>
                        <View style={styles.view2}>
                            <View style={{
                                width: responsiveWidth(90),
                                height: responsiveHeight(40),
                                alignItems: "center",
                                justifyContent: "center",
                                // marginBottom: responsiveWidth(0)
                            }}
                            >
                                <View style={{ width: responsiveWidth(85), marginBottom: responsiveWidth(3) }}>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: "700", color: "#8F0592" }}>Create Your Account</Text>
                                </View>
                                <View style={{ width: responsiveWidth(85), height: responsiveHeight(7), backgroundColor: "white", flexDirection: "row", marginTop: responsiveWidth(4), borderRadius: responsiveWidth(3) }}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Font5 name="user-alt" size={responsiveWidth(6)} color="black" />
                                    </View>
                                    <View style={{ flex: 5, justifyContent: "center" }}>
                                        <TextInput
                                            placeholder='Full Name'
                                            onChangeText={txt => setName(txt)}
                                            value={name} style={{
                                                fontSize: responsiveFontSize(2)
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={{
                                    width: responsiveWidth(85),
                                    height: responsiveHeight(7),
                                    flexDirection: "row",
                                    marginTop: responsiveWidth(3),
                                    borderRadius: responsiveWidth(3),
                                    backgroundColor: "white"
                                }}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Font5 name="phone-alt" size={responsiveWidth(6)} color="black" />
                                    </View>
                                    <View style={{ flex: 5, justifyContent: "center" }}>
                                        <TextInput 
                                        placeholder='Phone Number' 
                                        onChangeText={txt => setPhone(txt)} 
                                        value={phone} 
                                        style={{ fontSize: responsiveFontSize(2) }} 
                                        maxLength={10}
                                        />
                                    </View>
                                </View>
                                <View style={{
                                    width: responsiveWidth(85),
                                    height: responsiveHeight(7),
                                    flexDirection: "row",
                                    marginTop: responsiveWidth(3),
                                    borderRadius: responsiveWidth(3),
                                    backgroundColor: "white"
                                }}
                                >
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Font name="envelope" size={responsiveWidth(6)} color="black" />
                                    </View>
                                    <View style={{ flex: 5, justifyContent: "center" }}>
                                        <TextInput
                                            placeholder='Email'
                                            onChangeText={txt => setEmail(txt)}
                                            value={email}
                                            style={{ fontSize: responsiveFontSize(2) }}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                width: responsiveWidth(100),
                                height: responsiveHeight(10),
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            >
                                <TouchableOpacity
                                    onPress={Submit}
                                    style={{
                                        width: responsiveWidth(85),
                                        height: responsiveHeight(6.5),
                                        backgroundColor: "#0B3F70",
                                        borderRadius: responsiveWidth(3),
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    {buttonIndicator ? <ActivityIndicator size="large" color="white" /> : <Text style={{ color: "white", fontSize: responsiveFontSize(2) }}>Send OTP</Text>}
                                </TouchableOpacity>
                                <View style={{ margin: responsiveWidth(1) }}>
                                    {status ?
                                        <Text style={{ fontSize: responsiveFontSize(1.8), color: "green", fontWeight: "500" }}>{msg}</Text>
                                        :
                                        <Text style={{ fontSize: responsiveFontSize(1.8), color: "red", fontWeight: "500" }}>{err}</Text>
                                    }
                                </View>
                            </View>
                            <View style={{ width: responsiveWidth(100), height: responsiveHeight(4), flexDirection: "row", flexWrap: "wrap", padding: responsiveWidth(2), justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: 'black' }}>
                                    By continuing you agree
                                </Text>
                                <Text style={{ color: "#6E03A1" }}> Terms & Conditions</Text>
                                <Text style={{ color: "black" }}> and </Text>
                                <Text style={{ color: "#6E03A1" }}>
                                    Privacy Policy
                                </Text>
                            </View>
                            <View style={{ width: responsiveWidth(85), height: responsiveHeight(3), flexDirection: "row", paddingLeft: responsiveWidth(2), justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: responsiveFontSize(1.8), color: "black" }}>Already have an account ?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("loginMPIN")}>
                                    <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: "700", color: "#8F0592" }}> Login here</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                :
                <NoConnection />
            }
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'yellow',

    },
    view1: {
        width: responsiveWidth(100),
        height: responsiveHeight(37),
        justifyContent: "center",
        alignItems: 'center',

        // backgroundColor: 'yellow',
    },
    view2: {
        width: responsiveWidth(100),
        height: responsiveHeight(65),
        backgroundColor: '#EAFFEA',
        borderTopLeftRadius: responsiveWidth(8),
        borderTopRightRadius: responsiveWidth(8),
        alignItems: "center",
    },
});

export default RegisterScreen;
