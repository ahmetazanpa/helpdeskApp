import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, FlatList,Fab } from 'native-base';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-remix-icon';
import firestore from '@react-native-firebase/firestore';

const Home = ({ navigation }) => {
    const [tasks, setTasks] = useState({})
    const arr = [];

    useEffect(async () => {
        await firestore()
            .collection('tasks')
            .get()
            .then(documentSnapshot => {
                documentSnapshot.forEach(doc => {
                    arr.push({ id: doc.id, data: doc.data() })
                })
            });
        setTasks(arr)
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (

                    <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', margin: 10, borderRadius: 25 }}>
                        <Text px={5} py={2} rounded="md" my={1} >
                            {item.data.taskTitle}
                        </Text>
                        <Text px={5} py={2} rounded="md" my={1} alignSelf="flex-end" fontWeight="bold" >
                            {item.data.user}
                        </Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                scrollEnabled
            />
            <FAB
                style={styles.fab}
                color="#ffff"
                icon={()=> <Icon name="ri-add-line" size="25" color="white" />}
                onPress={() => navigation.navigate('TaskPage')}
            />
            {/* <Fab
                position="absolute"
                size="sm"
                label={
                    <Text color="white" fontSize="md">
                        YENİ GÖREV
                    </Text>
                }
                icon={<Icon name="ri-add-line" size="30" color="white" />}
                onPress={() => navigation.navigate('NewTask')}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
      position: 'absolute',
      backgroundColor: '#06b6d4',
      margin: 25,
      right: 0,
      bottom: 0,
    },
  })

export default Home

