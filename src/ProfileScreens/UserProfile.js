import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  Share,
  Image,
  BackHandler,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {useSelector} from 'react-redux';

const UserProfile = () => {
  const navigation = useNavigation();
  const [selectImage, setSelectedImage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');
  const storedUserDetailes = useSelector(state => state.details.login_data);
  const [socialIcons, setSocialIcons] = useState([]);
  // console.log('login details', storedUserDetailes);

  const openBottomSheet = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const closeBottomSheet = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    fetchSocialIcons();
    setSelectedImage(storedUserDetailes.image);
  }, []);

  const handleLogOut = () => {
    Alert.alert(
      'Log Out',
      'Do you want to log out?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            AsyncStorage.clear();
            // AsyncStorage.removeItem('role');
            // AsyncStorage.removeItem('user_details');
            // AsyncStorage.removeItem('login');
            navigation.navigate('loginMPIN'), BackHandler.exitApp();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const SelectProfilePhoto = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true, // Set to true for a circular crop overlay
      });

      // Access the cropped image URI
      // console.log(image)
      setSelectedImage(image.path);
      let formData = new FormData();
      formData.append('user_id', storedUserDetailes.user_id);
      if (image.path) {
        // Extract filename from the image path
        const imageName = image.path.substring(image.path.lastIndexOf('/') + 1);
        formData.append('p_image', {
          name: imageName, // Use the extracted filename as image name
          type: 'image/jpeg',
          uri: image.path,
        });
      }
      Alert.alert(
        'Upload Image',
        'Upload this selected image as profile image',
        [
          {
            text: 'Cancel',
            onPress: () => {
              // setSelectedImage('');
            },
          },
          {
            text: 'Upload',
            onPress: async () => {
              console.log('form data >>>>', formData);
              let response = await fetch(
                'https://kwikm.in/dev_kwikm/api/update_pimage.php',
                {
                  method: 'POST',
                  body: formData,
                  headers: {
                    'content-type': 'multipart/form-data',
                  },
                },
              );
              if (response.ok) {
                let data = await response.json();
                if (data.success) {
                  Alert.alert('Success', `${data.message}`, [
                    {
                      text: 'OK',
                      onPress: () => {
                        // setSelectedImage('');
                      },
                    },
                  ]);
                } else {
                  Alert.alert('Failed', `${data.message}`, [
                    {
                      text: 'OK',
                      onPress: () => {
                        // setSelectedImage('');
                      },
                    },
                  ]);
                }
                console.log('image uploaded successfully', data);
              }
            },
          },
        ],
      );
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  const ShareProfile = async () => {
    try {
      const result = await Share.share({
        message:
          'KWIKM APP: Checkout my profile on: https://play.google.com/store/apps/details?id=com.kwikm.app',
        title: 'KWIKM App',
      });

      if (result.action === Share.sharedAction) {
      } else if (result.action === Share.dismissedAction) {
        // console.log('Share cancelled');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteAccount = async () => {
    let ob = {
      user_id: storedUserDetailes.user_id,
      auth_token: storedUserDetailes.auth_token,
    };
    await fetch('https://kwikm.in/dev_kwikm/api/delete_user.php', {
      method: 'POST',
      body: JSON.stringify(ob),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          setError(true);
          AsyncStorage.clear();
          setMsg(data.message);
          setTimeout(() => {
            setMsg('');
            navigation.navigate('loginMPIN');
          }, 1000);
        } else {
          setError(false);
          setMsg(data.error);
          setTimeout(() => {
            setMsg('');
            // navigation.navigate('loginMPIN');
          }, 2000);
        }
      });
  };

  const handleGoBack = () => {
    const userRole = storedUserDetailes.role;
    switch (userRole) {
      case 1:
        navigation.navigate('corpDistributorTab');
        break;
      case 2:
        navigation.navigate('distributorTab');
        break;
      case 3:
        navigation.navigate('tabs');
        break;
      default:
        break;
    }
  };

  // Social Icons
  const fetchSocialIcons = async () => {
    await fetch('https://kwikm.in/dev_kwikm/api/social_links.php', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setSocialIcons(data));
  };

  return (
    <>
      <StatusBar backgroundColor="white" />

      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{height: responsiveHeight(8), flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleGoBack} style={styles.headerIcone}>
            <Font5 name="arrow-left" color="black" size={responsiveWidth(6)} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <View>
              <Text style={styles.headerTitleTxt}>My Profile</Text>
            </View>
          </View>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <LinearGradient
            colors={['#CDCDCD', '#7E7E7E']}
            style={{
              flexDirection: 'row',
              width: responsiveWidth(95),
              height: responsiveHeight(15),
              borderRadius: responsiveWidth(3),
            }}>
            <View
              style={{
                flex: 1.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {selectImage ? (
                <Image
                  source={{
                    uri: selectImage,
                  }}
                  style={{
                    width: responsiveWidth(22),
                    height: responsiveWidth(22),
                    borderRadius: responsiveWidth(11),
                    backgroundColor: '#EF940B',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              ) : (
                <View
                  style={{
                    width: responsiveWidth(22),
                    height: responsiveWidth(22),
                    borderRadius: responsiveWidth(11),
                    backgroundColor: '#EF940B',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Font5
                    name="user-alt"
                    color="#5E5E5E"
                    size={responsiveWidth(7.5)}
                  />
                </View>
              )}
              <TouchableOpacity
                onPress={SelectProfilePhoto}
                style={{
                  width: responsiveWidth(8),
                  height: responsiveWidth(8),
                  borderRadius: responsiveWidth(4),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#EFEFEF',
                  position: 'absolute',
                  top: 70,
                  left: 70,
                }}>
                <Font5
                  name="camera"
                  size={responsiveWidth(4)}
                  color="#BCBCBC"
                />
              </TouchableOpacity>
            </View>

            <View style={{flex: 2, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  color: 'white',
                  fontWeight: '700',
                }}>
                Name - {storedUserDetailes.name}
              </Text>

              {storedUserDetailes.role === 1 ? (
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    color: 'white',
                    fontWeight: '400',
                  }}>
                  Corp Code: {storedUserDetailes.user_id}
                </Text>
              ) : storedUserDetailes.role === 2 ? (
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    color: 'white',
                    fontWeight: '400',
                  }}>
                  Dist Code: {storedUserDetailes.user_id}
                </Text>
              ) : storedUserDetailes.role === 3 ? (
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.9),
                    color: 'white',
                    fontWeight: '400',
                  }}>
                  Partner Code: {storedUserDetailes.user_id}
                </Text>
              ) : null}

              <Text
                style={{
                  fontSize: responsiveFontSize(1.9),
                  color: 'white',
                  fontWeight: '400',
                }}>
                Number - {storedUserDetailes.user_number}
              </Text>
              {/* <Text
                style={{
                  fontSize: responsiveFontSize(1.9),
                  color: 'white',
                  fontWeight: '400',
                }}>
                Email - abc@gmail.com
              </Text> */}
            </View>

            <View
              style={{
                flex: 0.5,
                alignItems: 'center',
                padding: responsiveWidth(3),
              }}>
              <TouchableOpacity
                onPress={ShareProfile}
                style={{
                  width: responsiveWidth(10),
                  height: responsiveWidth(10),
                  borderRadius: responsiveWidth(5),
                  backgroundColor: '#CB01CF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // alignSelf: "flex-end"
                }}>
                <Font6
                  name="share-nodes"
                  color="white"
                  size={responsiveWidth(5)}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View style={{flex: 1, marginTop: responsiveWidth(3)}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('paymentSetting')}
            style={styles.userDetailsContainer}>
            <View style={styles.userDetailsContainerIconeLeft}>
              <Font5
                name="credit-card"
                color="#046218"
                size={responsiveWidth(4.5)}
              />
            </View>
            <View style={styles.userDetailsContainerTitle}>
              <Text style={styles.userDetailsContainerTitleText}>
                Payment Settings
              </Text>
            </View>
            <View style={styles.userDetailsContainerIconeRight}>
              <Font5
                name="chevron-circle-right"
                color="#046218"
                size={responsiveWidth(4.5)}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('referelScreen')}
            style={styles.userDetailsContainer}>
            <View style={styles.userDetailsContainerIconeLeft}>
              <Font
                name="code-fork"
                color="#046218"
                size={responsiveWidth(4.8)}
              />
            </View>
            <View style={styles.userDetailsContainerTitle}>
              <Text style={styles.userDetailsContainerTitleText}>Referel</Text>
            </View>
            <View style={styles.userDetailsContainerIconeRight}>
              <Font5
                name="chevron-circle-right"
                color="#046218"
                size={responsiveWidth(4.5)}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('kycDetails')}
            style={styles.userDetailsContainer}>
            <View style={styles.userDetailsContainerIconeLeft}>
              <Font5
                name="file-pdf"
                color="#046218"
                size={responsiveWidth(4.8)}
              />
            </View>
            <View style={styles.userDetailsContainerTitle}>
              <Text style={styles.userDetailsContainerTitleText}>
                KYC Details
              </Text>
            </View>
            <View style={styles.userDetailsContainerIconeRight}>
              <Font5
                name="chevron-circle-right"
                color="#046218"
                size={responsiveWidth(4.5)}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('withdrawScreen')}
            style={styles.userDetailsContainer}>
            <View style={styles.userDetailsContainerIconeLeft}>
              <Font5
                name="wallet"
                color="#046218"
                size={responsiveWidth(4.8)}
              />
            </View>
            <View style={styles.userDetailsContainerTitle}>
              <Text style={styles.userDetailsContainerTitleText}>
                Withdraw Amount
              </Text>
            </View>
            <View style={styles.userDetailsContainerIconeRight}>
              <Font5
                name="chevron-circle-right"
                color="#046218"
                size={responsiveWidth(4.5)}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('educationDetails')}
            style={styles.userDetailsContainer}>
            <View style={styles.userDetailsContainerIconeLeft}>
              <Font5
                name="book-reader"
                color="#046218"
                size={responsiveWidth(4.8)}
              />
            </View>
            <View style={styles.userDetailsContainerTitle}>
              <Text style={styles.userDetailsContainerTitleText}>
                Education Details
              </Text>
            </View>
            <View style={styles.userDetailsContainerIconeRight}>
              <Font5
                name="chevron-circle-right"
                color="#046218"
                size={responsiveWidth(4.5)}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('changeMpin')}
            style={styles.userDetailsContainer}>
            <View style={styles.userDetailsContainerIconeLeft}>
              <Font5
                name="unlock-alt"
                color="#046218"
                size={responsiveWidth(4.8)}
              />
            </View>
            <View style={styles.userDetailsContainerTitle}>
              <Text style={styles.userDetailsContainerTitleText}>M-PIN</Text>
            </View>
            <View style={styles.userDetailsContainerIconeRight}>
              <Font5
                name="chevron-circle-right"
                color="#046218"
                size={responsiveWidth(4.5)}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1.7}}>
          <View style={styles.userDetailsContainer}>
            <View style={{flex: 3, alignItems: 'center'}}>
              <Text
                style={{fontSize: responsiveFontSize(1.7), color: '#CB01CF'}}>
                OTHER LINKS
              </Text>
            </View>
            <View style={styles.userDetailsContainerTitle}></View>
            <View style={styles.userDetailsContainerIconeRight}></View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('privacyPolicy')}
            style={styles.userDetailsContainer}>
            <View style={styles.userDetailsContainerIconeLeft}>
              <Font5
                name="shield-alt"
                color="black"
                size={responsiveWidth(4.8)}
              />
            </View>
            <View style={styles.userDetailsContainerTitle}>
              <Text style={styles.userDetailsContainerTitleText}>
                Privacy Policy
              </Text>
            </View>
            <View style={styles.userDetailsContainerIconeRight}></View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('termsConditions')}
            style={styles.userDetailsContainer}>
            <View style={styles.userDetailsContainerIconeLeft}>
              <Font5
                name="shield-alt"
                color="black"
                size={responsiveWidth(4.8)}
              />
            </View>
            <View style={styles.userDetailsContainerTitle}>
              <Text style={styles.userDetailsContainerTitleText}>
                Terms & Conditions
              </Text>
            </View>
            <View style={styles.userDetailsContainerIconeRight}></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.userDetailsContainer}>
            <View style={styles.userDetailsContainerIconeLeft}>
              <Font5
                name="hand-holding-heart"
                color="black"
                size={responsiveWidth(4.8)}
              />
            </View>
            <View style={styles.userDetailsContainerTitle}>
              <Text style={styles.userDetailsContainerTitleText}>Rate us</Text>
            </View>
            <View style={styles.userDetailsContainerIconeRight}></View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openBottomSheet}
            style={styles.userDetailsContainer}>
            <View style={styles.userDetailsContainerIconeLeft}>
              <MaterialCommunity
                name="delete"
                color="red"
                size={responsiveWidth(5.5)}
              />
            </View>
            <View style={styles.userDetailsContainerTitle}>
              <Text style={styles.userDetailsContainerTitleTextDelete}>
                Delete Account
              </Text>
            </View>
            <View style={styles.userDetailsContainerIconeRight}></View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogOut}
            style={styles.userDetailsContainer}>
            <View style={styles.userDetailsContainerIconeLeft}>
              <Font5
                name="power-off"
                color="black"
                size={responsiveWidth(5.5)}
              />
            </View>
            <View style={styles.userDetailsContainerTitle}>
              <Text style={styles.userDetailsContainerTitleText}>Logout</Text>
            </View>
            <View style={styles.userDetailsContainerIconeRight}></View>
          </TouchableOpacity>

          {/* social icon */}
          <View
            style={{
              width: responsiveWidth(100),
              // marginBottom: responsiveWidth(6),
              paddingVertical: responsiveWidth(2),
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(1.9),
                color: '#CB01CF',
                marginLeft: responsiveWidth(5),
                margin: responsiveWidth(2),
              }}>
              Social Links :
            </Text>
            <FlatList
              data={socialIcons}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{
                // width: responsiveWidth(100),
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={{marginHorizontal: responsiveWidth(5)}}
                    onPress={() => Linking.openURL(item.url)}>
                    <Image
                      source={{uri: item.icon}}
                      style={{
                        width: responsiveWidth(16),
                        height: responsiveWidth(16),
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {showDeleteModal ? (
            <BottomSheet isOpen>
              <View
                style={{
                  height: responsiveHeight(33),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunity
                  name="delete-alert"
                  size={responsiveFontSize(10)}
                  color="red"
                />

                <Text
                  style={{fontSize: responsiveFontSize(2.5), color: 'black'}}>
                  Are you sure you want to
                </Text>

                <Text
                  style={{fontSize: responsiveFontSize(2.5), color: 'black'}}>
                  delete this account ?
                </Text>

                {error ? (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      marginTop: responsiveWidth(2),
                      color: 'green',
                    }}>
                    {msg}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      marginTop: responsiveWidth(2),
                      color: 'red',
                    }}>
                    {msg}
                  </Text>
                )}

                <View
                  style={{
                    width: responsiveWidth(100),
                    flexDirection: 'row',
                    height: responsiveHeight(8),
                    marginTop: responsiveWidth(4),
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={closeBottomSheet}
                    style={{
                      width: responsiveWidth(42),
                      paddingVertical: responsiveWidth(4),
                      borderRadius: responsiveWidth(10),
                      backgroundColor: '#CDCDCD',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: 'black',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={DeleteAccount}
                    style={{
                      width: responsiveWidth(42),
                      paddingVertical: responsiveWidth(4),
                      borderRadius: responsiveWidth(10),
                      backgroundColor: '#CB01CF',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: 'white',
                      }}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheet>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerIcone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitleTxt: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
    fontWeight: '700',
  },
  userDetailsContainer: {
    flexDirection: 'row',
    height: responsiveHeight(4),
    margin: responsiveWidth(2),
    marginBottom: responsiveWidth(1),
  },
  userDetailsContainerIconeLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetailsContainerIconeRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  userDetailsContainerTitle: {
    flex: 6,
    justifyContent: 'center',
  },
  userDetailsContainerTitleText: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
    fontWeight: '400',
    marginLeft: responsiveWidth(2),
  },
  userDetailsContainerTitleTextDelete: {
    fontSize: responsiveFontSize(1.8),
    color: 'red',
    fontWeight: '400',
    marginLeft: responsiveWidth(2),
  },
});

export default UserProfile;
