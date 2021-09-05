import React from 'react'
import { View } from 'react-native'
import { Fab,Text } from 'native-base';
import Icon from 'react-native-remix-icon';

const Home = ({navigation}) => {
    return (
        <View>
            <Fab
                position="absolute"
                size="sm"
                label={
                    <Text color="white" fontSize="md">
                      YENİ GÖREV
                    </Text>
                }
                icon={ <Icon name="ri-add-line" size="30" color="white"/> }
                onPress={() => navigation.navigate('Task')}
            />
        </View>
    )
}

export default Home
