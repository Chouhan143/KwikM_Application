import React, {useState, useEffect, useRef, useId} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import HTML from 'react-native-render-html';
import ActivityLoader from '../OtherScreens/ActivityLoader';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [data, setData] = useState('');
  const [activityIndicator, setActivityIndicator] = useState(false);

  useEffect(() => {
    setActivityIndicator(true);
    FetchPrivacypolicy();
  }, []);

  const FetchPrivacypolicy = async () => {
    await fetch('https://kwikm.in/dev_kwikm/api/privacy_policy.php', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(policyData => {
        setActivityIndicator(false);
        setData(policyData.privacy_policy);
      });
  };

  return (
    <>
      {netInfo ? (
        <>
          {activityIndicator ? (
            <View style={{flex: 1, backgroundColor: '#EAFFEA'}}>
              <ActivityLoader />
            </View>
          ) : (
            <View style={styles.container}>
              <StatusBar backgroundColor={'#EAFFEA'} />

              <View
                style={{
                  height: responsiveHeight(8),
                  flexDirection: 'row',
                }}>
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
                      Privacy Policy
                    </Text>
                  </View>
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.policyContainer}>
                <HTML
                  source={{html: data}}
                  contentWidth={responsiveWidth(96)}
                  baseStyle={{color: 'black', lineHeight: responsiveWidth(5)}}
                />
              </ScrollView>
            </View>
          )}
        </>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAFFEA',
    // alignItems: 'center',
    // justifyContent:"center"
  },
  policyContainer: {
    flex: 1,
    margin: responsiveWidth(2),
    padding: responsiveWidth(2),
    borderRadius: responsiveWidth(3),
    backgroundColor: 'white',
    // width: responsiveWidth(96),
    // height:responsiveHeight(96)
  },
});

export default PrivacyPolicyScreen;
