import React, { useState, useEffect } from 'react'
import {
    FormControl,
    TextArea,
    Button,
    Collapse,
    IconButton,
    CloseIcon,
    Stack,
    Input,
    Select,
    ScrollView,
    CheckIcon,
    VStack,
    Alert
} from "native-base"
import uuid from 'react-native-uuid'
import UUIDGenerator from 'react-native-uuid-generator'
import firestore from '@react-native-firebase/firestore'


const Task = ({navigation}) => {
    //const [users, setUsers] = useState([])
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false)
    const [titles, setTitles] = useState([])
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDetail, setTaskDetail] = useState("")
    const [alertVisible, setAlertVisible] = useState(false)
    const [priority, setPriority] = useState("")
    const priorities = ["Önceliksiz", "Normal", "Öncelikli"]

    useEffect(() => {
        firestore()
            .collection('taskTitle')
            .doc('CExZSljPUoBV53fOuDR3')
            .get()
            .then(documentSnapshot => {
                setTitles(documentSnapshot.data().title)
            });

    }, []);

    const addItem = async () => {
        if (taskTitle !== "" && taskDetail !== "" && user !== "" && priority !== "") {
            setAlertVisible(false)
            setLoading(true);
            await firestore().collection('tasks').add({
                taskId: uuid.v4(),
                taskTitle: taskTitle,
                taskDetail: taskDetail,
                user: user,
                priority: priority,
                createDate: new Date(),
            });
            setLoading(false);
            navigation.navigate("Home")
        }
        else {
            setAlertVisible(true)
        }
    }

    return (
        <ScrollView>
            <Stack space={4} px={4} safeArea mt={6}>
                <FormControl>
                    <FormControl.Label>Görev Konusu</FormControl.Label>
                    <VStack space={4}>
                        <Select
                            selectedValue={taskTitle}
                            minWidth={200}
                            accessibilityLabel="Yaşamış olduğunuz problemi seçiniz"
                            placeholder="Yaşamış olduğunuz problemi seçiniz"
                            onValueChange={(itemValue) => { setTaskTitle(itemValue) }}
                            _selectedItem={{
                                bg: "cyan.600",
                                endIcon: <CheckIcon size={4} />,
                            }}
                        >
                            {
                                titles.map(title => {
                                    return <Select.Item key={title} label={title} value={title} />
                                })
                            }
                        </Select>
                    </VStack>
                </FormControl>
                <FormControl>
                    <FormControl.Label>Görev Açıklaması</FormControl.Label>
                    <TextArea onChangeText={setTaskDetail} value={taskDetail} placeholder="Problemi ve problemin olduğu yeri yazınız" />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Problemi Yaşayan Kişi</FormControl.Label>
                    <VStack space={4}>
                        <Input 
                            minWidth={200}
                            accessibilityLabel="İsim Soyisminizi Yazınız"
                            placeholder="İsim Soyisminizi Yazınız"
                            onChangeText={(itemValue) => { setUser(itemValue) }}
                            value={user}
                        />
                    </VStack>
                </FormControl>
                <FormControl>
                    <FormControl.Label>Öncelik Durumu</FormControl.Label>
                    <VStack space={4}>
                        <Select
                            selectedValue={priority}
                            minWidth={200}
                            accessibilityLabel="Görevin öncelik durumunu seçiniz"
                            placeholder="Görevin öncelik durumunu seçiniz"
                            onValueChange={(itemValue) => { setPriority(itemValue) }}
                            _selectedItem={{
                                bg: "cyan.600",
                                endIcon: <CheckIcon size={4} />,
                            }}
                        >
                            {
                                priorities.map(priority => {
                                    return <Select.Item key={priority} label={priority} value={priority} />
                                })
                            }
                        </Select>
                    </VStack>
                </FormControl>
                <Collapse isOpen={alertVisible}>
                    <Alert
                        status="error"
                        action={
                            <IconButton
                                icon={<CloseIcon size="xs" />}
                                onPress={() => setAlertVisible(false)}
                            />
                        }
                        actionProps={{
                            alignSelf: "center",
                        }}
                    >
                        <Alert.Icon />
                        <Alert.Title>Uyarı</Alert.Title>
                        <Alert.Description>Boş alan bırakmayınız</Alert.Description>
                    </Alert>
                </Collapse>
                <Button isLoading={loading} isLoadingText="Oluştur" variant="solid" onPress={addItem}>
                    OLUŞTUR
                </Button>
            </Stack>
        </ScrollView>
    )
}

export default Task
