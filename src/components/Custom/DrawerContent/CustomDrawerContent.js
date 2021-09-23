import React from 'react'
import { View, Text, StyleSheet, useWindowDimensions, Button } from 'react-native'
import Icon from 'react-native-remix-icon';
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';

function CustomDrawerContent(props) {
    const width = useWindowDimensions().width * 0.3;
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.menuContainer}>
                <View
                    style={[
                        styles.menuItemsCard,
                        { backgroundColor: '#EFFFD5', width: width, height: width },
                    ]}>
                    <View
                        style={[styles.circleContainer, { backgroundColor: '#b5ff39' }]}>
                        <Icon Medical name="ri-briefcase-line" size={30} color="#609806" />
                    </View>
                    <DrawerItem
                        style={{
                            position: 'absolute',
                            left: -10,
                            bottom: 2,
                            width: width,
                            height: width,
                        }}
                        label="Görev Listesi"
                        labelStyle={{ color: '#609806' }}
                        onPress={() => {
                            props.navigation.navigate('HomePage');
                        }}
                    />
                </View>
                <View
                    style={[
                        styles.menuItemsCard,
                        { backgroundColor: '#fff2df', width: width, height: width},
                    ]}>
                    
                    <View
                        style={[styles.circleContainer, { backgroundColor: '#FFC56F' }]}>
                        <Icon travel name="ri-user-settings-line" size={30} color="#fbae41" />
                        <DrawerItem
                            label="Görev Listesi"
                            labelStyle={{ color: '#fbae41', fontSize: 10, }}
                            onPress={() => {
                                props.navigation.navigate('Settings');
                            }}
                        />
                    </View>
                    
                    <DrawerItem
                        style={{
                            position: 'absolute',
                            left: -10,
                            bottom: 2,
                            width: width,
                            height: width,
                        }}
                        label="Ayarlar"
                        labelStyle={{ color: '#fbae41' }}
                        onPress={() => {
                            props.navigation.navigate('Settings');
                        }}
                    />
                </View>
                
            </View>

        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
    menuContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingBottom: 20,
    },
    menuItemsCard: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    circleContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      padding: 10,
    },
  });