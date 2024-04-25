import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import ActivityLoader from './ActivityLoader';
import useNetInfo from './useNetInfo';
import NoConnection from './NoConnection';

const ApkSubscripton = () => {
  const navigation = useNavigation();
  const [activityIndicator, setActivityIndicator] = useState(false);
  const netInfo = useNetInfo();

  useEffect(() => {
    setActivityIndicator(true);
    setTimeout(() => {
      setActivityIndicator(false);
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#eaffea'}}>
      {netInfo ? (
        <>
          {activityIndicator ? (
            <ActivityLoader />
          ) : (
            <>
              <View style={{height: responsiveHeight(8), flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Font5
                    name="arrow-left"
                    color="black"
                    size={responsiveWidth(6)}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flex: 6,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.5),
                        color: 'black',
                        fontWeight: '700',
                      }}>
                      APK Subscriptions
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  height: responsiveHeight(15),
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('paytmScreen')}
                  style={{
                    width: responsiveWidth(46),
                    height: responsiveHeight(12),
                    borderRadius: responsiveWidth(4),
                    elevation: 2,
                    shadowColor: 'black',
                  }}>
                  <Image
                    source={{
                      uri: 'https://kwikm.in/live/images/paytm.png',
                    }}
                    style={{
                      width: responsiveWidth(46),
                      height: responsiveHeight(12),
                      borderRadius: responsiveWidth(4),
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('piceLeadScreen')}
                  style={{
                    width: responsiveWidth(46),
                    height: responsiveHeight(12),
                    borderRadius: responsiveWidth(4),
                    elevation: 2,
                    shadowColor: 'black',
                  }}>
                  <Image
                    source={{
                      uri: 'https://kwikm.in/live/images/pice.png',
                    }}
                    style={{
                      width: responsiveWidth(46),
                      height: responsiveHeight(12),
                      borderRadius: responsiveWidth(4),
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: responsiveHeight(15),
                  margin: responsiveWidth(2),
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('kwikmLeadScreen')}
                  style={{
                    width: responsiveWidth(46),
                    height: responsiveHeight(12),
                    borderRadius: responsiveWidth(4),
                    backgroundColor: 'white',
                    elevation: 2,
                    shadowColor: 'black',
                  }}>
                  <Image
                    source={{
                      uri: "https://kwikm.in/live/images/app-logo.png"
                    }}
                    style={{
                      width: responsiveWidth(46),
                      height: responsiveHeight(12),
                      borderRadius: responsiveWidth(4),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      ) : (
        <NoConnection />
      )}
    </View>
  );
};

export default ApkSubscripton;
