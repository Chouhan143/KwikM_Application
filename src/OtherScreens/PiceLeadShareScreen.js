import {
  View,
  Text,
  TouchableOpacity,
  Share,
  Linking,
  Alert,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcone from 'react-native-vector-icons/MaterialCommunityIcons';

const PiceLeadShareScreen = () => {
  const navigation = useNavigation();

  const piceLeadDetails = useSelector(state => state.details.pice_lead_details);
  const pice_campaign_url = useSelector(state => state.details.pice_campaign_url)
  // console.log(pice_campaign_url,"pice data");
  const handleWhatsAppOpenForRetailer = () => {

    const message = `
      📱 **Lead Details** 📱
      
      *User id:* ${piceLeadDetails.user_id} \n
      *Name:* ${piceLeadDetails.customer_name} \n
      *Phone:* ${piceLeadDetails.customer_phone} \n
      *Pan:* ${piceLeadDetails.customer_pan} \n
      *Gst:* ${piceLeadDetails.customer_gst} \n
      *Campaign Url:* ${pice_campaign_url.campaign_url} \n`;

    const whatsappUrl = `whatsapp://send?phone=+91${
      piceLeadDetails.customer_phone
    }&text=${encodeURIComponent(message)}`;

    Linking.openURL(whatsappUrl).catch(err => {
      // console.error('Error opening WhatsApp:', err);
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
                  {piceLeadDetails.customer_name}
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
                  {piceLeadDetails.customer_phone}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: responsiveWidth(2),
                  paddingLeft: responsiveWidth(2),
                }}>
                <Font5
                  name="credit-card"
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
                  Pan -
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: 'black',
                    // fontWeight: "700",
                    marginLeft: responsiveWidth(1),
                  }}>
                  {piceLeadDetails.customer_pan}
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
                  Campaign_url  -
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: '#0000FF',
                    // fontWeight: '600',
                  // textAlign:"center",
                  alignSelf:"center",
                    marginLeft: responsiveWidth(1),
                  }}>
                  {pice_campaign_url.campaign_url}
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
          onPress={handleWhatsAppOpenForRetailer}
          style={{
            width: responsiveWidth(45),
            height: responsiveHeight(6),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#A2159C',
            borderRadius: responsiveWidth(10),
            flexDirection: 'row',
          }}>
          <Font6 name="share-nodes" color="white" size={responsiveWidth(5)} />
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

export default PiceLeadShareScreen;
