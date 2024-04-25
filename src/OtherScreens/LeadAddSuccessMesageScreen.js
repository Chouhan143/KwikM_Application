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
import {useSelector} from 'react-redux';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcone from 'react-native-vector-icons/MaterialCommunityIcons';

const LeadAddSuccessMesageScreen = () => {
  const leadDetails = useSelector(state => state.details.lead_details);
  const route = useRoute();
  const screenName = route.params.screen;

  const leadData = leadDetails[0];
  const leadUserDetails = leadDetails[1];
  const navigation = useNavigation();

  const handleWhatsAppOpenForRetailer = () => {
    const message = `
    📱 **Lead Details** 📱
    
    *Name:* ${leadUserDetails.full_name}
    *Phone:* ${leadUserDetails.mobile_no}
    *Email:* ${leadUserDetails.email}
    *Pan:* ${leadUserDetails.pan}
    *Lead Code:* ${leadData.data.lead_code}
    *Campaign URL:* ${leadData.data.campaign_url}
    `;

    const whatsappUrl = `whatsapp://send?phone=+91${
      leadUserDetails.mobile_no
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

  const handleWhatsAppOpenForPaytm = () => {
    const message = `

    📱 **Lead Details** 📱
    
    *Name:* ${leadUserDetails.customer_name}
    *Phone:* ${leadUserDetails.customer_mobile}
    *Marchant Code:* ${leadUserDetails.merchantcode}
    *RefId:* ${leadUserDetails.refid}
    *Campaign URL:* ${leadData.data}
    `;

    const whatsappUrl = `whatsapp://send?phone=+91${
      leadUserDetails.customer_mobile
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
          {/* screen name paytm */}
          {screenName === 'paytm' ? (
            <View
              style={{
                padding: responsiveWidth(5),
              }}>
              <View style={{marginBottom: responsiveWidth(3)}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    color: 'black',
                    fontWeight: '700',
                  }}>
                  Paytm -
                </Text>
              </View>

              <View style={{marginBottom: responsiveWidth(5)}}>
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
                    {leadUserDetails.customer_name}
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
                    {leadUserDetails.customer_mobile}
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
                    Marchant Code -
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: 'black',
                      // fontWeight: "700",
                      marginLeft: responsiveWidth(1),
                    }}>
                    {leadUserDetails.merchantcode}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: responsiveWidth(2),
                    paddingLeft: responsiveWidth(2),
                  }}>
                  <MaterialIcone
                    name="email"
                    size={responsiveWidth(5.5)}
                    color="#686868"
                  />
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'black',
                      fontWeight: '700',
                      marginLeft: responsiveWidth(2),
                    }}>
                    Refid -
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: 'black',
                      // fontWeight: "700",
                      marginLeft: responsiveWidth(1),
                    }}>
                    {leadUserDetails.refid}
                  </Text>
                </View>
              </View>

              <View style={{marginBottom: responsiveWidth(3)}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    color: 'black',
                    fontWeight: '700',
                  }}>
                  Lead Status -
                </Text>
              </View>

              <View style={{marginBottom: responsiveWidth(5)}}>
                <View
                  style={{
                    flexDirection: 'row',
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
                      color: 'green',
                      // fontWeight: "700",
                      marginLeft: responsiveWidth(1),
                    }}>
                    ""https://play.google.com/store/apps/details?id=com.kwikm.app""
                  </Text>
                </View>

                <View
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
                    {leadData.data}
                  </Text>
                </View>
              </View>
            </View>
          ) : // screen name retailer
          screenName === 'retailer' ? (
            <View
              style={{
                padding: responsiveWidth(5),
              }}>
              <View style={{marginBottom: responsiveWidth(5)}}>
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
                    {leadUserDetails.full_name}
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
                    {leadUserDetails.mobile_no}
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
                    {leadUserDetails.pan}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: responsiveWidth(2),
                    paddingLeft: responsiveWidth(2),
                  }}>
                  <MaterialIcone
                    name="email"
                    size={responsiveWidth(5.5)}
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
                    {leadUserDetails.email}
                  </Text>
                </View>
              </View>

              <View style={{marginBottom: responsiveWidth(3)}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    color: 'black',
                    fontWeight: '700',
                  }}>
                  Lead Status -
                </Text>
              </View>

              <View style={{marginBottom: responsiveWidth(5)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: responsiveWidth(2),
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'black',
                      fontWeight: '700',
                      marginLeft: responsiveWidth(3),
                    }}>
                    Lead Code -
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: 'green',
                      fontWeight: '700',
                      marginLeft: responsiveWidth(1),
                    }}>
                    {leadData.data.lead_code}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
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
                      color: 'green',
                      // fontWeight: "700",
                      marginLeft: responsiveWidth(1),
                    }}>
                    "https://play.google.com/store/apps/details?id=com.kwikm.app"
                  </Text>
                </View>

                <View
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
                    {leadData.data.campaign_url}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            // screen name pice
            <View
              style={{
                padding: responsiveWidth(5),
              }}>
              <View style={{marginBottom: responsiveWidth(3)}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    color: 'black',
                    fontWeight: '700',
                  }}>
                  Pice -
                </Text>
              </View>

              <View style={{marginBottom: responsiveWidth(5)}}>
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
                    {name}
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
                    {phone}
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
                    {pan}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: responsiveWidth(2),
                    paddingLeft: responsiveWidth(2),
                  }}>
                  <MaterialIcone
                    name="email"
                    size={responsiveWidth(5.5)}
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
                    {email}
                  </Text>
                </View>
              </View>

              <View style={{marginBottom: responsiveWidth(3)}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.2),
                    color: 'black',
                    fontWeight: '700',
                  }}>
                  Lead Status -
                </Text>
              </View>

              <View style={{marginBottom: responsiveWidth(5)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: responsiveWidth(2),
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'black',
                      fontWeight: '700',
                      marginLeft: responsiveWidth(3),
                    }}>
                    Lead Code -
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: 'green',
                      fontWeight: '700',
                      marginLeft: responsiveWidth(1),
                    }}>
                    {leadCode}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: responsiveWidth(2),
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'black',
                      fontWeight: '700',
                      marginLeft: responsiveWidth(3),
                    }}>
                    message -
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: 'green',
                      // fontWeight: "700",
                      marginLeft: responsiveWidth(1),
                    }}>
                    {message}
                  </Text>
                </View>

                <View
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
                    {campaignUrl}
                  </Text>
                </View>
              </View>
            </View>
          )}
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
          onPress={
            screenName === 'paytm'
              ? handleWhatsAppOpenForPaytm
              : screenName === 'retailer'
              ? handleWhatsAppOpenForRetailer
              : handleWhatsAppOpenForRetailer
          }
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

export default LeadAddSuccessMesageScreen;
