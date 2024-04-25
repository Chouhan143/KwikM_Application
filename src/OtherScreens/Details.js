import React, { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';


const Details = (props) => {
    const content = props.content;
    // console.log(content)

    const listItemStyle = useMemo(() => ({
        width: responsiveWidth(92),
        backgroundColor: 'white',
        borderRadius: responsiveWidth(3),
        padding: responsiveWidth(2),
        marginTop: responsiveWidth(3),
    }), []);

    const titleTextStyle = useMemo(() => ({
        fontSize: responsiveFontSize(2),
        color: 'black',
        fontWeight: '700',
        marginLeft: responsiveWidth(2),
    }), []);

    const contentTextStyle = useMemo(() => ({
        fontSize: responsiveFontSize(2),
        color:"gray"
    }), []);

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: responsiveWidth(56) }}
                data={content}
                renderItem={({ item }) => (
                    <View style={listItemStyle}>
                        <View>
                            <Text style={titleTextStyle}>
                                {item.title}
                            </Text>
                        </View>
                        <View style={{ padding: responsiveWidth(2) }}>
                            <Text style={contentTextStyle}>
                                {item.content}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default Details;
