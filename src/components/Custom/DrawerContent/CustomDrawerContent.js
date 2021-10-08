import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-remix-icon';
import {
    DrawerContentScrollView,
    DrawerContent,
    DrawerItem,
} from '@react-navigation/drawer';
import { AuthContext } from '../../context';
import AsyncStorage from '@react-native-community/async-storage';

function CustomDrawerContent(props) {
    const { signOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <View>
                <View style={styles.menuHeader}>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>NameSurname</Text>
                    <Text style={{fontSize: 16, }}>Title</Text>
                </View>
                <View style={styles.menuContainer}>
                    <View style={styles.menuItemsContainer}>
                        <Icon name="ri-briefcase-line" size={25} color="#0e7490" />
                        <DrawerItem
                            style={styles.menuItemsTitle}
                            label="Görev Listesi"
                            labelStyle={{ color: '#0e7490' }}
                            onPress={() => {
                                props.navigation.navigate('Home');
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
                    <View style={styles.menuItemsContainer}>
                        <Icon name="ri-door-open-line" size={25} color="#0e7490" />
                        <DrawerItem
                            style={styles.menuItemsTitle}
                            label="Çıkış"
                            labelStyle={{ color: '#0e7490' }}
                            onPress={() => {
                                signOut();
                                props.navigation.navigate('SignOut');

                            }}
                        />
                    </View>
                </View>
                <View style={styles.menuFooter}>
                    <Text style={styles.footerText}>@Boğazhisar - { new Date().getFullYear() }</Text>
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
    menuHeader: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 15,
        height: 60
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 15,
        height: 515    
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
    menuFooter:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        height: 50
    },
    footerText:{
        fontSize: 12, 
        padding: 5
    }
});