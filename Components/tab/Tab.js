import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Link} from 'react-router-native';
import {Icon} from 'react-native-elements';


export default function Tab() {

    const [active, setActive] = useState(0);

    const menu = [
        {
            title: 'Online',
            icon: 'thermometer-half',
            link: '/',
        },
        {
            title: 'Week',
            icon: 'calendar',
            link: '/week',

        },
    ];

    return (
        <View style={style.Flex}>
            {menu.map((item, idx) =>
                <Link key={idx} to={item.link} underlayColor="rgba(0, 0, 0, 0)" style={style.Tab} onPress={()=>setActive(idx)}>
                    <View>
                        <Icon
                            name={item.icon}
                            type="font-awesome"
                            color={idx === active ? '#00ACED' : '#b2b2b2'}
                            size={25}
                            reverseColor="black"
                        />
                        <Text style={{color: idx === active ? '#00ACED' : '#b2b2b2'}}>{item.title}</Text>
                    </View>
                </Link>
            )}

        </View>
    );
}

const style = StyleSheet.create({
    Flex: {
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginBottom: 5,
    },
    Tab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },

});

