import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet
}
    from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native';
import useNetInfo from './useNetInfo';
import Font6 from "react-native-vector-icons/FontAwesome6"
import Font5 from "react-native-vector-icons/FontAwesome5"


const InsuaranceProductsScreens = () => {

    const navigation = useNavigation()
    const netInfo = useNetInfo()

     
    return (

        <View style={{ flex: 1, backgroundColor: "#eaffea" }}>
            {netInfo ?
                <>
                    <StatusBar backgroundColor={"#eaffea"} />

                    <View style={{ height: responsiveHeight(8), flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                        >
                            <Font5 name="arrow-left" color="black" size={responsiveWidth(6)} />
                        </TouchableOpacity>
                        <View style={{ flex: 5, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                            <View>
                                <Text style={{ fontSize: responsiveFontSize(2.5), color: "black", fontWeight: "700" }}>Insurance Products</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center" }}>

                        <View
                            style={styles.InsuaranceProductsContainer}
                        >

                            <TouchableOpacity
                                onPress={() => navigation.navigate("purchaseInsuarance",{name:"Car"})}
                                style={styles.InsuaranceItemContainer}>
                                <View
                                    style={styles.InsuaranceItem}
                                >
                                    <Font6 name="car-rear" size={responsiveWidth(8)} color="#A2159C" />
                                </View>
                                <Text style={styles.InsuaranceItemName}>Car</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                 onPress={() => navigation.navigate("purchaseInsuarance",{name:"Commercial"})}
                                style={styles.InsuaranceItemContainer}>
                                <View
                                    style={styles.InsuaranceItem}
                                >
                                    <Font6 name="truck-moving" size={responsiveWidth(8)} color="#A2159C" />
                                </View>
                                <Text style={styles.InsuaranceItemName}>Commercial</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("purchaseInsuarance",{name:"Bike"})}
                                style={styles.InsuaranceItemContainer}>
                                <View
                                    style={styles.InsuaranceItem}
                                >
                                    <Font6 name="motorcycle" size={responsiveWidth(8)} color="#A2159C" />
                                </View>
                                <Text style={styles.InsuaranceItemName}>Bike</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("purchaseInsuarance",{name:"GCV"})}
                                style={styles.InsuaranceItemContainer}>
                                <View
                                    style={styles.InsuaranceItem}
                                >
                                    <Font6 name="caravan" size={responsiveWidth(8)} color="#A2159C" />
                                </View>
                                <Text style={styles.InsuaranceItemName}>GCV</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("purchaseInsuarance",{name:"Personal Accident"})}
                                style={styles.InsuaranceItemContainer}>
                                <View
                                    style={styles.InsuaranceItem}
                                >
                                    <Font5 name="car-crash" size={responsiveWidth(8)} color="#A2159C" />
                                </View>
                                <Text style={styles.InsuaranceItemName}>Personal Accident</Text>
                            </TouchableOpacity>

                        </View>
                    </View>


                </>
                :
                <NoConnection />
            }

        </View>


    )


}





const styles = StyleSheet.create({
    InsuaranceProductsContainer: {
        width: responsiveWidth(94),
        height: responsiveHeight(35),
        backgroundColor: "#FFFFFF",
        borderRadius: responsiveWidth(3),
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: responsiveWidth(3)
    },
    InsuaranceItemContainer: {
        width: responsiveWidth(25),
        height: responsiveHeight(12),
        // backgroundColor: "red",
        margin: responsiveWidth(3),
        justifyContent: "center",
        alignItems: "center"
    },
    InsuaranceItem: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        borderRadius: responsiveWidth(10),
        backgroundColor: "#F6F6F6",
        justifyContent: "center",
        alignItems: "center"
    },
    InsuaranceItemName: {
        fontSize: responsiveFontSize(1.8),
        margin: responsiveWidth(2),
        color: "black"
    }
});

export default InsuaranceProductsScreens