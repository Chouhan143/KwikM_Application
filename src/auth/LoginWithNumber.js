import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"
import Font5 from "react-native-vector-icons/FontAwesome5"
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addNumber } from '../redux/Slice';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';


const LoginWithNumber = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    let [phone, setPhone] = useState('')
    let [msg, setMsg] = useState('')
    let [err, setErr] = useState('')
    let [status, setStaus] = useState(null)
    const netInfo = useNetInfo()
    const [buttonIndicator, setButttonIndicator] = useState(false)


    // api
    const Submit = () => {
        setButttonIndicator(true)
        let ob = { "phone": phone }
        dispatch(addNumber(ob))
        fetch("https://kwikm.in/dev_kwikm/api/login_otp.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ob)
        })
            .then(resposne => resposne.json())
            .then(data => {

                // console.log(data)

                setStaus(data.status)
                setMsg(data.message)
                setErr(data.error)

                if (data.status) {
                    setTimeout(() => {
                        setButttonIndicator(false)
                        setPhone("")
                        setMsg('')
                        navigation.navigate("loginOtp")
                    }, 1500);
                }
                else {
                    setTimeout(() => {
                        setPhone("")
                        setErr('')
                        setButttonIndicator(false)
                    }, 1500);
                }
            })
            .catch(error => setErr(error))

    }

    // navigation

    return (
        <>
            {netInfo ?
                <View style={styles.container}>
                    <ScrollView style={{ width: responsiveWidth(100), height: responsiveHeight(90) }}>
                        <View style={styles.view1}>
                            <Image
                               source={{uri:"https://kwikm.in/live/images/top-image.png"}}
                                style={{ 
                                    width: responsiveWidth(100), 
                                    height: responsiveHeight(30), 
                                    marginTop: responsiveWidth(8) 
                                }}
                            />
                        </View>
                        <View style={styles.view2}>
                            <View style={{ width: responsiveWidth(90), height: responsiveHeight(25), alignItems: "center", justifyContent: "center" }}>
                                <View style={{ width: responsiveWidth(100) }}>
                                    <Text style={{ fontSize: responsiveFontSize(3), fontWeight: "700", color: "#8F0592", margin: responsiveWidth(4), marginLeft: responsiveWidth(8) }}>Forget MPIN</Text>
                                </View>

                                <View style={{ width: responsiveWidth(100) }}>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: "black", marginBottom: responsiveWidth(4), marginLeft: responsiveWidth(8) }}>Enter Mobile Number to Generate MPIN</Text>
                                </View>

                                <View style={{ width: responsiveWidth(85), height: responsiveHeight(7), flexDirection: "row", marginTop: responsiveWidth(5), borderRadius: responsiveWidth(3), backgroundColor: "white" }}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Font5 name="phone-alt" size={responsiveWidth(6)} color="black" />
                                    </View>
                                    <View style={{ flex: 5, justifyContent: "center" }}>
                                        <TextInput
                                            placeholder='Phone Number'
                                            keyboardType="phone-pad"
                                            onChangeText={txt => setPhone(txt)}
                                            value={phone} style={{ fontSize: responsiveFontSize(2),color:"black" }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: responsiveWidth(100), height: responsiveHeight(15), justifyContent: "center", alignItems: "center" }}>
                                <View style={{ width: responsiveWidth(100), height: responsiveHeight(15), justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity
                                        onPress={Submit}
                                        style={{ width: responsiveWidth(85), height: responsiveHeight(6.5), backgroundColor: "#0B3F70", borderRadius: responsiveWidth(3), justifyContent: "center", alignItems: "center" }}>
                                        {buttonIndicator ? <ActivityIndicator color={"white"} size={"large"} /> : <Text style={{ color: "white", fontSize: responsiveFontSize(2) }}>Send OTP</Text>}
                                    </TouchableOpacity>
                                    <View style={{ margin: responsiveWidth(3) }}>
                                        {status ?
                                            <Text style={{ fontSize: responsiveFontSize(1.8), color: "green", fontWeight: "500" }}>{msg}</Text>
                                            :
                                            <Text style={{ fontSize: responsiveFontSize(1.8), color: "red", fontWeight: "500" }}>{err}</Text>
                                        }
                                    </View>
                                </View>
                                <View style={styles.legalTextContainer}>
                                    <TouchableOpacity onPress={() => navigation.navigate("loginMPIN")}>
                                        <Text style={{ fontSize: responsiveFontSize(2), color: "#8F0592" }}>Login with MPIN</Text>
                                    </TouchableOpacity>
                                </View>
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
        // flex: 1,
        backgroundColor: 'yellow',

    },
    view1: {
        width: responsiveWidth(100),
        height: responsiveHeight(40),
        justifyContent: "center",
        alignItems: 'center',

        // backgroundColor: 'yellow',
    },
    view2: {
        width: responsiveWidth(100),
        height: responsiveHeight(62),
        backgroundColor: '#EAFFEA',
        borderTopLeftRadius: responsiveWidth(8),
        borderTopRightRadius: responsiveWidth(8),
        alignItems: "center",
    },
});

export default LoginWithNumber;
