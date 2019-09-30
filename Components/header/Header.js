import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-native';
import axios from 'axios';
import {Icon} from 'react-native-elements';
import moment from 'moment';
import {StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, FlatList} from 'react-native';
import WeatherOnline from '../weatherOnline/WeatherOnline';
import WeatherWeek from '../weatherWeek/WeatherWeek';
import Loader from '../loader/Loader';

export default function Header(props) {
    const ApiKey = 'fd1f53f8177eb0c4a8d64745c939c06a';
    const ApiKey2 = '4ea584bbaaa643258bd7de37b410b274';
    const [active, setActive] = useState(true);
    const [online, setOnline] = useState(0);
    const [week, setWeek] = useState('');
    const [city, setCity] = useState('');
    const [loader, setLoader] = useState({loader: false});
    const Change = () => {
        setActive(!active);
        setCity('');
    };

    const getWeather = (e) => {
        e.preventDefault();
        setActive(!active);
        setLoader({loader: true});
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric&lang`)
            .then(result => {
                if (result.data.cod === 200) {
                    setOnline({
                        country: result.data.sys.country,
                        city: result.data.name,
                        temp: result.data.main.temp_max,
                        description: result.data.weather[0].description,
                        id: result.data.weather[0].id,
                        humidity: result.data.main.humidity,
                        pressure: result.data.main.pressure,
                        sunrise: result.data.sys.sunrise,
                        sunset: result.data.sys.sunset,
                        error: undefined,
                    });
                    setLoader({loader: false});
                    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${ApiKey2}`)
                        .then(res => {
                            setWeek(
                                {
                                    country: res.data.country_code,
                                    city: res.data.city_name,
                                    day: res.data.data.slice(0, 7).map(item => {
                                            let icon = '';
                                            switch (true) {
                                                case((item.weather.code >= 200) && (item.weather.code <= 232)):
                                                    icon = 'weather-lightning';
                                                    break;
                                                case((item.weather.code >= 300) && (item.weather.code <= 321)):
                                                    icon = 'weather-rainy';
                                                    break;
                                                case((item.weather.code >= 500) && (item.weather.code <= 504)):
                                                    icon = 'weather-pouring';
                                                    break;
                                                case(item.weather.code === 511):
                                                    icon = 'snowflake';
                                                    break;
                                                case((item.weather.code >= 520) && (item.weather.code <= 531)):
                                                    icon = 'weather-rainy';
                                                    break;
                                                case((item.weather.code >= 600) && (item.weather.code <= 622)):
                                                    setIcon('snowflake');
                                                    break;
                                                case((item.weather.code >= 701) && (item.weather.code <= 781)):
                                                    icon = 'weather-fog';
                                                    break;
                                                case(item.weather.code === 800):
                                                    icon = 'white-balance-sunny';
                                                    break;
                                                case(item.weather.code === 801):
                                                    icon = 'weather-partlycloudy';
                                                    break;
                                                case((item.weather.code >= 802) && (item.weather.code <= 804)):
                                                    icon = 'weather-cloudy';
                                                    break;
                                                default:
                                                    icon = '';
                                            }
                                            return (
                                                <View style={style.FlexInfo}>
                                                    <Text style={style.Week}>{moment(item.valid_date).format('dd')}</Text>
                                                    <Icon
                                                        name={icon}
                                                        type='material-community'
                                                        color="#2C3E50"
                                                        size={24}
                                                    />
                                                    <Text style={style.Week}>{Math.floor(item.min_temp) + '\xB0C'}</Text>
                                                    <Text style={style.Week}>{Math.floor(item.max_temp) + '\xB0C'}</Text>
                                                </View>
                                            );
                                        },
                                    ),
                                });
                        });
                } else {
                    setLoader({loader: false});
                }
            });
    };
    return (
        <View>
            <View style={active ? style.Block : style.BlockReverse}>
                {active ? <Text style={style.Text}>Weather App</Text> :
                    <View style={style.FlexInput}>
                        <TextInput style={style.Input}
                                   onChangeText={(city) =>
                                       setCity(city)
                                   }
                                   placeholder='Example: London,GB'
                                   returnKeyType='search'
                                   autoFocus={true}
                                   value={city}
                                   onSubmitEditing={getWeather}
                        />
                        <TouchableWithoutFeedback onPress={() => setCity('')}>
                            <Icon
                                name='close'
                                type='antdesign'
                                color={city ? '#636363' : '#CFCFCF'}
                                size={22}
                            />
                        </TouchableWithoutFeedback>
                    </View>}

                <TouchableOpacity style={active ? style.Search : style.Arrow} onPress={Change}>
                    {loader.loader ? <Loader/> :
                        <Icon
                            name={active ? 'search' : 'arrowleft'}
                            type={active ? 'octicon' : 'antdesign'}
                            color="#2C3E50"
                            size={25}
                        />}
                </TouchableOpacity>
            </View>

            <Route exact path="/" render={() => <WeatherOnline
                id={online.id}
                country={online.country}
                city={online.city}
                temp={online.temp}
                description={online.description}
                humidity={online.humidity}
                pressure={online.pressure}
                sunrise={online.sunrise}
                sunset={online.sunset}
            />}/>
            <Route path='/week' render={() => <WeatherWeek
                country={week.country}
                city={week.city}
                week={week.day}/>}/>

        </View>
    );
}

const style = StyleSheet.create({
    Block: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    BlockReverse: {
        height: 60,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    Text: {
        marginLeft: 15,
        fontSize: 18,
        fontFamily: 'Raleway-SemiBold',
        color: '#2C3E50',
    },
    Input: {
        width: 250,
        height: 37,

    },
    FlexInput: {
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ECECEC',
        marginRight: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    Search: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 40,
        height: 40,
        marginRight: 15,
    },
    Arrow: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 40,
        height: 40,
        marginLeft: 15,
    },
    FlexInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 320,
        height: 40,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: 'rgba(183,183,183,  0.14)',
        marginTop: 5,
        borderRadius: 10,

    },
    Week: {
        color: '#2C3E50',
        fontSize: 18,
    },
});



