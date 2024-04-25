import { View, Text,StatusBar} from 'react-native'
import LottieView from 'lottie-react-native'
import { responsiveWidth,responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions'
import React from 'react'


const NoConnection = () => {
    return (
        <View>
            <>
                <StatusBar backgroundColor="#eaffea" />
                <View style={{
                    width: responsiveWidth(100),
                    height: responsiveHeight(100),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:"#eaffea"
                }}>
                    <LottieView
                        source={require("../../assets/noconnection.json")}
                        style={{ width: responsiveWidth(15), height: responsiveWidth(15) }}
                        autoPlay
                        loop
                    />
                    <Text style={{ fontSize: responsiveFontSize(2), color: 'black' }}>Check your connection... </Text>
                </View>
            </>
        </View>
    )
}

export default NoConnection