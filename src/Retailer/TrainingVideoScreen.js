import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Font6 from "react-native-vector-icons/FontAwesome6"
import Font5 from "react-native-vector-icons/FontAwesome5"
import Font from "react-native-vector-icons/FontAwesome"
import LottieView from 'lottie-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActivityLoader from '../OtherScreens/ActivityLoader'
import { addMyDistibutorList } from '../redux/Slice'
import WebView from 'react-native-webview'


const TrainingVideoScreen = () => {

  // variables
  const navigation = useNavigation()
  const netinfo = useNetInfo()
  const [userId, setUserId] = useState(null)
  const [activityIndicator, setActivityIndicator] = useState(false)
  const [myLeadList, setLeadList] = useState([])
  const reduxMyDistributorsList = useSelector(state => state.details.myDistributorsList)
  const [auth_token, setAuth_Token] = useState("")
  const [allVideos, setAllVideos] = useState([])
  // console.log("my team",reduxMyDistributorsList)


  useEffect(() => {
    setActivityIndicator(true)
    getUserDetails()
    FetchTrainingVideo()
  }, [])

  const getUserDetails = async () => {
    await AsyncStorage.getItem("user_id").then((user_id) => {
      setUserId(JSON.parse(user_id))
    })
    await AsyncStorage.getItem("auth_token").then((auth) => {
      // console.log(auth)
      setAuth_Token(JSON.parse(auth))
    });
  }


  // Trainning Video
  const FetchTrainingVideo = async () => {
    await fetch("https://kwikm.in/dev_kwikm/api/training_videos.php", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json())
      .then(allVideoListData => {
        // console.log(allVideoListData.data)
        setActivityIndicator(false)
        setAllVideos(allVideoListData.data)
      })
  }




  return (

    <>
      {activityIndicator ?
        <View style={{ flex: 1, backgroundColor: "#eaffea" }}>
          <ActivityLoader />
        </View>
        :
        <>
          {netinfo ?
            <View
              style={{ flex: 1, backgroundColor: "#EAFFEA" }}
            >
              <StatusBar backgroundColor="#EAFFEA" />
              <View style={{ height: responsiveHeight(8), flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Font5 name="arrow-left" color="black" size={responsiveWidth(6)} />
                </TouchableOpacity>
                <View style={{ flex: 6, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                  <View>
                    <Text style={{ fontSize: responsiveFontSize(2.5), color: "black", fontWeight: "700" }}>Training Video</Text>
                  </View>
                </View>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                {allVideos.length>0?
                  <View>
                    <FlatList
                      data={allVideos}
                      showsVerticalScrollIndicator={false}
                      style={{ marginBottom: responsiveHeight(1) }}
                      renderItem={({ item }) => {
                        const videoUrl = item.url;
                        const videoId = videoUrl.split('/').pop();
                        // Construct the YouTube Embedded Player URL
                        const embeddedVideoUrl = `https://www.youtube.com/embed/${videoId}`
                        return (
                          <>
                          <View
                            style={{
                              borderRadius: responsiveWidth(3),
                              backgroundColor: 'white',
                              marginTop: responsiveWidth(5),
                              borderWidth: 0.5,
                              borderColor: 'gray', // Add a border color
                              overflow: 'hidden',
                            }}
                          >
                            {/* YouTube Video */}
                            <WebView
                              source={{ uri: embeddedVideoUrl }}
                              style={{
                                width: responsiveWidth(94), // Use 100% of the parent width
                                height: responsiveHeight(28), // Adjust the height based on your design
                                borderRadius: responsiveWidth(3),
                               
                              }}
                            />

                            {/* Video Title */}
                            <Text
                              style={{
                                fontSize: responsiveFontSize(2.2),
                                color: 'black',
                                margin: responsiveWidth(3),
                                marginTop: responsiveWidth(1),
                                alignSelf: 'flex-start',
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                        
                          </>
                        )
                      }}
                    />

                  </View>
                  :
                  <View style={{
                    height: responsiveHeight(80),
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <View>
                      <LottieView
                        source={require("../../assets/noDataFound.json")}
                        style={{ width: responsiveWidth(80), height: responsiveHeight(45) }}
                        autoPlay
                        loop
                      />
                    </View>

                    <View style={{ height: responsiveHeight(5) }}>
                      <Text style={{ color: "black", fontSize: responsiveFontSize(2.2), fontWeight: "700" }}>No Training Video Found ...</Text>
                    </View>
                  </View>

                }
              </View>

            </View>
            :
            <NoConnection />
          }
        </>
      }

    </>

  )
}

export default TrainingVideoScreen