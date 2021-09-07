import React, {useState, useEffect} from 'react'
import {
    FormControl,
    Input,
    TextArea,
    Button,
    Stack,
    Select,
    ScrollView,
    CheckIcon,
    VStack,
} from "native-base"
import firestore from '@react-native-firebase/firestore';


const Task = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false)
    const [titles, setTitles] = useState([])
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDetail, setTaskDetail] = useState("")

    useEffect(() => {
        firestore()
          .collection('users')
          .doc('4aSGOqYecSLTwoDOM2Fd')
          .get()
          .then(documentSnapshot => {
              setUsers(documentSnapshot.data().user)
          });

          firestore()
          .collection('taskTitle')
          .doc('CExZSljPUoBV53fOuDR3')
          .get()
          .then(documentSnapshot => {
              setTitles(documentSnapshot.data().title)
          });

      }, []);
     
    const addItem = async () => {
        setLoading(true);
        await firestore().collection('tasks').add({
            taskTitle: taskTitle,
            taskDetail: taskDetail,
            user: user
        });
        setLoading(false);
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
                            onValueChange={(itemValue) => setTaskTitle(itemValue)}
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
                    <TextArea onChangeText={setTaskDetail} value={taskDetail} placeholder="Yaşamış olduğunuz problemi yazınız" />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Problemi Yaşayan Kişi</FormControl.Label>
                    <VStack space={4}>
                        <Select
                            selectedValue={user}
                            minWidth={200}
                            accessibilityLabel="İsim Soyisminizi Seçiniz"
                            placeholder="İsim Soyisminizi Seçiniz"
                            onValueChange={(itemValue) => setUser(itemValue)}
                            _selectedItem={{
                                bg: "cyan.600",
                                endIcon: <CheckIcon size={4} />,
                            }}
                        >
                        {
                            users.map(user => {
                                return <Select.Item key={user.nameSurname} label={user.nameSurname + "\t(" + user.title + ")" } value={user.nameSurname} />
                            })
                        }
                        </Select>
                    </VStack>
                </FormControl>
                <Button isLoading={loading} isLoadingText="Oluştur" variant="solid" onPress={ addItem }>
                    OLUŞTUR
                </Button>
            </Stack>
        </ScrollView>
    )
}

export default Task
