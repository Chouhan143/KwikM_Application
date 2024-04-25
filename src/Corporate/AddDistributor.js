import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
  StyleSheet,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import ActivityLoader from '../OtherScreens/ActivityLoader';
import DropDownPicker from 'react-native-dropdown-picker';

const AddDistributor = () => {
  const naviagtion = useNavigation();
  const route = useRoute();
  const [full_name, setFull_Name] = useState('');
  const [mobile_nun, setMobile_Num] = useState('');
  const [email, setEmail] = useState('');
  const [mpin, setMpin] = useState('');
  const netInfo = useNetInfo();
  const [msg, setMsg] = useState('');
  const [userId, setUserId] = useState(null);
  const [storedToken, setStoredToken] = useState('');
  const [buttonStatus, setButtonStatus] = useState(true);
  const [err, setErr] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [nextScreenStatus, setNextScreenStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [addRetailer, setAddRetailer] = useState(false); //
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [choose, setChoose] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('defaultDistributorId');
  const [distributorList, setDistributorList] = useState([]);
  // const [nextScreen, setNextScreen] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      setActivityIndicator(true);
      setOpenModal(true);
      getUserDetails();
      setTimeout(() => {
        setActivityIndicator(false);
      }, 250);
      setValue('Choose a distributor');
    }, [userId, storedToken]),
  );

  useEffect(() => {
    CorporateValidation();
  }, [full_name, mobile_nun, email, mpin]);

  const getUserDetails = async () => {
    await AsyncStorage.getItem('user_id').then(user_id => {
      setUserId(JSON.parse(user_id));
      // console.log("check user id",user_id)
    });
    await AsyncStorage.getItem('auth_token').then(token => {
      setStoredToken(JSON.parse(token));
      // console.log("check token", token)
    });
  };

  const CorporateValidation = () => {
    if (
      full_name.length >= 2 &&
      mobile_nun.length == 10 &&
      mpin.length == 4 &&
      email.length >= 11
    ) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  const AddDistributor = async () => {
    const ob = {
      user_id: userId,
      name: full_name.trim(),
      phone: mobile_nun.trim(),
      email: email.trim(),
      mpin: mpin.trim(),
      upline: userId,
    };
    // console.log(ob)
    // console.log(storedToken)
    try {
      await fetch('https://kwikm.in/dev_kwikm/api/add_distributor.php', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          auth_token: storedToken,
        },
        body: JSON.stringify(ob),
      })
        .then(response => response.json())
        .then(addDistributorStatus => {
          if (addDistributorStatus.message) {
            setErrorStatus(false);
            // setNextScreenStatus(true);
            setMsg(addDistributorStatus.message);
            setTimeout(() => {
              setNextScreenStatus(true);
              setAddRetailer(false);
              setMsg('');
              setEmail('');
              setFull_Name('');
              setMpin('');
            }, 1000);
          } else if (addDistributorStatus.error) {
            console.log(addDistributorStatus);
            setErr(addDistributorStatus.error);
            setErrorStatus(true);
            setTimeout(() => {
              setNextScreenStatus(false);
              setErr('');
            }, 1000);
          }
        });
    } catch (error) {
      console.log('Catch Error: ', error);
    }
  };

  const AddRetailer = async () => {
    setAddRetailer(true);
    const ob = {
      user_id: userId,
      name: full_name.trim(),
      phone: mobile_nun.trim(),
      email: email.trim(),
      mpin: mpin.trim(),
      upline: value,
      auth_token: storedToken,
    };
    // console.log('final Object', ob);
    try {
      await fetch('https://kwikm.in/dev_kwikm/api/add_retailer.php', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // auth_token: storedToken,
        },
        body: JSON.stringify(ob),
      })
        .then(response => response.json())
        .then(addRetailerStatus => {
          // console.log(addRetailerStatus);
          if (addRetailerStatus.message) {
            setErrorStatus(false);
            // setNextScreenStatus(true);
            setMsg(addRetailerStatus.message);
            setTimeout(() => {
              setNextScreenStatus(true);
              setMsg('');
              setEmail('');
              setFull_Name('');
              setMpin('');
            }, 2000);
          } else if (addRetailerStatus.error) {
            // console.log(addDistributorStatus.error)
            setErr(addRetailerStatus.error);
            setErrorStatus(true);
            setTimeout(() => {
              setNextScreenStatus(false);
              setErr('');
            }, 2000);
          }
        });
    } catch (error) {
      console.log('Catch Error: ', error);
    }
  };

  const goBack = async () => {
    setNextScreenStatus(false);
    setMobile_Num('');
    naviagtion.navigate('Home');
  };

  const CorpAddRetailer = async () => {
    setOpenModal(false);
    setAddRetailer(true);

    let ob = {
      user_id: userId,
      auth_token: storedToken,
    };
    await fetch('https://kwikm.in/dev_kwikm/api/fetch_distributor.php', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(ob),
    })
      .then(response => response.json())
      .then(distriList => {
        // console.log(distriList);
        setDistributorList(distriList.data ? distriList.data : []);
      });
  };

  const CorpAddDistributor = () => {
    setOpenModal(false);
    setAddRetailer(false);
  };

  const handleShare = () => {
    const message = `
    📱 ${addRetailer ? 'Retailer' : 'Distributor'} Details 📱
    
    Name: ${full_name}
    Phone: ${mobile_nun}
    Email: ${email}
    Mpin: ${mpin}
    App url : "https://play.google.com/store/apps/details?id=com.kwikm.app"
    `;

    const whatsappUrl = `whatsapp://send?phone=+91${mobile_nun}&text=${encodeURIComponent(
      message,
    )}`;

    Linking.openURL(whatsappUrl).catch(err => {
      console.error('Error opening WhatsApp:', err);
      Alert.alert(
        'WhatsApp Error',
        'An error occurred while trying to open WhatsApp. Please make sure it is installed on your device.',
        [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#eaffea'}}>
      {activityIndicator ? (
        <>
          <ActivityLoader />
        </>
      ) : (
        <>
          {openModal ? (
            <>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={CorpAddRetailer}
                  style={styles.chooseItem}>
                  <Font5
                    name="user-alt"
                    size={responsiveFontSize(5)}
                    color="#A2159C"
                  />
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.5),
                        color: '#A2159C',
                        fontWeight: '700',
                        margin: responsiveWidth(3),
                        marginBottom: responsiveWidth(0),
                      }}>
                      Add
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.5),
                        color: '#A2159C',
                        fontWeight: '700',
                      }}>
                      Retailer
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={CorpAddDistributor}
                  style={styles.chooseItem}>
                  <Font5
                    name="user-alt"
                    size={responsiveFontSize(5)}
                    color="#A2159C"
                  />
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.5),
                        color: '#A2159C',
                        fontWeight: '700',
                        margin: responsiveWidth(3),
                        marginBottom: responsiveWidth(0),
                      }}>
                      Add
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.5),
                        color: '#A2159C',
                        fontWeight: '700',
                        // margin: responsiveWidth(3),
                      }}>
                      Distributor
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {netInfo ? (
                <>
                  <StatusBar backgroundColor={'#eaffea'} />

                  <View
                    style={{height: responsiveHeight(8), flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => naviagtion.goBack()}
                      style={styles.headerArrowIcone}>
                      <Font5
                        name="arrow-left"
                        color="black"
                        size={responsiveWidth(6)}
                      />
                    </TouchableOpacity>

                    <View style={styles.headerTxtContainer}>
                      <View>
                        {addRetailer ? (
                          <Text style={styles.headerTxt}>Add Retailer</Text>
                        ) : (
                          <Text style={styles.headerTxt}>Add Distributor</Text>
                        )}
                      </View>
                    </View>
                  </View>

                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    {nextScreenStatus ? (
                      <>
                        <View style={styles.nextScreenTxtContainer}>
                          {addRetailer ? (
                            <Text style={styles.nextScreenTxt}>
                              Retailer added successfully, We sent
                            </Text>
                          ) : (
                            <Text style={styles.nextScreenTxt}>
                              Distributor added successfully, We sent
                            </Text>
                          )}

                          <Text style={styles.nextScreenTxt}>
                            Whatsapp message with link.
                          </Text>
                        </View>

                        <View style={styles.nextScreenButtonContainer}>
                          <TouchableOpacity
                            onPress={goBack}
                            style={styles.nextScreenButton}>
                            <Text style={styles.nextScreenButtonTxt}>Back</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={handleShare}
                            style={styles.nextScreenButton}>
                            <Font6
                              name="share-nodes"
                              color="white"
                              size={responsiveWidth(5)}
                            />
                            <Text style={styles.nextScreenButtonTxt}>
                              Share
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <>
                        <View style={styles.formContainer}>
                          <View style={styles.textInputContainer}>
                            <View style={styles.textInputIconeContainer}>
                              <Font5
                                name="user-alt"
                                size={responsiveWidth(5.2)}
                                color="#535353"
                              />
                            </View>
                            <View style={{flex: 5}}>
                              <TextInput
                                onChangeText={text => setFull_Name(text)}
                                placeholderTextColor={'gray'}
                                style={styles.textInputfield}
                                value={full_name}
                                placeholder="Full Name"
                              />
                            </View>
                          </View>

                          <View style={styles.textInputContainer}>
                            <View style={styles.textInputIconeContainer}>
                              <Font5
                                name="phone-alt"
                                size={responsiveWidth(5.5)}
                                color="#535353"
                              />
                            </View>
                            <View style={{flex: 5}}>
                              <TextInput
                                onChangeText={text => setMobile_Num(text)}
                                placeholderTextColor={'gray'}
                                style={styles.textInputfield}
                                keyboardType="numeric"
                                value={mobile_nun}
                                maxLength={10}
                                placeholder="Mobile Number"
                              />
                            </View>
                          </View>

                          <View style={styles.textInputContainer}>
                            <View style={styles.textInputIconeContainer}>
                              <Font
                                name="envelope"
                                size={responsiveWidth(5.5)}
                                color="#535353"
                              />
                            </View>
                            <View style={{flex: 5}}>
                              <TextInput
                                onChangeText={text => setEmail(text)}
                                style={styles.textInputfield}
                                value={email}
                                placeholder="Email Address"
                                placeholderTextColor={'gray'}
                              />
                            </View>
                          </View>

                          <View style={styles.textInputContainer}>
                            <View style={styles.textInputIconeContainer}>
                              <Font5
                                name="lock"
                                size={responsiveWidth(5.5)}
                                color="#535353"
                              />
                            </View>
                            <View style={{flex: 5}}>
                              <TextInput
                                onChangeText={text => setMpin(text)}
                                style={styles.textInputfield}
                                keyboardType="numeric"
                                value={mpin}
                                placeholder="MPIN"
                                maxLength={4}
                                placeholderTextColor={'gray'}
                              />
                            </View>
                          </View>

                          {addRetailer ? (
                            <DropDownPicker
                              placeholder="Select Distributor"
                              open={open}
                              value={value}
                              items={distributorList}
                              // items={
                              //   distributorList.length > 0 ? (
                              //     distributorList.map(item => ({
                              //       label: item.name.trim(),
                              //       value: item.id.toString(),
                              //       key: item.id.toString(),
                              //     }))
                              //   ) : (
                              //     <Text>no record found</Text>
                              //   )
                              // }
                              setOpen={setOpen}
                              setValue={setValue}
                              setItems={setDistributorList}
                              style={styles.dropDownStyle}
                              dropDownContainerStyle={styles.dropDownStyle}
                              textStyle={{
                                fontSize: responsiveFontSize(2),
                                color: 'black',
                              }}
                              defaultValue={'defaultDistributorId'}
                            />
                          ) : // <Text>Not found</Text>
                          null}
                        </View>

                        <View
                          style={{
                            width: responsiveWidth(100),
                            height: responsiveHeight(30),
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor:"red"
                          }}>
                          {errorStatus ? (
                            <View
                              style={{
                                height: responsiveHeight(5),
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: 'red',
                                  fontSize: responsiveFontSize(2),
                                  // marginBottom:responsiveWidth(3)
                                }}>
                                {err}
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                height: responsiveHeight(5),
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: 'green',
                                  fontSize: responsiveFontSize(2),
                                  // marginBottom:responsiveWidth(2)
                                }}>
                                {msg}
                              </Text>
                            </View>
                          )}

                          {buttonStatus ? (
                            <TouchableOpacity
                              onPress={
                                addRetailer ? AddRetailer : AddDistributor
                              }
                              style={{
                                width: responsiveWidth(80),
                                height: responsiveHeight(6),
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#A2159C',
                                borderRadius: responsiveWidth(10),
                              }}>
                              <Text
                                style={{
                                  fontSize: responsiveFontSize(2),
                                  color: 'white',
                                  fontWeight: '700',
                                }}>
                                Continue
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              disabled
                              style={{
                                width: responsiveWidth(80),
                                height: responsiveHeight(6),
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'gray',
                                borderRadius: responsiveWidth(10),
                              }}>
                              <Text
                                style={{
                                  fontSize: responsiveFontSize(2),
                                  color: 'white',
                                  fontWeight: '700',
                                }}>
                                Continue
                              </Text>
                            </TouchableOpacity>
                          )}

                          <View
                            style={{
                              marginTop: responsiveWidth(3),
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <Font
                              name="whatsapp"
                              color="#02A208"
                              size={responsiveWidth(5)}
                            />
                            <Text
                              style={{
                                fontSize: responsiveFontSize(1.8),
                                color: 'black',
                                marginLeft: responsiveWidth(4),
                              }}>
                              We will notify you on WhatsApp{' '}
                            </Text>
                          </View>
                        </View>
                      </>
                    )}
                  </View>
                </>
              ) : (
                <NoConnection />
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerArrowIcone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxtContainer: {
    flex: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTxt: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
    fontWeight: '700',
  },
  formContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(60),
    padding: responsiveWidth(5),
  },
  chooseItem: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    borderRadius: responsiveWidth(20),
    backgroundColor: 'white',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownStyle: {
    marginTop: responsiveWidth(4),
    fontSize: responsiveFontSize(2),
    color: 'black',
    paddingLeft: responsiveWidth(15),
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: responsiveWidth(3),
    borderColor: '#DADADA',
  },
  textInputContainer: {
    marginTop: responsiveWidth(4),
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: responsiveWidth(3),
    borderColor: '#DADADA',
  },
  textInputIconeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputfield: {
    fontSize: responsiveFontSize(2),
    color: 'black',
  },
  nextScreenTxtContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(65),
    padding: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextScreenTxt: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: '#2C582E',
  },
  nextScreenButtonContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(30),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  nextScreenButton: {
    width: responsiveWidth(44),
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A2159C',
    flexDirection: 'row',
    borderRadius: responsiveWidth(10),
  },
  nextScreenButtonTxt: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: '700',
    marginLeft: responsiveWidth(2),
  },
});

export default AddDistributor;
