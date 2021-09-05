import React, {useState, useEffect} from 'react'
import {
    FormControl,
    Input,
    TextArea,
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

    useEffect(() => {
        const subscriber = firestore()
          .collection('users')
          .doc('4aSGOqYecSLTwoDOM2Fd')
          .get()
          .then(documentSnapshot => {
            setUsers(documentSnapshot.data().user)
          });
        // Stop listening for updates when no longer required
        return () => subscriber();
      }, []);
    
    return (
        <ScrollView>
            <Stack space={4} px={4} safeArea mt={6}>
                <FormControl>
                    <FormControl.Label>Görev Konusu</FormControl.Label>
                    <Input />
                    <FormControl.HelperText>
                        Probleminize ait konuyu seçiniz.
                    </FormControl.HelperText>
                </FormControl>
                <FormControl>
                    <FormControl.Label>Görev Açıklaması(*Yaşamış olduğunuz problemi yazınız.)</FormControl.Label>
                    <TextArea />
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
                            users.map((user) => {
                                <Select.Item label={user.nameSurname + "/t(" + user.title + ")" } value={user.nameSurname} />
                            })
                        }
                        </Select>
                    </VStack>
                    <FormControl.HelperText>
                    Listeden İsminizi Seçiniz.
                    </FormControl.HelperText>
                </FormControl>
            </Stack>
        </ScrollView>
    )
}

export default Task
