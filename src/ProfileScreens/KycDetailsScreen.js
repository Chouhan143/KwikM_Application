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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
import DocumentPicker from 'react-native-document-picker';

const KycDetailsScreen = () => {
  const navigation = useNavigation();

  let [msg, setMsg] = useState('');
  let [err, setErr] = useState('');

  const dispatch = useDispatch();
  const number = useSelector(state => state.details.number);
  const netInfo = useNetInfo();
  const [buttonIndicator, setButttonIndicator] = useState(false);
  const [aadhar, setAadhar] = useState(null);
  const [pan, setPan] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [status, setStatus] = useState(null);
  const [isAadharAvailable, setIsAadharAvailable] = useState(false);
  const [isPanAvailble, setIsPanAvailble] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  useFocusEffect(React.useCallback(() => {}, []));

  const getUserDetails = async () => {
    try {
      await AsyncStorage.getItem('user_id').then(id => {
        // console.log(JSON.parse(user_name))
        setUserId(JSON.parse(id));
      });
      await AsyncStorage.getItem('auth_token').then(token => {
        setAuthToken(JSON.parse(token));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const UploadAadhar = async () => {
    try {
      let response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      response[0] ? setIsAadharAvailable(true) : setIsAadharAvailable(false);
      setAadhar(response[0]);
    } catch (error) {
      console.warn(error);
    }
  };

  const UploadPan = async () => {
    try {
      let response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      if (response[0]) {
        setIsPanAvailble(true), setPan(response[0]);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const SubmitDocument = async () => {
    const formData = new FormData();

    if (pan === null || aadhar === null) {
      setStatus(false);
      setErr('please select aadhar card and pan card first');
      setTimeout(() => {
        setErr(null);
      }, 2000);
    } else {
      formData.append('aadhar', {
        uri: aadhar.uri,
        type: aadhar.type,
        name: aadhar.name,
      });

      formData.append('pan', {
        uri: pan.uri,
        type: pan.type,
        name: pan.name,
      });

      formData.append('user_id', userId);
      formData.append('auth_token', authToken);

      let response = await fetch('https://kwikm.in/dev_kwikm/api/add_kyc.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      let data = await response.json();
      if (data.message) {
        setStatus(true);
        setMsg(data.message);
        setTimeout(() => {
          setStatus(null);
          setMsg(null);
        }, 2000);
      } else {
        setStatus(false);
        setErr(data.error);
        setTimeout(() => {
          setStatus(null);
          setErr(null);
        }, 2000);
      }
    }
  };

  return (
    <>
      {netInfo ? (
        <View style={styles.container}>
          <StatusBar backgroundColor={'#EAFFEA'} />

          <View
            style={{
              height: responsiveHeight(10),
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
                  KYC Details
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.documentContainer}>
            <View style={styles.doucmentCardContainer}>
              <Image
                source={require('../../assets/aadhar.png')}
                style={styles.cardImg}
              />
              <Text style={styles.cardName}>Aadhar Card</Text>

              {isAadharAvailable ? (
                <TouchableOpacity
                  onPress={UploadAadhar}
                  style={styles.documentSelectedBtn}>
                  <Text
                    style={{fontSize: responsiveFontSize(1.8), color: 'white'}}>
                    Selected
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={UploadAadhar}
                  style={styles.documentUploadBtn}>
                  <Text
                    style={{fontSize: responsiveFontSize(1.8), color: 'white'}}>
                    Select Document
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.doucmentCardContainer}>
              <Image
                source={require('../../assets/pancard.png')}
                style={styles.pancardImg}
              />

              <Text style={styles.cardName}>Pan Card</Text>

              {isPanAvailble ? (
                <TouchableOpacity
                  onPress={UploadPan}
                  style={styles.documentSelectedBtn}>
                  <Text
                    style={{fontSize: responsiveFontSize(1.8), color: 'white'}}>
                    Selected
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={UploadPan}
                  style={styles.documentUploadBtn}>
                  <Text
                    style={{fontSize: responsiveFontSize(1.8), color: 'white'}}>
                    Select Document
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.submitButtonContainer}>
            {status ? (
              <View>
                <Text style={styles.apiResponseSuccessMsg}>{msg}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.apiResponseErrorMsg}>{err}</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={SubmitDocument}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Upload Documents</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    alignItems: 'center',
  },
  documentContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(65),
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  doucmentCardContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(32),
    borderRadius: responsiveWidth(3),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cardImg: {
    width: responsiveWidth(60),
    height: responsiveHeight(18),
    resizeMode: 'cover',
  },
  pancardImg: {
    width: responsiveWidth(60),
    height: responsiveHeight(18),
    resizeMode: 'cover',
  },
  cardName: {
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    fontWeight: '500',
    marginVertical: responsiveWidth(2.5),
  },
  documentUploadBtn: {
    width: responsiveWidth(60),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CB01CF',
  },
  documentSelectedBtn: {
    width: responsiveWidth(60),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  submitButtonContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    width: responsiveWidth(90),
    height: responsiveHeight(6),
    backgroundColor: '#CB01CF',
    borderRadius: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitDisableButton: {
    width: responsiveWidth(85),
    height: responsiveHeight(6.5),
    backgroundColor: 'gray',
    borderRadius: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(2.4),
    // fontWeight: '700',
  },
  apiResponseSuccessMsg: {
    fontSize: responsiveFontSize(2.2),
    color: 'green',
    marginBottom: responsiveWidth(5),
    fontWeight: '500',
  },
  apiResponseErrorMsg: {
    fontSize: responsiveFontSize(2.2),
    color: 'red',
    marginBottom: responsiveWidth(5),
    fontWeight: '500',
  },
});

export default KycDetailsScreen;
