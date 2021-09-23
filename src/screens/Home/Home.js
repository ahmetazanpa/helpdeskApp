import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, FlatList, Fab } from 'native-base';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-remix-icon';
import firestore from '@react-native-firebase/firestore';
import { DataTable } from 'react-native-paper';


const optionsPerPage = [3, 5, 10];

const Home = ({ navigation }) => {
    const [tasks, setTasks] = useState([])
    const arr = [];
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

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

    useEffect(() => {
        setPage(2);
    }, [itemsPerPage]);

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1}}>
                <DataTable style={{ flex: 1 }}>
                    <DataTable.Header>
                        <DataTable.Title>Konu</DataTable.Title>
                        <DataTable.Title style={{ justifyContent: 'space-evenly' }}>Kullanıcı</DataTable.Title>
                    </DataTable.Header>
                    {
                        tasks.map((item) => {
                            return (
                                <DataTable.Row key={item.id}>
                                    <DataTable.Cell>{item.data.taskTitle}</DataTable.Cell>
                                    <DataTable.Cell style={{ justifyContent: 'space-evenly' }}>{item.data.user}</DataTable.Cell>
                                </DataTable.Row>
                            )
                        })
                    }
                    <DataTable.Pagination
                        page={page}
                        numberOfPages={ Math.ceil(tasks.length / 10) }
                        onPageChange={(page) => setPage(page)}
                        label={`${tasks.length} kayıt için ${Math.ceil(tasks.length / 10)} sayfa gösteriliyor.`}
                        optionsPerPage={optionsPerPage}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        showFastPagination
                        optionsLabel={'Sayfa başına satır'}
                    />
                </DataTable>
            </ScrollView>
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
        // <FlatList
        //         data={tasks}
        //         renderItem={({ item }) => (
        //             <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', margin: 10, borderRadius: 25 }}>
        //                 <Text px={5} py={2} rounded="md" my={1} >
        //                     {item.data.taskTitle}
        //                 </Text>
        //                 <Text px={5} py={2} rounded="md" my={1} alignSelf="flex-end" fontWeight="bold" >
        //                     {item.data.user}
        //                 </Text>
        //             </View>
        //         )}
        //         keyExtractor={(item) => item.id}
        //         scrollEnabled
        //     /> 
        //     <Fab
        //         position="absolute"
        //         size="sm"
        //         label={
        //             <Text color="white" fontSize="md">
        //                 YENİ GÖREV
        //             </Text>
        //         }
        //         icon={<Icon name="ri-add-line" size="30" color="white" />}
        //         onPress={() => navigation.navigate('NewTask')}
        //     /> 

