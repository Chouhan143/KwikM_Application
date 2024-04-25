import {View, Text, Image, ImageBackground} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const OnbordingScreen1 = () => {
  const navigation = useNavigation();
  const Done = () => {
    navigation.navigate('loginMPIN');
  };

  return (
    <View style={{flex: 1}}>
      <Onboarding
        showSkip={false}
        onDone={Done}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../../assets/onboardingImg1.png')}
                style={{
                  width: responsiveWidth(90),
                  height: responsiveHeight(50),
                  resizeMode: 'contain',
                }}
              />
            ),
            title: 'Onboarding 1',
            subtitle: 'onboarding subtitle screen 1',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../../assets/onboardingImg2.png')}
                style={{
                  width: responsiveWidth(90),
                  height: responsiveHeight(50),
                  resizeMode: 'contain',
                }}
              />
            ),
            title: 'Onboarding 2',
            subtitle: 'onboarding subtitle screen 2',
          },

          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../../assets/onboardingImg3.png')}
                style={{
                  width: responsiveWidth(90),
                  height: responsiveHeight(50),
                  resizeMode: 'contain',
                }}
              />
            ),
            title: 'Onboarding 3',
            subtitle: 'onboarding subtitle screen 3',
          },
        ]}
      />
    </View>
  );
};

export default OnbordingScreen1;
