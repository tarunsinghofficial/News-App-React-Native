import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Switch, Image } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../config/themeContext';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerContent(props) {

    //Theme
    const theme = useContext(themeContext);
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <DrawerContentScrollView {...props}>
            <View style={{
                backgroundColor: theme.headerColor,
                alignItems: 'center',
                marginTop: -10,
                marginBottom: 10,
            }}>
            <Image 
                source={require('../assets/img/header-logo.png')} 
                style={{
                    width: 50,
                    height: 50,
                    backgroundColor: theme.headerColor,
                }}
            />
            <Text style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                alignItems: 'center',
            }}>The NewsXTimes</Text>
            </View>
            
            <DrawerItem
                label="Country News"
            />
            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.5,
                    width: '100%',
                    alignSelf: 'center',
                }}
            />
            <DrawerItemList {...props} />
            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.5,
                    width: '100%',
                    alignSelf: 'center',
                }}
            />
            <DrawerItem
                label="Theme"
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 8,
                backgroundColor: theme.headerColor,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
            }}>
                <Ionicons name='ios-moon-sharp' size={25} color={theme.iconColor} />
                <Text style={{ 
                    fontSize: 18, 
                    fontWeight: 'bold', 
                    color: theme.iconColor, 
                    alignItems: 'center',
                }}>Dark Mode</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#ffffff" : "#E4F2EF"}
                    value={isEnabled}
                    onValueChange={(value) => {
                        setIsEnabled(value)
                        EventRegister.emit('themeChange', value)
                    }}
                    style={{
                        marginTop: -13
                    }}
                />
            </View>
        </DrawerContentScrollView>
    );
}