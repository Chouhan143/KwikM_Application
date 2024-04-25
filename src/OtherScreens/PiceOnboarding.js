import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Fether from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import ActivityLoader from './ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from './useNetInfo';
import NoConnection from './NoConnection';
import {add_pice_campaign_url, add_pice_lead_details} from '../redux/Slice';
import { useDispatch } from 'react-redux';

const PiceOnboarding = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobile_num, setMobile_Num] = useState('');
  const [pan, setPan] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [shopOwerPhoto, setShopOwerPhoto] = useState(false);
  const [GstNumber, setGstNumber] = useState(null);
  const [activityIndicatiors, setActivityIndicatiors] = useState(false);
  const [selectedDocumentName, setSelectedDocumentName] = useState('');
  const [selectedPhotoName, setSelectedPhotoName] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState(false);
  const [user_id, setUser_Id] = useState(null);
  const netInfo = useNetInfo();
  const [buttonStatus, setButtonStatus] = useState(false);

  //error variables
  const [nameErr, setNameErr] = useState('');
  const [mobileErr, setMobileErr] = useState('');
  const [panErr, setPanErr] = useState('');
  const dispatch = useDispatch()



  useEffect(() => {
    setActivityIndicatiors(true);
    fetchData();
    setTimeout(() => {
      setActivityIndicatiors(false);
    }, 1000);
  }, []);

  useEffect(() => {
    validation();
  }, [name, mobile_num, pan, selectedPhotoName, selectedDocumentName]);

  const validation = () => {
    // console.log("validation")
    if (name.length >= 2 && mobile_num.length == 10 && pan.length == 10) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  const fetchData = async () => {
    // console.log("fetch data")
    try {
      const userId = await AsyncStorage.getItem('user_id');
      setUser_Id(JSON.parse(userId));
    } catch (error) {
      console.log(error);
    }
  };

  const SelectedBusinessDoc = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });
      // console.log(response)
      // console.log(response[0].name)
      setSelectedDocumentName(response[0].name);
      setSelectedFile(response[0]);
    } catch (err) {
      console.warn('Please select business document.');
    }
  }, []);

  const SelectedShopOwnerPhoto = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });
      setSelectedPhotoName(response[0].name);
      setShopOwerPhoto(response[0]);
    } catch (err) {
      console.warn('Please select photo with shop owner.');
    }
  };

  const Pice_Enquiry = async () => {
    setActivityIndicatiors(true);
    const formData = new FormData();
    try {
      formData.append('customer_name', name);
      formData.append('customer_phone', mobile_num);
      formData.append('customer_gst', GstNumber);
      formData.append('customer_pan', pan);
      formData.append('user_id', user_id);

      if (selectedFile) {
        formData.append('document', {
          uri: selectedFile.uri,
          name: selectedFile.name, // Assign the file name dynamically
          type: selectedFile.type, // Assign the file type dynamically
        });
      }

      if (shopOwerPhoto) {
        formData.append('photo', {
          uri: shopOwerPhoto.uri,
          name: shopOwerPhoto.name, // Assign the file name dynamically
          type: shopOwerPhoto.type, // Assign the file type dynamically
        });
      }

      // console.log(formData, "formData");

      const piceResponse = await fetch(
        'https://kwikm.in/dev_kwikm/api/pice_enquiry.php',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const responseStatus = await piceResponse.json();
      // console.log("response data>>>>",responseStatus.entered_data);
      dispatch(add_pice_lead_details(responseStatus.entered_data));
      dispatch(add_pice_campaign_url({campaign_url:responseStatus.campaign_url}))
      // console.log(responseStatus)
      if (responseStatus.message) {
        setStatus(true);
        setMsg(responseStatus.message);
        setActivityIndicatiors(false);
        
        setTimeout(() => {
          setMsg('');
          setMobile_Num('');
          setSelectedDocumentName('');
          setShopOwerPhoto('');
          setSelectedFile('');
          setPan('');
          setName('');
          setSelectedPhotoName('');
          navigation.navigate('piceLeadShareScreen');
        }, 1000);
      }
      if (responseStatus.error) {
        setActivityIndicatiors(false);
        setStatus(false);
        setMsg(responseStatus.error);
        setTimeout(() => {
          setMsg('');
          setMobile_Num('');
          setSelectedDocumentName('');
          setShopOwerPhoto('');
          setSelectedFile('');
          setPan('');
          setName('');
          setSelectedPhotoName('');
          setSelectedPhotoName('');
        }, 2000);
      }
    } catch (error) {
      console.log('Error check:', error);
    }
  };

  return (
    <>
      {netInfo ? (
        <>
          <View style={{flex: 1, backgroundColor: '#eaffea'}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{width: responsiveWidth(100)}}>
              {/* header container */}
              <View style={{height: responsiveHeight(7), flexDirection: 'row'}}>
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
                    flex: 5,
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
                      {' '}
                      Pice
                    </Text>
                  </View>
                </View>
              </View>
              {/* image container */}
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: 'https://kwikm.in/live/images/pice.png',
                  }}
                  style={{
                    width: responsiveWidth(96),
                    height: responsiveHeight(30),
                    resizeMode: 'contain',
                    borderRadius: responsiveWidth(4),
                  }}
                />
              </View>

              <View style={{flex: 2}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'black',
                      fontWeight: '700',
                      marginLeft: responsiveWidth(5),
                      margin: responsiveWidth(3),
                    }}>
                    Pice Onboarding Process
                  </Text>
                </View>
                <>
                  {/* form container */}
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    {/* name */}
                    <View
                      style={{
                        width: responsiveWidth(94),
                        height: responsiveHeight(6),
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        borderRadius: responsiveWidth(3),
                        borderWidth: 1,
                        borderColor: '#BCB4B4',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font5
                          name="user-alt"
                          size={responsiveWidth(5.5)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Full Name"
                          placeholderTextColor={'gray'}
                          onChangeText={txt => setName(txt)}
                          value={name}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <Text
                      style={{color: 'red', fontSize: responsiveFontSize(1.8)}}>
                      {nameErr}
                    </Text>
                    {/* mobile number */}
                    <View
                      style={{
                        width: responsiveWidth(94),
                        height: responsiveHeight(6),
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        borderRadius: responsiveWidth(3),
                        // marginTop: responsiveWidth(3),
                        borderWidth: 1,
                        borderColor: '#BCB4B4',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font5
                          name="phone-alt"
                          size={responsiveWidth(5.5)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Mobile Number"
                          placeholderTextColor={'gray'}
                          keyboardType="numeric"
                          value={mobile_num}
                          maxLength={10}
                          onChangeText={txt => setMobile_Num(txt)}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <Text
                      style={{color: 'red', fontSize: responsiveFontSize(1.8)}}>
                      {mobileErr}
                    </Text>
                    {/* pan card */}
                    <View
                      style={{
                        width: responsiveWidth(94),
                        height: responsiveHeight(6),
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        borderRadius: responsiveWidth(3),
                        // marginTop: responsiveWidth(3),
                        borderWidth: 1,
                        borderColor: '#BCB4B4',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font5
                          name="address-card"
                          size={responsiveWidth(5.8)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="PAN Card "
                          placeholderTextColor={'gray'}
                          value={pan}
                          onChangeText={txt => setPan(txt)}
                          maxLength={10}
                          autoCapitalize="characters"
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <Text
                      style={{color: 'red', fontSize: responsiveFontSize(1.8)}}>
                      {panErr}
                    </Text>
                    {/* gst container */}
                    <View
                      style={{
                        width: responsiveWidth(94),
                        backgroundColor: 'white',
                        borderRadius: responsiveWidth(3),
                        // marginTop: responsiveWidth(3),
                        padding: responsiveWidth(2),
                        borderWidth: 1,
                        borderColor: '#BCB4B4',
                      }}>
                      <View
                        style={{
                          padding: responsiveWidth(2),
                          paddingLeft: responsiveWidth(3),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}>
                          Does the customer have GST ? (if available){' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: '#BCB4B4',
                          borderRadius: responsiveWidth(2),
                        }}>
                        <TextInput
                          placeholder="Enter GST Number"
                          placeholderTextColor={'gray'}
                          value={GstNumber}
                          onChangeText={txt => setGstNumber(txt)}
                          style={{
                            fontSize: responsiveFontSize(2),
                            paddingLeft: responsiveWidth(5),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>
                    {/* upload business document */}
                    <View
                      style={{
                        width: responsiveWidth(94),
                        borderWidth: 1,
                        borderColor: '#BCB4B4',
                        backgroundColor: 'white',
                        borderRadius: responsiveWidth(3),
                        marginTop: responsiveWidth(3),
                        padding: responsiveWidth(3),
                      }}>
                      <View style={{paddingLeft: responsiveWidth(3)}}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}>
                          Upload Business Document.
                          <Text style={{color: 'black'}}> (optional)</Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          margin: responsiveWidth(3),
                          marginBottom: responsiveWidth(1),
                        }}>
                        <TouchableOpacity
                          onPress={SelectedBusinessDoc}
                          style={{
                            width: responsiveWidth(30),
                            paddingHorizontal: responsiveWidth(3),
                            paddingVertical: responsiveWidth(2.2),
                            borderWidth: 1,
                            borderRadius: responsiveWidth(3),
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Fether
                            name="upload"
                            size={responsiveWidth(4.5)}
                            color="#0545A6"
                          />
                          <Text
                            style={{
                              fontSize: responsiveFontSize(2),
                              color: '#0545A6',
                            }}>
                            Add file
                          </Text>
                        </TouchableOpacity>
                        <View>
                          <Text style={{color: 'green'}}>
                            {selectedDocumentName}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* upload show photo */}
                    <View
                      style={{
                        width: responsiveWidth(94),
                        borderWidth: 1,
                        borderColor: '#BCB4B4',
                        backgroundColor: 'white',
                        borderRadius: responsiveWidth(3),
                        marginTop: responsiveWidth(3),
                        padding: responsiveWidth(2),
                      }}>
                      <View
                        style={{
                          margin: responsiveWidth(3),
                          marginBottom: responsiveWidth(1),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}>
                          Photo of shop owner with shop
                          <Text style={{color: 'black'}}> (optional)</Text>
                        </Text>
                      </View>

                      <View
                        style={{
                          margin: responsiveWidth(3),
                          marginBottom: responsiveWidth(1),
                        }}>
                        <TouchableOpacity
                          onPress={SelectedShopOwnerPhoto}
                          style={{
                            width: responsiveWidth(30),
                            paddingHorizontal: responsiveWidth(3),
                            paddingVertical: responsiveWidth(2.2),
                            borderWidth: 1,
                            borderRadius: responsiveWidth(3),
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Fether
                            name="upload"
                            size={responsiveWidth(4.5)}
                            color="#0545A6"
                          />
                          <Text
                            style={{
                              fontSize: responsiveFontSize(2),
                              color: '#0545A6',
                            }}>
                            Add file
                          </Text>
                        </TouchableOpacity>
                        <View>
                          <Text style={{color: 'green'}}>
                            {selectedPhotoName}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {status ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: responsiveWidth(3),
                        paddingBottom: 0,
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'green',
                        }}>
                        {msg}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: responsiveWidth(3),
                        paddingBottom: 0,
                      }}>
                      <Text
                        style={{fontSize: responsiveFontSize(2), color: 'red'}}>
                        {msg}
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      marginTop: responsiveWidth(5),
                      paddingBottom: responsiveWidth(8),
                    }}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={{
                        width: responsiveWidth(42),
                        paddingVertical: responsiveWidth(3),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: '#0545A6',
                        borderRadius: responsiveWidth(3),
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    {buttonStatus ? (
                      <TouchableOpacity
                        onPress={Pice_Enquiry}
                        style={{
                          width: responsiveWidth(42),
                          paddingVertical: responsiveWidth(3),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#0545A6',
                          borderWidth: 1,
                          borderColor: '#0545A6',
                          borderRadius: responsiveWidth(3),
                        }}>
                        {activityIndicatiors ? (
                          <ActivityIndicator size={'small'} color={'white'} />
                        ) : (
                          <Text
                            style={{
                              fontSize: responsiveFontSize(2),
                              color: 'white',
                              fontWeight: '700',
                            }}>
                            Save
                          </Text>
                        )}
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        disabled
                        style={{
                          width: responsiveWidth(42),
                          paddingVertical: responsiveWidth(3),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'gray',
                          borderWidth: 1,
                          borderColor: '#0545A6',
                          borderRadius: responsiveWidth(3),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'white',
                            fontWeight: '700',
                          }}>
                          Save
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </>
              </View>
            </ScrollView>
          </View>
        </>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

export default PiceOnboarding;
