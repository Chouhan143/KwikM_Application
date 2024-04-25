import {
  View,
  Text,
  Linking,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font6 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const ShareLead = () => {
  const navigation = useNavigation();

  const details = useSelector(state => state.details.distributor_leadMessage);
//   console.log('retailers details to share >>>>>', details);
  const handleShare = () => {
    const message = `
    📱 'Retailer' Details 📱
    
    Name: ${details.name}
    Phone: ${details.phone}
    Email: ${details.email}
    App url : "https://play.google.com/store/apps/details?id=com.kwikm.app"
    `;

    const whatsappUrl = `whatsapp://send?phone=+91${
      details.phone
    }&text=${encodeURIComponent(message)}`;

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
      <View
        style={{
          flex: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: responsiveWidth(94),
            borderRadius: responsiveWidth(3),
            backgroundColor: 'white',
          }}>
          <View
            style={{
              padding: responsiveWidth(5),
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: responsiveWidth(2),
                  paddingLeft: responsiveWidth(2),
                }}>
                <Font5
                  name="user-alt"
                  size={responsiveWidth(4)}
                  color="#686868"
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: 'black',
                    fontWeight: '700',
                    marginLeft: responsiveWidth(2),
                  }}>
                  Name -
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: 'black',
                    // fontWeight: "700",
                    marginLeft: responsiveWidth(1),
                  }}>
                  {details.name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: responsiveWidth(2),
                  paddingLeft: responsiveWidth(2),
                }}>
                <Font5
                  name="phone-alt"
                  size={responsiveWidth(4)}
                  color="#686868"
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: 'black',
                    fontWeight: '700',
                    marginLeft: responsiveWidth(2),
                  }}>
                  Phone -
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: 'black',
                    // fontWeight: "700",
                    marginLeft: responsiveWidth(1),
                  }}>
                  {details.phone}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: responsiveWidth(2),
                  paddingLeft: responsiveWidth(2),
                }}>
                <Font6
                  name="envelope"
                  size={responsiveWidth(4)}
                  color="#686868"
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: 'black',
                    fontWeight: '700',
                    marginLeft: responsiveWidth(2),
                  }}>
                  Email -
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: 'black',
                    // fontWeight: "700",
                    marginLeft: responsiveWidth(1),
                  }}>
                  {details.email}
                </Text>
              </View>
            </View>

            <View style={{marginBottom: responsiveWidth(5)}}>
              <View
                style={{
                  // flexDirection: 'row',
                  marginVertical: responsiveWidth(2),
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: 'black',
                    fontWeight: '700',
                    marginLeft: responsiveWidth(3),
                  }}>
                  App url -
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: '#0000FF',
                    // fontWeight: '600',
                    // textAlign:"center",
                    alignSelf: 'center',
                    marginLeft: responsiveWidth(1),
                  }}>
                  "https://play.google.com/store/apps/details?id=com.kwikm.app"
                </Text>
              </View>

              {/* <View
              style={{
                flexDirection: 'row',
                marginVertical: responsiveWidth(2),
                flexWrap: 'wrap',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: 'black',
                  fontWeight: '700',
                  marginLeft: responsiveWidth(3),
                }}>
                Campaign url -
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),
                  color: 'green',
                  // fontWeight: "700",
                  marginLeft: responsiveWidth(1),
                }}>
                {piceLeadDetails.campaign_url}
              </Text>
            </View> */}
            </View>
          </View>
        </View>
      </View>

      {/* button screen  */}
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: responsiveWidth(45),
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
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleShare}
          style={{
            width: responsiveWidth(45),
            height: responsiveHeight(6),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#A2159C',
            borderRadius: responsiveWidth(10),
            flexDirection: 'row',
          }}>
          <Font5 name="share-alt" color="white" size={responsiveWidth(5)} />
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              marginLeft: responsiveWidth(3),
              color: 'white',
              fontWeight: '700',
            }}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ShareLead;
