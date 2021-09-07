import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Fab, Text, FlatList } from 'native-base';
import Icon from 'react-native-remix-icon';
import firestore from '@react-native-firebase/firestore';

const Home = ({ navigation }) => {
    const [tasks, setTasks] = useState({})
    const arr = [];

    useEffect(() => {
        firestore()
        .collection('tasks')
        .get()
        .then(documentSnapshot => {
            documentSnapshot.docs.forEach(doc => {
              arr.push(doc.data())
            })
        });
        setTasks(arr)
    }, [])

    return (
        <View>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <View style={{ justifyContent: 'space-between', margin:10, backgroundColor: '#d2d2d2', borderRadius: 25}}>
                            <Text px={5} py={2} rounded="md" my={1} >
                                {item.taskTitle}
                            </Text>
                            <Text px={5} py={2} rounded="md" my={1} >
                                {item.taskDetail}
                            </Text>
                            <Text px={5} py={2} rounded="md" my={1} alignSelf="flex-end" >
                                {item.user}
                            </Text>
                    </View>
                    
                )}
                keyExtractor={(item) => item.id}
                scrollEnabled
               
            />
            <Fab
                position="absolute"
                size="sm"
                label={
                    <Text color="white" fontSize="md">
                        YENİ GÖREV
                    </Text>
                }
                icon={<Icon name="ri-add-line" size="30" color="white" />}
                onPress={() => navigation.navigate('Task')}
            />
        </View>
    )
}

export default Home
