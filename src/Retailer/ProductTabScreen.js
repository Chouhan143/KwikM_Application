import { View, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Font6 from "react-native-vector-icons/FontAwesome6"
import Font5 from "react-native-vector-icons/FontAwesome5"
import Font from "react-native-vector-icons/FontAwesome"
import { useNavigation, useRoute } from '@react-navigation/native'
import ActivityLoader from '../OtherScreens/ActivityLoader'
import useNetInfo from '../OtherScreens/useNetInfo'
import NoConnection from '../OtherScreens/NoConnection'
import { addCategoryId, addProductId } from '../redux/Slice'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'



const ProductTabScreen = () => {

    const navigation = useNavigation()
    const netInfo = useNetInfo()
    const [browse_Category, setBrowseCategory] = useState([])
    const dispatch = useDispatch()
    const [activityIndicator, setActivityIndicator] = useState(false)


    useEffect(() => {
        setActivityIndicator(true)
        browse_Category_Products()
    }, [])

    const browse_Category_Products = () => {

        // console.log("browse_Category_Products")
        fetch("https://kwikm.in/dev_kwikm/api/allcategory.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "iv": "cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09",
                "x-api-key": "SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==",
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data.data)
                setActivityIndicator(false)
                setBrowseCategory(data.data)
            })
    }


    return (
        <>
            {activityIndicator ?
                <View style={{ flex: 1, backgroundColor: "#eaffea" }}>
                    <ActivityLoader />
                </View>
                :
                <View style={{ flex: 1, backgroundColor: "#eaffea" }}>
                    {netInfo ?
                        <ScrollView style={{ flex: 1 }}>
                            <StatusBar backgroundColor={"#eaffea"} />

                            <View style={{ height: responsiveHeight(8), flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                                >
                                    <Font5 name="arrow-left" color="black" size={responsiveWidth(6)} />
                                </TouchableOpacity>
                                <View style={{
                                    flex: 6,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize: responsiveFontSize(2.5),
                                            color: "black", fontWeight: "700"
                                        }}
                                        >Product Categories</Text>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        marginLeft: responsiveWidth(5),
                                        fontSize: responsiveFontSize(2.2),
                                        color: "black"
                                    }}
                                >Select from categories to sell</Text>
                            </View>

                            {/* static products */}
                            <View
                                style={{
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    margin: responsiveWidth(2),
                                    marginBottom: responsiveWidth(0)
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("apkSubscription")
                                    }}
                                    style={{
                                        width: responsiveWidth(44),
                                        height: responsiveHeight(24),
                                        backgroundColor: "#BFFFDA",
                                        borderRadius: responsiveWidth(3),
                                        margin: responsiveWidth(2), // Add margin to create space between items
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderWidth: 0.5,
                                        borderColor: "#C9C9C9"
                                    }}
                                >
                                    <View style={{
                                        marginVertical: responsiveWidth(5)
                                    }}>
                                        <Font name="star" size={responsiveWidth(10)} color="#A2159C" />
                                    </View>

                                    <Text style={{
                                        fontSize: responsiveFontSize(2.1),
                                        color: "black", fontWeight: "700"
                                    }}>APK subscription</Text>
                                    <Text style={{ color: "black", fontSize: responsiveFontSize(1.8) }}>Earn Upto 150 Rs.</Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("insuaranceProducts")
                                    }}
                                    style={{
                                        width: responsiveWidth(44),
                                        height: responsiveHeight(24),
                                        backgroundColor: "#BFFFDA",
                                        borderRadius: responsiveWidth(3),
                                        margin: responsiveWidth(2), // Add margin to create space between items
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderWidth: 0.5,
                                        borderColor: "#C9C9C9"
                                    }}
                                >
                                    <View style={{
                                        marginVertical: responsiveWidth(5)
                                    }}>
                                        <Font6 name="hand-holding-hand" size={responsiveWidth(10)} color="#A2159C" />
                                    </View>

                                    <Text style={{
                                        fontSize: responsiveFontSize(2.1),
                                        color: "black", fontWeight: "700"
                                    }}>Insuarance</Text>
                                    <Text style={{ color: "black", fontSize: responsiveFontSize(1.8) }}>Earn Upto 150 Rs.</Text>

                                </TouchableOpacity>
                            </View>


                            <View
                                style={{
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    // marginTop: responsiveWidth(0)
                                }}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <FlatList
                                        data={browse_Category}
                                        numColumns={2}
                                        renderItem={({ item }) => {
                                            const id = item.id
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        dispatch(addCategoryId(id))
                                                        navigation.navigate("products")
                                                    }}
                                                    style={{
                                                        width: responsiveWidth(44),
                                                        height: responsiveHeight(24),
                                                        backgroundColor: "#BFFFDA",
                                                        borderRadius: responsiveWidth(3),
                                                        margin: responsiveWidth(2), // Add margin to create space between items
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderWidth: 0.5,
                                                        borderColor: "#C9C9C9"
                                                    }}
                                                >
                                                    <View style={{
                                                        marginVertical: responsiveWidth(5)
                                                    }}>
                                                        <Font6 name={`${item.icon}`} size={responsiveWidth(10)} color="#A2159C" />
                                                    </View>

                                                    <Text style={{
                                                        fontSize: responsiveFontSize(2.1),
                                                        color: "black", fontWeight: "700"
                                                    }}>{item.title}</Text>
                                                    <Text style={{ color: "black", fontSize: responsiveFontSize(1.8) }}>Earn Upto {item.commission} Rs.</Text>

                                                </TouchableOpacity>
                                            );
                                        }}
                                    />
                                </View>

                            </View>

                        </ScrollView>
                        :
                        <NoConnection />
                    }

                </View>
            }


        </>
    )


}






export default ProductTabScreen