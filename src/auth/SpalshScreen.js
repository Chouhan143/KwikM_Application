import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Animated, {Easing, ZoomIn} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Netinfo from '@react-native-community/netinfo';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    getLoginStatus();
  }, []);

  const getLoginStatus = async () => {
    try {
      const storedStatus = await AsyncStorage.getItem('login');
      const position = await AsyncStorage.getItem('role');
      const usersRole = JSON.parse(position);
      // console.log(position)
      if (JSON.parse(storedStatus)) {
        // set userRole in below if condition
        switch (usersRole) {
          case 1:
            setTimeout(() => {
              navigation.navigate('corpDistributorTab');
              // console.log("aaa")
            }, 1500);
            break;
          case 2:
            setTimeout(() => {
              navigation.navigate('distributorTab');
              // console.log("bbbb")
            }, 1500);
            break;
          case 3:
            setTimeout(() => {
              navigation.navigate('tabs');
              // console.log("cccc")
            }, 1500);
            break;
          default:
            setTimeout(() => {
              navigation.navigate('loginMPIN');
            }, 1500);
            break;
        }
      } else {
        setTimeout(() => {
          navigation.navigate('loginMPIN');
        }, 1500);

        // setStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Animated.View entering={ZoomIn.duration(1500).easing(Easing.ease)}>
        <Image
          source={{
            uri: 'https://kwikm.in/live/images/app-logo.png',
          }}
          style={{
            width: responsiveWidth(50),
            height: responsiveHeight(50),
            resizeMode: 'contain',
          }}
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
