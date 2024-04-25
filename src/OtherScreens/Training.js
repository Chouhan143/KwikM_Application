import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Training = () => {
  return (
    <View
      style={{
        width: responsiveScreenWidth(100),
        height: responsiveScreenHeight(100),
        alignItems: 'center',
      }}>
      <View
        style={{
          width: responsiveWidth(92),
          backgroundColor: 'white',
          borderRadius: responsiveWidth(3),
          padding: responsiveWidth(2),
          marginTop: responsiveWidth(3),
          alignSelf: 'center',
        }}>
        <View>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              color: 'black',
              fontWeight: '700',
              marginLeft: responsiveWidth(2),
            }}>
            Description
          </Text>
        </View>
        <View style={{padding: responsiveWidth(2)}}>
          <Text style={{fontSize: responsiveFontSize(2), color: 'gray'}}>
            m.Stock is one of the leading brokers in India & it is the one-stop
            solution for all your financial needs. When you open an m.Stock Zero
            Brokerage account, you pay zero brokerage for all your trades
            (intraday, delivery), across products (equity, F&O, commodities,
            currencies, mutual funds, ETFs) for life.
          </Text>
        </View>
      </View>

      <View
        style={{
          width: responsiveWidth(92),
          backgroundColor: 'white',
          borderRadius: responsiveWidth(3),
          padding: responsiveWidth(2),
          marginTop: responsiveWidth(3),
        }}>
        <View>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              color: 'black',
              fontWeight: '700',
              marginLeft: responsiveWidth(2),
            }}>
            Features
          </Text>
        </View>
        <View style={{padding: responsiveWidth(2)}}>
          <Text style={{fontSize: responsiveFontSize(2), color: 'gray'}}>
            1. Zero brokerage on intraday and F&O trades
          </Text>
          <Text style={{fontSize: responsiveFontSize(2), color: 'gray'}}>
            2. Superfast and stable trading App and web platform
          </Text>
          <Text style={{fontSize: responsiveFontSize(2), color: 'gray'}}>
            3. The lowest interest rate on Margin Trading Facility @ 7.99% with
            up to 80% funding in more than 700 stocks
          </Text>
          <Text style={{fontSize: responsiveFontSize(2), color: 'gray'}}>
            4. 5-minute, fully automated (paperless) account opening process
          </Text>
          <Text style={{fontSize: responsiveFontSize(2), color: 'gray'}}>
            5. 100% paperless
          </Text>
        </View>
      </View>

      <View
        style={{
          width: responsiveWidth(92),
          backgroundColor: 'white',
          borderRadius: responsiveWidth(3),
          padding: responsiveWidth(2),
          marginTop: responsiveWidth(3),
        }}>
        <View>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              color: 'black',
              fontWeight: '700',
              marginLeft: responsiveWidth(2),
            }}>
            Charges
          </Text>
        </View>
        <View style={{padding: responsiveWidth(2)}}>
          <Text style={{fontSize: responsiveFontSize(2), color: 'gray'}}>
            1. Rs 999 - Zero Brokerage account, Trade across products, at zero
            brokerage for lifetime.
          </Text>
          <Text style={{fontSize: responsiveFontSize(2), color: 'gray'}}>
            2. Rs 149 - Standard Demat account, Trade freely in equity delivery,
            mutual funds, and IPOs. However, you will have to pay a brokerage of
            Rs 20 per order on Derivative Trades
          </Text>
        </View>
      </View>
    </View>
    // </View >
  );
};

export default Training;
