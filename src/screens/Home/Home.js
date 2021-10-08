import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FlatList } from 'native-base';
import { FAB, Badge } from 'react-native-paper';
import Icon from 'react-native-remix-icon';
import moment from 'moment';
import 'moment/locale/tr';
import firestore from '@react-native-firebase/firestore';

const Home = ({ navigation }) => {
    const [tasks, setTasks] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const arr = [];

    useEffect(() => {
        getTasksData()
    }, [])

    const getTasksData = async () => {
        await firestore()
            .collection('tasks')
            .get()
            .then(documentSnapshot => {
                documentSnapshot.forEach(doc => {
                    arr.push({ id: doc.id, data: doc.data() })
                })
            });
        setTasks(arr)
    }

    const header = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, alignContent: 'center', paddingBottom: 10 }}>
            <Text style={styles.headerText}>#</Text>
            <Text style={styles.headerText}>Görev Konusu</Text>
            <Text style={styles.headerText}>Kaydı Açan</Text>
            <Text style={styles.headerText}>Tarih</Text>
        </View>
    )

    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("TaskDetail", { item: item })}>
            <View style={{ flexDirection: 'row',  justifyContent: 'space-between', marginLeft: 10, marginRight: 10, alignContent: 'center', paddingBottom: 10 }}>
            <Badge style={{ marginLeft: 4, backgroundColor: item.data.priority === "Öncelikli" ? "#FF0000" :  item.data.priority == "Normal" ? "#FFFF00" : "#00FF00" }} />
            <Text style={styles.itemText}>{item.data.taskTitle}</Text>
            <Text style={styles.itemText}>{item.data.user}</Text>
            <Text style={styles.itemText}>{moment.unix(item.data.createDate.seconds).format('DD/MM/YY  HH:mm')}</Text>
        </View>
        </TouchableOpacity>
    )

    const onRefresh = () => {
        setRefreshing(true);
        getTasksData();
        setRefreshing(false);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
                ListHeaderComponent={() => header()}
            />
            <FAB
                style={styles.fab}
                color="#ffff"
                icon={() => <Icon name="ri-add-line" size="25" color="white" />}
                onPress={() => navigation.navigate('Task')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5
    },
    headerText: {
        fontWeight: 'bold', 
        fontSize: 14,
    },
    itemText: {
        fontSize: 10
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
        

