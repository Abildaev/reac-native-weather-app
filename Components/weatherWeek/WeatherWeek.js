import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import moment from 'moment';
import {Icon} from 'react-native-elements';

export default function WeatherWeek(props) {
    return (
        <View style={style.Flex}>
            <Text style={style.City}>{props.city}-{props.country}</Text>
            <Text style={style.Date}>{moment().format('dddd, h:mm')}</Text>
            <View style={style.minMax}>
                <Text style={style.Min}>min</Text>
                <Text>max</Text>
            </View>
            <View>{props.week}</View>
        </View>
    );
}

const style = StyleSheet.create({
    Flex: {
        marginTop: 40,
        alignItems: 'center',

    },
    City: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 29,
        color: '#2C3E50',
    },
    Date: {
        color: '#979797',
        marginBottom: 24,
    },
    minMax: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 320,
        paddingRight: 20,
        paddingLeft: 20,
    },
    Min: {
        marginRight: 68
    },
});







