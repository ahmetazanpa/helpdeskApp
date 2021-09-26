import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-remix-icon';
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ flex: 1, }}>
                <View style={styles.menuHeader}>
                    <View style={[styles.circleContainer, styles.menuHeaderImage,]}>
                        <Icon travel name="ri-user-line" size={40} color="#0e7490" />
                    </View>
                    <Text>Name Surname</Text>
                    <Text>Title</Text>
                </View>
                <View style={styles.menuContainer}>
                    <View style={styles.menuItemsContainer}>
                        <Icon name="ri-briefcase-line" size={25} color="#0e7490" />
                        <DrawerItem
                            style={styles.menuItemsTitle}
                            label="Görev Listesi"
                            labelStyle={{ color: '#0e7490' }}
                            onPress={() => {
                                props.navigation.navigate('HomePage');
                            }}
                        />
                    </View>
                    <View style={styles.menuItemsContainer}>
                        <Icon name="ri-user-settings-line" size={25} color="#0e7490" />
                        <DrawerItem
                            style={styles.menuItemsTitle}
                            label="Kullanıcı Ayarları"
                            labelStyle={{ color: '#0e7490' }}
                            onPress={() => {
                                props.navigation.navigate('Settings');
                            }}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center',}}>
                    <Text style={{fontSize: 12, padding: 5}}>@Boğazhisar - { new Date().getFullYear() }</Text>
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
    menuHeader: {
        flex: 1/3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    menuHeaderImage: {
        marginTop: 10,
        marginBottom: 5,
        borderColor: '#0e7490',
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuContainer: {
        flex: 1/2,
        flexDirection: 'column',
        paddingLeft: 15,
    
    },
    menuItemsContainer:{ 
        flexDirection: 'row', 
        marginTop: 10, 
        marginBottom: 10 
    },
    menuItemsTitle: {
        alignSelf: 'center',
        position: 'absolute',
        left: 25,
        width: '100%',
    },
    circleContainer: {
        width: 60,
        height: 60,
        borderRadius: 35,
        padding: 10,
    },
});