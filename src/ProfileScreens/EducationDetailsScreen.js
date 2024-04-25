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
import Feather from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';

const EducationDetailsScreen = () => {
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
  const [isDocumentSelected, setIsDocumentSelected] = useState(false);
  const [certificate, setCertificate] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
    }, [userId, authToken]),
  );

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

  const UploadCertificate = async () => {
    try {
      let response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      if (response[0]) {
        setIsDocumentSelected(true);
        setCertificate(response[0]);
      } else {
        setStatus(false);
        isDocumentSelected(false);
        setErr('Please select a document');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const SubmitDocument = async () => {
    const formData = new FormData();

    if (certificate === null) {
      setStatus(false);
      setErr('please select certificate to upload');
      setTimeout(() => {
        setErr(null);
      }, 2000);
    } else {
      formData.append('image', {
        uri: certificate.uri,
        type: certificate.type,
        name: certificate.name,
      });

      formData.append('user_id', userId);
      formData.append('auth_token', authToken);

      console.log(formData);

      let response = await fetch(
        'https://kwikm.in/dev_kwikm/api/add_education.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      let data = await response.json();
      console.log(data);
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
                  Education Details
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: responsiveWidth(100),
              height: responsiveHeight(5),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: 'black',
                marginLeft: responsiveWidth(5),
                fontWeight: '500',
              }}>
              Please upload your 10th/12th certificate
            </Text>
          </View>

          <TouchableOpacity
            onPress={UploadCertificate}
            style={styles.documentContainer}>
            <Feather
              name="upload-cloud"
              size={responsiveFontSize(6)}
              color={'gray'}
            />
            {isDocumentSelected ? (
              <Text style={{fontSize: responsiveFontSize(2.4), color: 'green'}}>
                Document Selected
              </Text>
            ) : (
              <Text style={{fontSize: responsiveFontSize(2.4)}}>Upload</Text>
            )}
          </TouchableOpacity>

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
              <Text style={styles.submitButtonText}>Upload certificate</Text>
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
    width: responsiveWidth(92),
    height: responsiveHeight(16),
    borderRadius: responsiveWidth(3),
    borderStyle: 'dashed',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentSelectedBtn: {
    width: responsiveWidth(25),
    height: responsiveHeight(4),
    borderRadius: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  submitButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: responsiveWidth(10),
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

export default EducationDetailsScreen;
