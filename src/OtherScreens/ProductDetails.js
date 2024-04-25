import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import Details from './Details';
import MyStats from './MyStats';
import Training from './Training';
import ActivityLoader from './ActivityLoader';
import useNetInfo from './useNetInfo';
import NoConnection from './NoConnection';
import {useSelector} from 'react-redux';

const ProductDetails = () => {
  // variables
  const naviagtion = useNavigation();
  const [stats, setStats] = useState(true);
  const [details, setDetails] = useState(false);
  const [training, setTraining] = useState(false);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const route = useRoute();
  const [productId, setProductId] = useState(0);
  const [commission, setCommission] = useState(0);
  const [categoriID, setCategoriID] = useState(0);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [logo, setLogo] = useState(null);
  const netInfo = useNetInfo();
  const ProductDetails = useSelector(state => state.details.product_id);
  // console.log(ProductDetails)
  // console.log("product direct details",ProductDetails)
  // console.log("product direct details", route.params.ProductId,route.params.ProductCommission,route.params.category_id)

  useEffect(() => {
    setActivityIndicator(true);
    FetchProductDetails();
    setTimeout(() => {
      setActivityIndicator(false);
    }, 1000);
  }, []);

  const FetchProductDetails = () => {
    const ob = {
      product_id: ProductDetails.product_id,
    };
    fetch('https://kwikm.in/dev_kwikm/api/productDirectDetails.php', {
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
      .then(data => {
        // console.log(data.data.attribute[0].content)
        setContent(data.data.attribute[0].content);
      });
  };

  return (
    <>
      {netInfo ? (
        <>
          {/* {activityIndicator ?
                        <ActivityLoader />
                        : */}
          <View style={{flex: 1, backgroundColor: '#EAFFEA'}}>
            <View style={{height: responsiveHeight(8), flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => naviagtion.goBack()}
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
                    Products Details
                  </Text>
                </View>
              </View>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <LinearGradient
                colors={['#DB3DB8', '#3546A0']}
                style={{
                  width: responsiveWidth(92),
                  height: responsiveHeight(10),
                  borderRadius: responsiveWidth(3),
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingLeft: responsiveWidth(3),
                  }}>
                  <Image
                    source={{uri: ProductDetails.logo}}
                    style={{
                      borderRadius: responsiveWidth(3),
                      width: responsiveWidth(21),
                      height: responsiveHeight(8),
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View style={{flex: 2, justifyContent: 'center'}}>
                  <Text
                    style={{fontSize: responsiveFontSize(2.2), color: 'white'}}>
                    {ProductDetails.title}
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: responsiveHeight(8),
                padding: responsiveWidth(5),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setStats(true);
                  setDetails(false);
                  setTraining(false);
                }}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: '700',
                    color: 'black',
                  }}>
                  My Stats
                </Text>
                <View
                  style={{
                    width: responsiveWidth(33.33),
                    height: responsiveWidth(0.5),
                    backgroundColor: stats ? '#6D0E8F' : '#C6C6C6',
                  }}></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDetails(true);
                  setStats(false);
                  setTraining(false);
                }}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: '700',
                    color: 'black',
                  }}>
                  Details
                </Text>
                <View
                  style={{
                    width: responsiveWidth(33.33),
                    height: responsiveWidth(0.5),
                    backgroundColor: details ? '#6D0E8F' : '#C6C6C6',
                  }}></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTraining(true);
                  setStats(false);
                  setDetails(false);
                }}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: '700',
                    color: 'black',
                  }}>
                  Training Videos
                </Text>
                <View
                  style={{
                    width: responsiveWidth(33.33),
                    height: responsiveWidth(0.5),
                    backgroundColor: training ? '#6D0E8F' : '#C6C6C6',
                  }}></View>
              </TouchableOpacity>
            </View>

            <View>
              {stats ? (
                <MyStats data={[commission, productId, categoriID]} />
              ) : null}
              {details ? <Details content={content} /> : null}
              {training ? <Training /> : null}
            </View>
          </View>
          {/* } */}
        </>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

export default ProductDetails;
