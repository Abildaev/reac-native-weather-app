import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default function WeatherOnline(props) {
    const [icon, setIcon] = useState('');

    useEffect(() => {
        switch (true) {
            case((props.id >= 200) && (props.id <= 232)):
                setIcon('weather-lightning');
                break;
            case((props.id >= 300) && (props.id <= 321)):
                setIcon('weather-rainy');
                break;
            case((props.id >= 500) && (props.id <= 504)):
                setIcon('weather-pouring');
                break;
            case(props.id === 511):
                setIcon('snowflake');
                break;
            case((props.id >= 520) && (props.id <= 531)):
                setIcon('weather-rainy');
                break;
            case((props.id >= 600) && (props.id <= 622)):
                setIcon('snowflake');
                break;
            case((props.id >= 701) && (props.id <= 781)):
                setIcon('weather-fog');
                break;
            case(props.id === 800):
                setIcon('white-balance-sunny');
                break;
            case(props.id === 801):
                setIcon('weather-partlycloudy');
                break;
            case((props.id >= 802) && (props.id <= 804)):
                setIcon('weather-cloudy');
                break;
            default:
                setIcon('');
        }
    });

    let oldSunset = props.sunset;
    let sunSet = new Date();
    sunSet.setTime(oldSunset);

    let oldSunrise = props.sunrise;
    let sunRise = new Date();
    sunRise.setTime(oldSunrise);

    const info = [
        {
            icon: 'water-outline',
            type: 'material-community',
            title: 'Humidity',
            data: props.humidity,
            unit: ' %',
        },
        {
            icon: 'speedometer',
            type: 'material-community',
            title: 'Pressure',
            data: props.pressure,
            unit: ' hpa',
        },
        {
            icon: 'sunrise',
            type: 'feather',
            title: 'Sunrise',
            data: moment(sunRise * 1000).format('LTS'),
            unit: '',
        },
        {
            icon: 'sunset',
            type: 'feather',
            title: 'Sunset',
            data: moment(sunSet * 1000).format('LTS'),
            unit: '',
        },
    ];

    return (
        <View>
            <View style={style.Flex}>
                <Text style={style.City}>{props.city}-{props.country}</Text>
                <Text style={style.Date}>{moment().format('dddd, h:mm')}</Text>
                <View style={style.FlexTemp}>
                    <Icon
                        name={icon}
                        type='material-community'
                        color="#2C3E50"
                        size={50}
                    />
                    <Text style={style.Temp}>{Math.floor(props.temp) + '\xB0C'}</Text>
                </View>
                <Text style={style.Description}>{props.description}</Text>

                <View style={style.AnotherInfo}>
                    {info.map((item, idx) =>
                        <View key={idx} style={style.AnotherFlex}>
                            <View style={style.TitleFlex}>
                                <Icon
                                    name={item.icon}
                                    type={item.type}
                                    color="#00ACED"
                                    size={18}
                                />
                                <Text style={style.AnotherText}>{item.title}</Text>
                            </View>
                            <Text style={style.AnotherTextProps}>{item.data}{item.unit}</Text>
                        </View>)}
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    Flex: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    City: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 29,
        color: '#2C3E50',
    },
    Date: {
        color: '#979797',
    },
    FlexTemp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Temp: {
        marginLeft: 5,
        color: '#2C3E50',
        fontSize: 70,
        lineHeight: 87,
    },
    Description: {
        fontFamily: 'Raleway-Regular',
        color: '#979797',
        fontSize: 18,
    },
    AnotherInfo: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(183, 183, 183, 0.14)',
        width: 320,
        height: 230,
        justifyContent: 'space-between',
    },
    AnotherFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    AnotherText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 18,
        color: '#2C3E50',
        marginLeft: 13,
    },
    AnotherTextProps: {
        fontSize: 18,
        color: '#2C3E50',
    },
    TitleFlex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
