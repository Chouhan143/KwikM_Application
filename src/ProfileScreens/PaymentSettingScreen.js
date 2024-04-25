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
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LottieView from 'lottie-react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {CheckBox} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityLoader from '../OtherScreens/ActivityLoader';
import {useDispatch, useSelector} from 'react-redux';
import {add_edit_bank_account_details} from '../redux/Slice';

const PaymentSettingScreen = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [bankName, setBankName] = useState('');
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [savingAccount, setSavingAccount] = useState(null);
  const [savingAccountValue, setSavingAccountValue] = useState(1);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentAccountValue, setCurrentAccountValue] = useState(null);
  const [showBottomSheet, setBottomSheet] = useState(false);
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [availableBankList, setAvailableBankList] = useState([]);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const dispatch = useDispatch();
  const editBankDetails = useSelector(state => state.details.edit_bank_account);
  const storedUserDetailes = useSelector(state => state.details.login_data);

  useFocusEffect(
    React.useCallback(() => {
      setActivityIndicator(true);
      FetchAvailableBankAccounts();
    }, [userId, authToken]),
  );

  useEffect(() => {
    Validations();
  }, [name, bankName, accountNumber, confirmAccountNumber, ifsc]);


  const Validations = () => {
    if (
      bankName.length >= 3 &&
      name.length >= 2 &&
      accountNumber.length >= 5 &&
      confirmAccountNumber.length >= 5 &&
      accountNumber == confirmAccountNumber &&
      ifsc.length >= 6 &&
      (savingAccount || currentAccount)
    ) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };


  const FetchAvailableBankAccounts = async () => {
    let ob = {
      user_id: storedUserDetailes.user_id,
      auth_token: storedUserDetailes.auth_token,
    };
    // console.log(ob)
    let availbleBank = await fetch(
      'https://kwikm.in/dev_kwikm/api/fetch_bank_details.php',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(ob),
      },
    );
    // console.log(ob);
    const data = await availbleBank.json();
    setAvailableBankList(data);
    setTimeout(() => {
      setActivityIndicator(false);
    }, 300);
  };

  const handleSavingAccountPress = () => {
    setSavingAccount(true);
    setCurrentAccount(false);
    setSavingAccountValue(1);
    // setSavingAccountValue('saving account');
    setCurrentAccountValue(null);
  };

  
  const handleCurrentAccountPress = () => {
    setCurrentAccount(true);
    setSavingAccount(false);
    setSavingAccountValue(null);
    setCurrentAccountValue(2);
    // setCurrentAccountValue('current account');
  };

  const handleAddBankAccount = async () => {
    let ob = {
      user_id: storedUserDetailes.user_id,
      auth_token: storedUserDetailes.auth_token,
      account_type: savingAccountValue
        ? savingAccountValue
        : currentAccountValue,
      bank_name: bankName,
      ac_name: name,
      ac_number: accountNumber,
      ifsc_code: ifsc,
    };
    // console.log(ob);
    const response = await fetch(
      'https://kwikm.in/dev_kwikm/api/add_bank_details.php',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(ob),
      },
    );

    const data = await response.json();
    if (data.message) {
      setMsg(data.message);
      FetchAvailableBankAccounts();
      setTimeout(() => {
        setBottomSheet(false);
        setMsg('');
      }, 1000);
    } else {
      setError(data.error);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const handleRemoveBankAccount = id => {
    const RemoveBankAccount = async () => {
      let payload = {
        user_id: storedUserDetailes.user_id,
        auth_token: storedUserDetailes.auth_token,
        id: id,
      };

      let response = await fetch(
        'https://kwikm.in/dev_kwikm/api/remove_account.php',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      let apiResponse = await response.json();
      // console.log(apiResponse);
    };

    Alert.alert('Remove Bank Account', 'Do you want to remove bank account ?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
          RemoveBankAccount(id);
          FetchAvailableBankAccounts();
        },
      },
    ]);
  };

  const handleEditBankAccount = async () => {
    setBankName(editBankDetails.bank_name);
    setName(editBankDetails.ac_name);
    setAccountNumber(editBankDetails.ac_number);
    setConfirmAccountNumber(editBankDetails.ac_number);
    setIfsc(editBankDetails.ifsc_code);

    let ob = {
      user_id: storedUserDetailes.user_id,
      auth_token: storedUserDetailes.auth_token,
      account_type: savingAccountValue
        ? savingAccountValue
        : currentAccountValue,
      bank_name: bankName,
      ac_name: name,
      ac_number: accountNumber,
      ifsc_code: ifsc,
      status: editBankDetails.status,
      id: editBankDetails.id,
    };
  
    const response = await fetch(
      'https://kwikm.in/dev_kwikm/api/edit_account.php',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(ob),
      },
    );

    const data = await response.json();
    // console.log(data);
    if (data.message) {
      FetchAvailableBankAccounts();
      setMsg(data.message);
      setTimeout(() => {
        setMsg('');
        setIsEditClicked(false);
      }, 1000);
    } else {
      setError(data.error);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  const handleSetPrimaryBankAccount = () =>{
    console.log("set as primary account")
  }


  return (
    <>
      {netInfo ? (
        <View style={styles.container}>
          <StatusBar backgroundColor={'#EAFFEA'} />

          {/* header */}
          <View
            style={{
              height: responsiveHeight(8),
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
                  Payment Settings
                </Text>
              </View>
            </View>
          </View>

          {/* linear gradient container */}
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LinearGradient
              colors={['#DB3DB8', '#3546A0']}
              style={{
                width: responsiveWidth(96),
                height: responsiveHeight(12),
                borderRadius: responsiveWidth(3),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingLeft: responsiveWidth(3),
                }}>
                <View
                  style={{
                    borderRadius: responsiveWidth(3),
                    width: responsiveWidth(20),
                    height: responsiveHeight(8),
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunity
                    name="folder-upload"
                    size={responsiveFontSize(6)}
                    color="black"
                  />
                </View>
              </View>

              <View style={{flex: 3, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    color: 'white',
                    fontWeight: '700',
                  }}>
                  Manage Account
                </Text>

                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: 'white',
                    // fontWeight: '700',
                  }}>
                  select primary account to receive money and you can change it
                  any time.
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* bank account */}
          <View style={styles.bankContainer}>
            <View style={styles.bankTitle}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  color: 'black',
                  fontWeight: '700',
                  marginBottom: responsiveWidth(4),
                }}>
                Bank Accounts
              </Text>
              <View style={styles.bankTitleBaseLine} />
            </View>

            <View style={styles.noBankFound}>
              {activityIndicator ? (
                <ActivityLoader />
              ) : (
                <>
                  {availableBankList.length > 0 ? (
                    <View style={styles.bankListContainer}>
                      <FlatList
                        data={availableBankList}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                          return (
                            <View style={styles.bankDetailesContainer}>
                              <View style={{flex: 2}}>
                                <View
                                  style={{
                                    flex: 2,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingRight: responsiveWidth(3),
                                  }}>
                                  <Text style={styles.bankDetailes_bankName}>
                                    {item.bank_name}
                                  </Text>

                                  <TouchableOpacity
                                    onPress={() => {
                                      dispatch(
                                        add_edit_bank_account_details(item),
                                      );
                                      setIsEditClicked(!isEditClicked);
                                    }}>
                                    <Font5
                                      name="edit"
                                      size={responsiveWidth(5)}
                                      color="black"
                                    />
                                  </TouchableOpacity>
                                </View>
                                <View
                                  style={{
                                    flex: 2,
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: responsiveFontSize(1.8),
                                        color: 'black',
                                        fontWeight: '500',
                                      }}>
                                      A/C No : {item.ac_number}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: responsiveFontSize(1.8),
                                        color: 'skyblue',
                                        fontWeight: '500',
                                      }}>
                                      {item.ac_name}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: responsiveFontSize(1.8),
                                        color: 'black',
                                        fontWeight: '500',
                                      }}>
                                      IFSC : {item.ifsc_code}
                                    </Text>

                                    {item.account_type == 1 ? (
                                      <Text
                                        style={{
                                          fontSize: responsiveFontSize(1.8),
                                          color: 'skyblue',
                                          fontWeight: '500',
                                        }}>
                                        Saving Account
                                      </Text>
                                    ) : (
                                      <Text
                                        style={{
                                          fontSize: responsiveFontSize(1.8),
                                          color: 'skyblue',
                                          fontWeight: '500',
                                        }}>
                                        Current Account
                                      </Text>
                                    )}
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  borderWidth: 1,
                                  borderColor: '#C9C9C9',
                                  borderBottomEndRadius: responsiveWidth(3),
                                  borderBottomStartRadius: responsiveWidth(3),
                                  flexDirection: 'row',
                                }}>
                                <TouchableOpacity
                                  onPress={handleSetPrimaryBankAccount}
                                  style={{
                                    flex: 1,
                                    // backgroundColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  }}>
                                  <Font5
                                    name="check-square"
                                    size={responsiveWidth(5)}
                                    color="green"
                                  />
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(2),
                                      color: 'green',
                                      fontWeight: '700',
                                      marginLeft: responsiveWidth(2),
                                    }}>
                                    Set As Primary
                                  </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  onPress={() =>
                                    handleRemoveBankAccount(item.id)
                                  }
                                  style={{
                                    flex: 1,
                                    // backgroundColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  }}>
                                  <Entypo
                                    name="squared-cross"
                                    size={responsiveWidth(5)}
                                    color="red"
                                  />
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(2),
                                      color: 'red',
                                      fontWeight: '400',
                                      marginLeft: responsiveWidth(2),
                                    }}>
                                    Remove Account
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => setBottomSheet(!showBottomSheet)}
                        style={{
                          width: responsiveWidth(16),
                          height: responsiveWidth(16),
                          borderRadius: responsiveWidth(8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#A2159C',
                          position: 'absolute',
                          zIndex: 1,
                          top: responsiveHeight(50),
                          left: responsiveWidth(75), // Adjusted left position
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(6),
                            color: 'white',
                          }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      <LottieView
                        source={require('../../assets/noDataFound')}
                        style={{
                          width: responsiveWidth(70),
                          height: responsiveHeight(35),
                        }}
                        loop
                      />

                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.5),
                          color: 'black',
                          fontWeight: '700',
                        }}>
                        No Bank Found...
                      </Text>

                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                          fontWeight: '400',
                        }}>
                        you have not added any bank account.
                      </Text>

                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                          fontWeight: '400',
                        }}>
                        Please add a bank account.
                      </Text>

                      <View style={{marginTop: responsiveWidth(5)}}>
                        <TouchableOpacity
                          onPress={() => setBottomSheet(!showBottomSheet)}
                          style={styles.noBankFOundBtn}>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(2),
                              color: 'white',
                              fontWeight: '700',
                            }}>
                            Add Bank Account
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </>
              )}
            </View>


            {showBottomSheet ? (
              <BottomSheet
                isOpen
                sliderMaxHeight={responsiveHeight(90)}
                initialSnap={0} // 0 indicates the closed position
                snapPoints={[0, responsiveHeight(90)]}>
                <View style={styles.addBankFormContainer}>
                  <View style={styles.addBankFormTitle}>
                    {isEditClicked ? (
                      <Text style={styles.addBankFormTitleTxt}>
                        Edit Bank Account
                      </Text>
                    ) : (
                      <Text style={styles.addBankFormTitleTxt}>
                        Add Bank Account
                      </Text>
                    )}
                  </View>

                  <View style={styles.addBankFormSubTitle}>
                    <Text style={styles.addBankFormSubTitleTxt}>
                      Name should be same as in PAN card
                    </Text>
                    <Text style={styles.addBankFormSubTitleTxt}>
                      and bank account.
                    </Text>
                  </View>

                  {/* form field */}
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.checkBoxContainer}>
                      <CheckBox
                        style={{backgroundColor: 'white', borderWidth: 0}}
                        title="Saving account"
                        checked={savingAccount}
                        onPress={handleSavingAccountPress}
                      />
                      <CheckBox
                        title="Current Account"
                        checked={currentAccount}
                        onPress={handleCurrentAccountPress}
                      />
                    </View>

                    <View style={styles.inputFieldContainer}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font
                          name="institution"
                          size={responsiveWidth(5.5)}
                          color="#535353"
                        />
                      </View>

                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Enter Bank Name"
                          placeholderTextColor={'gray'}
                          onChangeText={txt => setBankName(txt)}
                          value={bankName}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.inputFieldContainer}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font5
                          name="address-card"
                          size={responsiveWidth(5.5)}
                          color="#535353"
                        />
                      </View>

                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Name As Per Aadhar Card"
                          placeholderTextColor={'gray'}
                          value={name}
                          //   maxLength={10}
                          onChangeText={txt => setName(txt)}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.inputFieldContainer}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MaterialCommunity
                          name="bank"
                          size={responsiveWidth(6)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Account Number "
                          placeholderTextColor={'gray'}
                          value={accountNumber}
                          keyboardType="numeric"
                          onChangeText={txt => setAccountNumber(txt)}
                          //   autoCapitalize="characters"
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.inputFieldContainer}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MaterialCommunity
                          name="bank-check"
                          size={responsiveWidth(6)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Confirm Account Number"
                          placeholderTextColor={'gray'}
                          keyboardType="numeric"
                          value={confirmAccountNumber}
                          onChangeText={txt => setConfirmAccountNumber(txt)}
                          //   autoCapitalize="characters"
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.inputFieldContainer}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Entypo
                          name="code"
                          size={responsiveWidth(5.8)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="IFSC Code"
                          placeholderTextColor={'gray'}
                          autoCapitalize="characters"
                          value={ifsc}
                          onChangeText={txt => setIfsc(txt)}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: responsiveWidth(10),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {msg ? (
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'green',
                        }}>
                        {msg}
                      </Text>
                    ) : (
                      <Text
                        style={{fontSize: responsiveFontSize(2), color: 'red'}}>
                        {error}
                      </Text>
                    )}
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => setBottomSheet(false)}
                      style={styles.cancleBtn}>
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
                        onPress={
                          isEditClicked
                            ? handleEditBankAccount
                            : handleAddBankAccount
                        }
                        style={styles.saveBtn}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'white',
                            fontWeight: '700',
                          }}>
                          Save
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        disabled
                        // onPress={handleDisableBtn}
                        style={styles.saveDisabledBtn}>
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
                </View>
              </BottomSheet>
            ) : null}


            {isEditClicked ? (
              <BottomSheet
                isOpen
                sliderMaxHeight={responsiveHeight(90)}
                initialSnap={0} // 0 indicates the closed position
                snapPoints={[0, responsiveHeight(90)]}>
                <View style={styles.addBankFormContainer}>
                  <View style={styles.addBankFormTitle}>
                    <Text style={styles.addBankFormTitleTxt}>
                      Edit Bank Account
                    </Text>
                  </View>

                  <View style={styles.addBankFormSubTitle}>
                    <Text style={styles.addBankFormSubTitleTxt}>
                      Name should be same as in PAN card
                    </Text>
                    <Text style={styles.addBankFormSubTitleTxt}>
                      and bank account.
                    </Text>
                  </View>

                  {/* form field */}
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.checkBoxContainer}>
                      <CheckBox
                        style={{backgroundColor: 'white', borderWidth: 0}}
                        title="Saving account"
                        checked={savingAccount}
                        onPress={handleSavingAccountPress}
                      />
                      <CheckBox
                        title="Current Account"
                        checked={currentAccount}
                        onPress={handleCurrentAccountPress}
                      />
                    </View>

                    <View style={styles.inputFieldContainer}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font
                          name="institution"
                          size={responsiveWidth(5.5)}
                          color="#535353"
                        />
                      </View>

                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Enter Bank Name"
                          placeholderTextColor={'gray'}
                          onChangeText={txt => setBankName(txt)}
                          value={bankName}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.inputFieldContainer}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font5
                          name="address-card"
                          size={responsiveWidth(5.5)}
                          color="#535353"
                        />
                      </View>

                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Name As Per Aadhar Card"
                          placeholderTextColor={'gray'}
                          value={name}
                          //   maxLength={10}
                          onChangeText={txt => setName(txt)}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.inputFieldContainer}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MaterialCommunity
                          name="bank"
                          size={responsiveWidth(6)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Account Number "
                          placeholderTextColor={'gray'}
                          value={accountNumber}
                          keyboardType="numeric"
                          onChangeText={txt => setAccountNumber(txt)}
                          //   autoCapitalize="characters"
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.inputFieldContainer}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MaterialCommunity
                          name="bank-check"
                          size={responsiveWidth(6)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="Confirm Account Number"
                          placeholderTextColor={'gray'}
                          keyboardType="numeric"
                          value={confirmAccountNumber}
                          onChangeText={txt => setConfirmAccountNumber(txt)}
                          //   autoCapitalize="characters"
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.inputFieldContainer}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Entypo
                          name="code"
                          size={responsiveWidth(5.8)}
                          color="#535353"
                        />
                      </View>
                      <View style={{flex: 5, justifyContent: 'center'}}>
                        <TextInput
                          placeholder="IFSC Code"
                          placeholderTextColor={'gray'}
                          autoCapitalize="characters"
                          value={ifsc}
                          onChangeText={txt => setIfsc(txt)}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: responsiveWidth(10),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {msg ? (
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'green',
                        }}>
                        {msg}
                      </Text>
                    ) : (
                      <Text
                        style={{fontSize: responsiveFontSize(2), color: 'red'}}>
                        {error}
                      </Text>
                    )}
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => setIsEditClicked(false)}
                      style={styles.cancleBtn}>
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
                        onPress={handleEditBankAccount}
                        style={styles.saveBtn}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'white',
                            fontWeight: '700',
                          }}>
                          Save
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        disabled
                        // onPress={handleDisableBtn}
                        style={styles.saveDisabledBtn}>
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
                </View>
              </BottomSheet>
            ) : null}


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
  },
  bankContainer: {
    flex: 6,
  },
  bankTitle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bankTitleBaseLine: {
    width: responsiveWidth(100),
    height: 2,
    backgroundColor: '#CB01CF',
    borderRadius: responsiveWidth(2),
  },
  noBankFound: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBankFOundBtn: {
    width: responsiveWidth(70),
    height: responsiveHeight(6),
    backgroundColor: '#CB01CF',
    borderRadius: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBankFormContainer: {
    height: responsiveHeight(90),
  },
  addBankFormTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBankFormTitleTxt: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
    fontWeight: '700',
  },
  addBankFormSubTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveWidth(2),
    marginBottom: responsiveWidth(3),
  },
  addBankFormSubTitleTxt: {
    fontSize: responsiveFontSize(1.8),
  },
  checkBoxContainer: {
    flexDirection: 'row',
    width: responsiveWidth(96),
    // height:responsiveHeight(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveWidth(4),
    // backgroundColor:"red"
  },
  inputFieldContainer: {
    width: responsiveWidth(94),
    height: responsiveHeight(6),
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: responsiveWidth(3),
    marginVertical: responsiveWidth(3),
    borderWidth: 1,
    borderColor: '#BCB4B4',
  },
  buttonContainer: {
    flex: 0.8,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cancleBtn: {
    width: responsiveWidth(43),
    paddingVertical: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDCDCD',
    borderRadius: responsiveWidth(10),
  },
  saveBtn: {
    width: responsiveWidth(43),
    paddingVertical: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CB01CF',
    borderRadius: responsiveWidth(10),
  },
  saveDisabledBtn: {
    width: responsiveWidth(43),
    paddingVertical: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: responsiveWidth(10),
  },
  bankDetailesContainer: {
    width: responsiveWidth(96),
    height: responsiveHeight(20),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: responsiveWidth(3),
    marginVertical: responsiveWidth(2),
  },
  bankListContainer: {
    // flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(70),
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: responsiveWidth(5),
  },
  bankDetailes_bankName: {
    fontSize: responsiveFontSize(2.2),
    color: 'black',
    fontWeight: '700',
    marginLeft: responsiveWidth(5),
  },
});

export default PaymentSettingScreen;
