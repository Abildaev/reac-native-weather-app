import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';


export default function Loader () {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="small" color="#00ACED" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})

