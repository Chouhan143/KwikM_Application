import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';

import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import ActivityLoader from './ActivityLoader';
import LottieView from 'lottie-react-native';
import useNetInfo from './useNetInfo';
import NoConnection from './NoConnection';
import {addCategoryId, addProductId} from '../redux/Slice';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet from 'react-native-simple-bottom-sheet';

const ProductsScreen = () => {
  // variables
  const navigation = useNavigation();
  const route = useRoute();
  const [apiProducts, setApiProducts] = useState([]);
  const [browse_Category, setBrowseCategory] = useState([]);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const newCategory = useSelector(state => state.details.category_id);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [showBottomSheet, setBottomSheet] = useState(false);
  const [number, setNumber] = useState('');

  // apis
  useEffect(() => {
    setActivityIndicator(true);
    fetchProduts();
    browse_Category_Products();
  }, [newCategory]);

  // fetching products when user click on browse categrory items
  const browse_Category_Products = () => {
    // console.log("browse_Category_Products")
    fetch('https://kwikm.in/dev_kwikm/api/allcategory.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
        'x-api-key':
          'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data.data)
        setBrowseCategory(data.data);
      });
  };

  // fetching products when user click on sell and earn items on home screen
  const fetchProduts = () => {
    const ob = {
      category_id: newCategory,
    };
    fetch(`https://kwikm.in/dev_kwikm/api/ProdByCat.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
        'x-api-key':
          'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
      },
      body: JSON.stringify(ob),
    })
      .then(response => response.text())
      .then(data => {
        // api data converted into JSON
        const apiData = JSON.parse(data);

        // console.log("product by category",apiData)
        // setting the data to get in flat list
        setApiProducts(apiData.data);
        setFilteredProducts(apiData.data);
        // setData(apiData.data)
        // console.log(apiData.data)
        setTimeout(() => {
          setActivityIndicator(false);
        }, 500);
      });
  };

  // searching product based on name
  const performSearch = text => {
    const txt = text.toLowerCase().trim();
    // Update the filtered products based on the search text
    if (txt == '') {
      setFilteredProducts(apiProducts); // If search is empty, show all products
    } else {
      const searchedItems = apiProducts.filter(ob =>
        ob.title.toLowerCase().includes(txt),
      );
      setFilteredProducts(searchedItems);
      searchedItems.length === 0 ? setNoDataFound(true) : setNoDataFound(false);
    }
  };

  // handle search text intered in the search field
  const handleSearch = text => {
    // console.log("hii")
    setSearch(text);
    performSearch(text);
  };

  const handleShareProdut = () => {
    // console.log(ob);

    const message = `https://kwikm.in/dev_kwikm/admin/html/login.php`;

    const whatsappUrl = `whatsapp://send?phone=+91${number}&text=${encodeURIComponent(
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
    <>
      {netInfo ? (
        <View style={{flex: 1, backgroundColor: '#EAFFEA'}}>
          <View style={{height: responsiveHeight(8), flexDirection: 'row'}}>
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
                  Products
                </Text>
              </View>
              <View style={{marginRight: responsiveWidth(4)}}>
                {/* <Font name="heart" color="red" size={responsiveWidth(6)} /> */}
              </View>
            </View>
          </View>

          <View style={{height: responsiveHeight(20)}}>
            <View>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: 'black',
                  fontWeight: '700',
                  marginLeft: responsiveWidth(5),
                }}>
                Browse Categories
              </Text>
            </View>
            <View>
              <FlatList
                horizontal
                data={browse_Category}
                showsHorizontalScrollIndicator={false}
                style={{
                  height: responsiveHeight(8),
                  marginTop: responsiveWidth(2),
                }}
                renderItem={({item}) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(addCategoryId(item.id));
                        }}
                        style={{
                          width: responsiveWidth(45),
                          height: responsiveHeight(8),
                          borderRadius: responsiveWidth(5),
                          backgroundColor: '#FFD3D3',
                          borderWidth: 1,
                          borderColor: '#FF9C9C',
                          marginLeft: responsiveWidth(2),
                          marginRight: responsiveWidth(2),
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {/* <Font5 name="credit-card" size={responsiveWidth(5)} /> */}
                          {item.icon ? (
                            <Font6
                              name={`${item.icon}`}
                              size={responsiveWidth(5)}
                              color="gray"
                            />
                          ) : (
                            <Font6
                              name="apple-whole"
                              size={responsiveWidth(5)}
                            />
                          )}
                        </View>
                        <View
                          style={{
                            flex: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(1.8),
                              color: '#9B1515',
                              fontWeight: '700',
                            }}>
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontWeight: '700',
                              fontSize: responsiveFontSize(1.6),
                            }}>
                            Earn Upto {item.commission}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </>
                  );
                }}
              />

              {/* search field */}
              <View
                style={{
                  margin: responsiveWidth(3),
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  borderRadius: responsiveWidth(3),
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Font5
                    name="search"
                    color="black"
                    size={responsiveWidth(5)}
                  />
                </TouchableOpacity>
                <View style={{flex: 5}}>
                  <TextInput
                    value={search}
                    onChangeText={text => handleSearch(text)} // Use onChangeText to update search state
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'black',
                    }}
                    placeholder="Search Products"
                    placeholderTextColor={'gray'}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* products */}
          <View style={{flex: 1}}>
            {noDataFound ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LottieView
                  source={require('../../assets/no_data.json')}
                  style={{
                    width: responsiveWidth(50),
                    height: responsiveHeight(25),
                  }}
                />
              </View>
            ) : (
              <>
                <FlatList
                  data={filteredProducts}
                  renderItem={({item}) => {
                    // console.log(id)
                    return (
                      <>
                        <View
                          style={{
                            width: responsiveWidth(95),
                            height: responsiveHeight(22),
                            borderRadius: responsiveWidth(4),
                            backgroundColor: 'white',
                            margin: responsiveWidth(3),
                            borderWidth: 1,
                            borderColor: '#C7C7C7',
                            // borderBlockColor:"black"
                          }}>
                          {activityIndicator ? (
                            <ActivityLoader />
                          ) : (
                            <>
                              <View style={{flex: 1, flexDirection: 'row'}}>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Octicons
                                    name="dot-fill"
                                    color="green"
                                    size={responsiveWidth(5)}
                                  />
                                </View>
                                <View
                                  style={{flex: 8, justifyContent: 'center'}}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(2),
                                      color: 'green',
                                    }}>
                                    ACTIVE
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  {/* <Font6
                                    name="heart"
                                    color="#282727"
                                    size={responsiveWidth(5)}
                                  /> */}
                                </View>
                              </View>
                              <View style={{flex: 2, flexDirection: 'row'}}>
                                <TouchableOpacity
                                  onPress={() => {
                                    // console.log(item)
                                    dispatch(addProductId(item));
                                    navigation.navigate('productDetails');
                                  }}
                                  style={{flex: 1}}>
                                  <Image
                                    source={{uri: item.logo}}
                                    style={{
                                      width: responsiveWidth(25),
                                      height: responsiveHeight(8),
                                      alignSelf: 'center',
                                      borderRadius: responsiveWidth(3),
                                      borderWidth: responsiveWidth(0.1),
                                      // borderColor: "#DFDCDC"
                                      borderColor: 'black',
                                      resizeMode: 'cover',
                                    }}
                                  />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    // console.log(item)
                                    dispatch(addProductId(item));
                                    navigation.navigate('productDetails');
                                  }}
                                  style={{flex: 2}}>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'flex-end',
                                    }}>
                                    <Text
                                      style={{
                                        color: 'black',
                                        fontWeight: '700',
                                        fontSize: responsiveFontSize(2),
                                      }}>
                                      {item.title}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flex: 2,
                                      justifyContent: 'flex-start',
                                      paddingTop: responsiveWidth(1),
                                    }}>
                                    <Text
                                      style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: responsiveFontSize(1.8),
                                      }}>
                                      {item.sub_title}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  justifyContent: 'space-around',
                                }}>
                                <View
                                  style={{
                                    width: responsiveWidth(40),
                                    // marginLeft:responsiveWidth(4),
                                    height: responsiveHeight(4.3),
                                    borderRadius: responsiveWidth(8),
                                    backgroundColor: '#FFD66D',
                                    borderWidth: 1,
                                    borderColor: '#E4A70A',
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <View
                                      style={{
                                        width: responsiveWidth(6.5),
                                        height: responsiveWidth(6.5),
                                        borderRadius: responsiveWidth(3.25),
                                        backgroundColor: '#FF7A00',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <Font5 name="rupee-sign" color="white" />
                                    </View>
                                  </View>
                                  <View
                                    style={{flex: 4, justifyContent: 'center'}}>
                                    <Text style={{color: 'black'}}>
                                      Earn Upto{' '}
                                      {item.commission ? item.commission : 0} 
                                    </Text>
                                  </View>
                                </View>
                                <TouchableOpacity
                                  // onPress={() =>
                                  //   setBottomSheet(!showBottomSheet)
                                  // }
                                  style={{
                                    width: responsiveWidth(40),
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                  }}>
                                  {/* <Font5
                                    name="share-alt"
                                    size={responsiveWidth(5)}
                                  /> */}
                                </TouchableOpacity>
                              </View>
                            </>
                          )}
                        </View>
                      </>
                    );
                  }}
                />
              </>
            )}
          </View>

          {showBottomSheet ? (
            <BottomSheet isOpen sliderMaxHeight={responsiveHeight(40)}>
              <View style={styles.addBankFormContainer}>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <TouchableOpacity onPress={() => setBottomSheet(false)}>
                    <Entypo
                      name="squared-cross"
                      color={'red'}
                      size={responsiveWidth(8)}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{fontSize: responsiveFontSize(2), color: 'black'}}>
                    Enter mobile number on which you want to share
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <View style={styles.inputFieldContainer}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Font5
                        name="phone-alt"
                        size={responsiveWidth(5.8)}
                        color="#535353"
                      />
                    </View>
                    <View style={{flex: 5, justifyContent: 'center'}}>
                      <TextInput
                        placeholder="Enter Your Phone Number"
                        placeholderTextColor={'gray'}
                        autoCapitalize="characters"
                        value={number}
                        onChangeText={txt => setNumber(txt)}
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        const phoneNumber = number;
                        const message =
                          'https://kwikm.in/dev_kwikm/admin/html/login.php';
                        if (phoneNumber) {
                          const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(
                            message,
                          )}`;
                          Linking.openURL(smsUrl);
                        }
                      }}
                      style={styles.cancleBtn}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                        }}>
                        Send Sms
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleShareProdut}
                      style={styles.saveBtn}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'white',
                          fontWeight: '700',
                        }}>
                        Whatsapp
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </BottomSheet>
          ) : null}
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

  addBankFormContainer: {
    flex: 1,
    // alignItems: 'center',
    // backgroundColor: 'yellow',
  },

  inputFieldContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(6),
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: responsiveWidth(3),
    marginVertical: responsiveWidth(3),
    borderWidth: 1,
    borderColor: '#BCB4B4',
  },

  buttonContainer: {
    height: responsiveHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor:"red"
  },

  cancleBtn: {
    width: responsiveWidth(40),
    paddingVertical: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDCDCD',
    borderRadius: responsiveWidth(10),
  },

  saveBtn: {
    width: responsiveWidth(40),
    paddingVertical: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CB01CF',
    borderRadius: responsiveWidth(10),
  },
  saveDisabledBtn: {
    width: responsiveWidth(40),
    paddingVertical: responsiveWidth(3),
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
export default ProductsScreen;
