import React from 'react';
import Tab from './Components/tab/Tab';
import {NativeRouter} from 'react-router-native';
import Header from './Components/header/Header';

export default function App() {
    return <NativeRouter>
                <Header/>
                <Tab/>
        </NativeRouter>

}


