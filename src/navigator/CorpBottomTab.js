import { View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import the icons you want to use
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Import the icons you want to use
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ReferrelsScreen from '../ProfileScreens/ReferrelsScreen';
import CorporateHome from '../Corporate/CorporateHome';
import MyTeamCorporate from '../Corporate/MyTeamCorporate';
import AddDistributor from '../Corporate/AddDistributor';
import HelpScreen from '../Retailer/HelpScreen';
import RewardsScreen from '../Retailer/RewardsScreen';


const Tab = createBottomTabNavigator()

const CorpBottomTab = () => {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        height: responsiveHeight(7),
                    },
                    tabBarActiveTintColor: "#0B7E8E",
                    tabBarInactiveTintColor: "#444444",
                    // tabBarShowLabel:false
                }}
            >

                <Tab.Screen
                    name="Home"
                    component={CorporateHome}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => (
                            <FontAwesome name="home" size={responsiveWidth(7)} color={color} />
                        ),
                        tabBarLabelStyle: {
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: "600",
                            marginBottom: responsiveWidth(1)
                        }
                    }}
                />
                <Tab.Screen
                    name="Lead"
                    component={MyTeamCorporate}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome name="file-text" size={responsiveWidth(6)} color={color} />
                        ),
                        tabBarLabelStyle: {
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: "600",
                            marginBottom: responsiveWidth(1)

                        }
                    }}
                />
                <Tab.Screen
                    name='Add'
                    component={AddDistributor}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome5 name="plus-circle" size={responsiveWidth(12)} color={color} />
                        ),
                        tabBarLabelStyle: {
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: "600",
                            display: "none"
                        },
                        // tabBarShowLabel:false


                    }}
                />
                <Tab.Screen
                    name='Rewards'
                    component={RewardsScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome name="gift" size={responsiveWidth(8)} color={color} />
                        ),
                        tabBarLabelStyle: {
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: "600",
                            marginBottom: responsiveWidth(1)

                        }
                    }}
                />
                <Tab.Screen
                    name='Support'
                    component={HelpScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <FontAwesome name="users" size={responsiveWidth(6)} color={color} />
                        ),
                        tabBarLabelStyle: {
                            fontSize: responsiveFontSize(1.6),
                            fontWeight: "600",
                            marginBottom: responsiveWidth(1)

                        }
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};


export default CorpBottomTab;
