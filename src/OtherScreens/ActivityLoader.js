import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const ActivityLoader = () => {
    // variables 
    return (

        <>
            <StatusBar backgroundColor="#EAFFEA" />
            <View style={{ flex: 1, borderRadius: responsiveWidth(3), justifyContent: "center", alignItems: "center" }}>
                <LottieView
                    source={require("../../assets/apploader.json")}
                    style={{ width: responsiveWidth(10), height: responsiveHeight(10) }}
                    autoPlay
                    loop
                />
            </View>
        </>

    )
}

export default ActivityLoader