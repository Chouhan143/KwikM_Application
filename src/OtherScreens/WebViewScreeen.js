import {View, Text,Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import ActivityLoader from '../OtherScreens/ActivityLoader';

const WebViewScreen = () => {
  const route = useRoute();
  const token = route.params.token;
  // console.log("web view screen ",token);
  useEffect(() => {
    // Open the URL in the device's default web browser
    Linking.openURL(
      `https://pos.insurancedekho.com/ott-pos/login?one-time-token=${token}`,
    );
  }, [token]);

  // This component doesn't render anything directly
  return null;
};

export default WebViewScreen;
