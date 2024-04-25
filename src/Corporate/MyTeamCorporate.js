import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useId, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import ActivityLoader from '../OtherScreens/ActivityLoader';

const MyTeamCorporate = () => {
  const navigation = useNavigation();
  const netinfo = useNetInfo();
  const [userId, setUserId] = useState(null);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [myDistributorsList, setMyDistributorsList] = useState([]);
  const storedUserDetailes = useSelector(state => state.details.login_data);
  // console.log("my team",reduxMyDistributorsList)

  useFocusEffect(
    React.useCallback(() => {
      setActivityIndicator(true);
      FetchMyDistrubutorsList();
    }, []),
  );

  const FetchMyDistrubutorsList = async () => {
    const ob = {
      user_id: storedUserDetailes.user_id,
    };
    try {
      await fetch('https://kwikm.in/dev_kwikm/api/my_downline.php', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
          'x-api-key':
            'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
        },
        body: JSON.stringify(ob),
      })
        .then(response => response.json())
        .then(myDistributorsListData => {
          // console.log(myDistributorsListData);
          if (myDistributorsListData.length > 0) {
            // dispatch(addMyDistibutorList(myDistributorsListData))
            setMyDistributorsList(myDistributorsListData);
          } else {
            setMyDistributorsList([]);
          }
          setTimeout(() => {
            setActivityIndicator(false);
          }, 500);
        });
    } catch (error) {
      console.log('Failed to fetch recent transactions', error);
    }
  };

  const shareDetails = async item => {
    const message = `
    📱Details 📱
    Name: ${item.name}
    Phone: ${item.phone}
    Balance: ${item.balance}
    `;

    const whatsappUrl = `whatsapp://send?phone=+91${
      item.phone
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
    <>
      {activityIndicator ? (
        <View style={{flex: 1, backgroundColor: '#eaffea'}}>
          <ActivityLoader />
        </View>
      ) : (
        <>
          {netinfo ? (
            <View style={{flex: 1, backgroundColor: '#EAFFEA'}}>
              <StatusBar backgroundColor="#EAFFEA" />

              <View style={{height: responsiveHeight(8), flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.headerArrowIcone}>
                  <Font5
                    name="arrow-left"
                    color="black"
                    size={responsiveWidth(6)}
                  />
                </TouchableOpacity>

                <View style={styles.headerTxtContainer}>
                  <View>
                    <Text style={styles.headerTxt}>My Retailer and Distributor</Text>
                  </View>
                </View>
              </View>

              <View style={{flex: 1}}>
                {myDistributorsList.length > 0 ? (
                  <View>
                    <FlatList
                      data={myDistributorsList}
                      style={{marginBottom: responsiveWidth(2)}}
                      renderItem={({item}) => {
                        const logo = item.logo
                          ? 'https://s3-alpha-sig.figma.com/img/84db/5113/c2841571834c3cd25628689742a5efea?Expires=1701648000&Signature=ifwqttdhyo9FKMnEZeOP8JRhFFrpmoQYcNQ1vbuYsG4E2lr9UeHo0hFSyG39XMs6TEXJcP8v-pVtmUhoMRtYgFhZfsAJduV9P8j4d9GJuwQoyjG2~9~WiYSCT8LdrY6I848LkiA7GwhcGN5FIhh-AGzWsv0DtFDOdnrBhdQ-5zVJbEnY9gx8uZht582ySIIGUCj0wYoGEfNSgTN8MhDWsFzaKb--k8ovAjWK7xoNSW~M1HGtBki4a-x3t7uSm7iPWl0gbZ7yTGnC1hMkIT5EhsMrAq0BT1VumaMbVNMjl~kwudws77IhRtTlhWHoWTFsMVT-rWbUlfnd5gUc3fr~GQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                          : item.name.length > 0
                          ? item.name[0].toUpperCase()
                          : '?';
                        const distributor_id = item.id;
                        const distributor_name = item.name;
                        const distributor_balance = item.balance;

                        return (
                          <View style={{alignItems: 'center'}}>
                            <View style={styles.listItemContainer}>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate(
                                    'earingDetailsCorporate',
                                    {
                                      distributor_id,
                                      distributor_name,
                                      distributor_balance,
                                      logo,
                                    },
                                  )
                                }
                                style={styles.listItemLogoContainer}>
                                {logo.length > 1 ? (
                                  <Image
                                    source={{uri: logo}}
                                    style={styles.listItemLogoImg}
                                  />
                                ) : (
                                  <View
                                    style={styles.listItemLogoNameTxtContainer}>
                                    <Text style={styles.listItemLogoNameTxt}>
                                      {logo}
                                    </Text>
                                  </View>
                                )}
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate(
                                    'earingDetailsCorporate',
                                    {
                                      distributor_id,
                                      distributor_name,
                                      distributor_balance,
                                      logo,
                                    },
                                  )
                                }
                                style={{flex: 3, justifyContent: 'center'}}>
                                <Text style={styles.listItemDistri_name_txt}>
                                  {item.name}
                                </Text>
                                <Text style={styles.listItemDistri_id_txt}>
                                  ID: {item.id}
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate(
                                    'earingDetailsCorporate',
                                    {
                                      distributor_id,
                                      distributor_name,
                                      distributor_balance,
                                      logo,
                                    },
                                  )
                                }
                                style={styles.listItem_balance_container}>
                                <Text style={styles.listItem_balance_txt}>
                                  Balance
                                </Text>

                                <View
                                  style={
                                    styles.listItem_balance_amount_container
                                  }>
                                  <Font5 name="rupee-sign" color="#0D950A" />
                                  <Text
                                    style={styles.listItem_balance_amount_txt}>
                                    {item.balance}.00
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              <View
                                style={{
                                  flex: 1,
                                  // backgroundColor: 'red',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                  onPress={() => shareDetails(item)}>
                                  <Font5
                                    name="share-alt"
                                    size={responsiveWidth(5.5)}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        );
                      }}
                    />
                  </View>
                ) : (
                  <View style={styles.no_data_container}>
                    <View>
                      <LottieView
                        source={require('../../assets/noDataFound.json')}
                        style={styles.no_data_animation}
                        autoPlay
                        loop
                      />
                    </View>
                    <View style={{height: responsiveHeight(5)}}>
                      <Text style={styles.no_data_txt}>
                        No Distributor Found. . .
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : (
            <NoConnection />
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  listItemContainer: {
    width: responsiveWidth(94),
    height: responsiveHeight(8),
    backgroundColor: 'white',
    borderRadius: responsiveWidth(3),
    flexDirection: 'row',
    margin: responsiveWidth(1.5),
    borderWidth: 1,
    borderRadius: responsiveWidth(3),
    borderColor: '#DADADA',
  },
  listItemLogoContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemLogoImg: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(6),
    resizeMode: 'cover',
  },
  listItemLogoNameTxtContainer: {
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderRadius: responsiveWidth(7),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7BD7FF',
  },
  listItemLogoNameTxt: {
    fontSize: responsiveFontSize(4.2),
    color: 'black',
    fontWeight: '700',
  },
  listItemDistri_name_txt: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
    fontWeight: '700',
  },
  listItemDistri_id_txt: {
    fontSize: responsiveFontSize(1.7),
    color: 'black',
  },
  listItem_balance_container: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem_balance_txt: {
    fontSize: responsiveFontSize(1.6),
    color: 'black',
    fontWeight: '400',
  },
  listItem_balance_amount_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem_balance_amount_txt: {
    fontSize: responsiveFontSize(1.7),
    color: '#0D950A',
    fontWeight: '700',
  },
  no_data_container: {
    height: responsiveHeight(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  no_data_animation: {
    height: responsiveHeight(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  no_data_txt: {
    color: 'black',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
  },
});

export default MyTeamCorporate;
