import {View, Text, StatusBar, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import RegisterScreen from './src/auth/RegisterScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './src/navigator/BottomTab';
import OnbordingScreen1 from './src/onbording/OnbordingScreen1';
import RegisterOtpScreen from './src/auth/RegisterOtpScreen';
import LoginOtpScreen from './src/auth/LoginOtpScreen';
import store from './src/redux/Store';
import {Provider} from 'react-redux';
import RegisterMPINScreen from './src/auth/RegisterMPINScreen.js';
import LoginWithNumber from './src/auth/LoginWithNumber';
import LoginMPINScreen from './src/auth/LoginMPINScreen';
import ProductsScreen from './src/OtherScreens/ProductsScreen';
import ProductDetails from './src/OtherScreens/ProductDetails';
import AddCustomer from './src/OtherScreens/AddCustomer';
import SpalshScreen from './src/auth/SpalshScreen';
import ApkSubscripton from './src/OtherScreens/ApkSubscripton';
import PaytmScreen from './src/OtherScreens/PaytmScreen';
import PiceOnboarding from './src/OtherScreens/PiceOnboarding';
import PiceLeadScreen from './src/OtherScreens/PiceLeadScreen';
import MyLeadRetailer from './src/Retailer/MyLeadRetailer';
import ProductTabScreen from './src/Retailer/ProductTabScreen';
import ChangeMpinScreen from './src/ProfileScreens/ChangeMpinScreen';
import WebViewScreen from './src/OtherScreens/WebViewScreeen';
import InsuaranceProductsScreens from './src/OtherScreens/InsuaranceProductsScreens';
import PurchaseInsuarance from './src/OtherScreens/PurchaseInsuarance';
import AddRetailer from './src/Distributor/AddRetailer';
import LeadAddSuccessMesageScreen from './src/OtherScreens/LeadAddSuccessMesageScreen';
import ScratchCardScreen from './src/OtherScreens/ScratchCard';
import RewardsScreen from './src/Retailer/RewardsScreen.js';
import useNetInfo from './src/OtherScreens/useNetInfo';
import PiceLeadShareScreen from './src/OtherScreens/PiceLeadShareScreen.js';

// Distributor screens
import DistributorBottomTab from './src/navigator/DistributorBottomTab';
import MyTeamDistributor from './src/Distributor/MyTeamDistributor';
import EarningDetailsDistributor from './src/Distributor/EarningDetailsDistributor';

// Corporate Partner
import CorpBottomTab from './src/navigator/CorpBottomTab';
import MyTeamCorporate from './src/Corporate/MyTeamCorporate';
import EarningDetailsCorporate from './src/Corporate/EarningDetailsCorporate';
import AddDistributor from './src/Corporate/AddDistributor';
import CorpRetailerList from './src/Corporate/CorpRetailerList';

// common imports
import UserProfile from './src/ProfileScreens/UserProfile';
import TrainingVideoScreen from './src/Retailer/TrainingVideoScreen';
import HelpScreen from './src/Retailer/HelpScreen';
import NoConnection from './src/OtherScreens/NoConnection';
import PrivacyPolicyScreen from './src/ProfileScreens/PrivacyPolicyScreen';
import TermsConditionScreen from './src/ProfileScreens/TermsConditionScreen';
import PaymentSettingScreen from './src/ProfileScreens/PaymentSettingScreen';
import KycDetailsScreen from './src/ProfileScreens/KycDetailsScreen';
import EducationDetailsScreen from './src/ProfileScreens/EducationDetailsScreen';
import KwikmRegistration from './src/Retailer/KwikmRegistration';
import SubcriptionScreen from './src/OtherScreens/SubcriptionScreen';
import ReferrelsScreen from './src/ProfileScreens/ReferrelsScreen.js';
import ShareLead from './src/Distributor/ShareLead.js';
import KwikmLeadScreen from './src/OtherScreens/KwikmLeadScreen.js';
import WithdrawScreen from './src/OtherScreens/WithdrawScreen.js';

const Stack = createStackNavigator();
const App = () => {
  const netInfo = useNetInfo();

  return (
    <View style={{flex: 1}}>
      <Provider store={store}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        {netInfo ? (
          <NavigationContainer>
            {/* <Stack.Navigator initialRouteName='onboarding'> */}
            <Stack.Navigator initialRouteName="spalsh">
              {/* <Stack.Screen
                name="tabs"
                options={{headerShown: false}}
                component={BottomTab}
              /> */}

              <Stack.Screen
                name="spalsh"
                options={{headerShown: false}}
                component={SpalshScreen}
              />
              <Stack.Screen
                name="onboarding"
                options={{headerShown: false}}
                component={OnbordingScreen1}
              />
              <Stack.Screen
                name="register"
                options={{headerShown: false}}
                component={RegisterScreen}
              />
              <Stack.Screen
                name="registerOtp"
                options={{headerShown: false}}
                component={RegisterOtpScreen}
              />
              <Stack.Screen
                name="registerMPIN"
                options={{headerShown: false}}
                component={RegisterMPINScreen}
              />
              <Stack.Screen
                name="loginMPIN"
                options={{headerShown: false}}
                component={LoginMPINScreen}
              />
              <Stack.Screen
                name="loginNumber"
                options={{headerShown: false}}
                component={LoginWithNumber}
              />
              <Stack.Screen
                name="loginOtp"
                options={{headerShown: false}}
                component={LoginOtpScreen}
              />
              <Stack.Screen
                name="tabs"
                options={{headerShown: false}}
                component={BottomTab}
              />
              <Stack.Screen
                name="mylead"
                options={{headerShown: false}}
                component={MyLeadRetailer}
              />
              <Stack.Screen
                name="trainingVideo"
                options={{headerShown: false}}
                component={TrainingVideoScreen}
              />
              <Stack.Screen
                name="help"
                options={{headerShown: false}}
                component={HelpScreen}
              />
              <Stack.Screen
                name="products"
                options={{headerShown: false}}
                component={ProductsScreen}
              />
              <Stack.Screen
                name="productDetails"
                options={{headerShown: false}}
                component={ProductDetails}
              />
              <Stack.Screen
                name="productTab"
                options={{headerShown: false}}
                component={ProductTabScreen}
              />
              <Stack.Screen
                name="addcustomer"
                options={{headerShown: false}}
                component={AddCustomer}
              />
              <Stack.Screen
                name="apkSubscription"
                options={{headerShown: false}}
                component={ApkSubscripton}
              />
              <Stack.Screen
                name="paytmScreen"
                options={{headerShown: false}}
                component={PaytmScreen}
              />
              <Stack.Screen
                name="piceLeadScreen"
                options={{headerShown: false}}
                component={PiceLeadScreen}
              />
              <Stack.Screen
                name="piceLeadShareScreen"
                options={{headerShown: false}}
                component={PiceLeadShareScreen}
              />
              <Stack.Screen
                name="piceOnboarding"
                options={{headerShown: false}}
                component={PiceOnboarding}
              />
              <Stack.Screen
                name="kwikmOnboarding"
                options={{headerShown: false}}
                component={KwikmRegistration}
              />
              <Stack.Screen
                name="kwikmLeadScreen"
                options={{headerShown: false}}
                component={KwikmLeadScreen}
              />
              <Stack.Screen
                name="insuaranceProducts"
                options={{headerShown: false}}
                component={InsuaranceProductsScreens}
              />
              <Stack.Screen
                name="purchaseInsuarance"
                options={{headerShown: false}}
                component={PurchaseInsuarance}
              />
              <Stack.Screen
                name="openWebView"
                options={{headerShown: false}}
                component={WebViewScreen}
              />
              <Stack.Screen
                name="leadSuccessMsg"
                options={{headerShown: false}}
                component={LeadAddSuccessMesageScreen}
              />
              <Stack.Screen
                name="rewards"
                options={{headerShown: false}}
                component={RewardsScreen}
              />

              {/* common screen */}
              <Stack.Screen
                name="userProfile"
                options={{headerShown: false}}
                component={UserProfile}
              />
              <Stack.Screen
                name="withdrawScreen"
                options={{headerShown: false}}
                component={WithdrawScreen}
              />

              <Stack.Screen
                name="changeMpin"
                options={{headerShown: false}}
                component={ChangeMpinScreen}
              />

              <Stack.Screen
                name="privacyPolicy"
                options={{headerShown: false}}
                component={PrivacyPolicyScreen}
              />
              <Stack.Screen
                name="referelScreen"
                options={{headerShown: false}}
                component={ReferrelsScreen}
              />

              <Stack.Screen
                name="termsConditions"
                options={{headerShown: false}}
                component={TermsConditionScreen}
              />

              <Stack.Screen
                name="paymentSetting"
                options={{headerShown: false}}
                component={PaymentSettingScreen}
              />

              <Stack.Screen
                name="kycDetails"
                options={{headerShown: false}}
                component={KycDetailsScreen}
              />

              <Stack.Screen
                name="educationDetails"
                options={{headerShown: false}}
                component={EducationDetailsScreen}
              />

              <Stack.Screen
                name="kwikmRegistration"
                options={{headerShown: false}}
                component={KwikmRegistration}
              />
              <Stack.Screen
                name="subscriptionScreen"
                options={{headerShown: false}}
                component={SubcriptionScreen}
              />

              {/* Distributor screens */}
              <Stack.Screen
                name="distributorTab"
                options={{headerShown: false}}
                component={DistributorBottomTab}
              />
              <Stack.Screen
                name="myTeamDistributor"
                options={{headerShown: false}}
                component={MyTeamDistributor}
              />
              <Stack.Screen
                name="earningDetailsDistributor"
                options={{headerShown: false}}
                component={EarningDetailsDistributor}
              />
              <Stack.Screen
                name="addRetailer"
                options={{headerShown: false}}
                component={AddRetailer}
              />
              <Stack.Screen
                name="leadMessage"
                options={{headerShown: false}}
                component={ShareLead}
              />

              {/* Corporate Partner   */}
              <Stack.Screen
                name="corpDistributorTab"
                options={{headerShown: false}}
                component={CorpBottomTab}
              />
              <Stack.Screen
                name="myTeamCorporate"
                options={{headerShown: false}}
                component={MyTeamCorporate}
              />
              <Stack.Screen
                name="earingDetailsCorporate"
                options={{headerShown: false}}
                component={EarningDetailsCorporate}
              />
              <Stack.Screen
                name="addDistributor"
                options={{headerShown: false}}
                component={AddDistributor}
              />

              <Stack.Screen
                name="corpRetailerList"
                options={{headerShown: false}}
                component={CorpRetailerList}
              />
            </Stack.Navigator>
          </NavigationContainer>
        ) : (
          <NoConnection />
        )}
      </Provider>
    </View>
  );
};

export default App;
