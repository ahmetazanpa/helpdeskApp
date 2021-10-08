import React, { useState, useEffect } from 'react'
import {
    FormControl,
    TextArea,
    Button,
    Stack,
    Input,
    ScrollView,
} from "native-base"

const TaskDetail = ({ route, navigation, }) => {
    const [loading, setLoading] = useState(false)
    const { item } = route.params;

    const taskClosed = () => {
        setLoading(true);
        navigation.navigate("Home")
        setLoading(false);
    }   

    return (
        <ScrollView>
            <Stack space={4} px={4} safeArea mt={6}>
                <FormControl isDisabled mb="5">
                    <FormControl.Label>
                       Görev Konusu
                    </FormControl.Label>
                    <Input placeholder="Görev Konusu" value={item.data.taskTitle} />
                </FormControl>
                <FormControl isDisabled mb="5">
                    <FormControl.Label>
                        Görev Açıklaması
                    </FormControl.Label>
                    <TextArea placeholder="Görev Açıklaması" value={item.data.taskDetail} />
                </FormControl>
                <FormControl isDisabled mb="5">
                    <FormControl.Label>
                        Problemi Yaşayan Kişi
                    </FormControl.Label>
                    <Input placeholder="Problemi Yaşayan Kişi" value={item.data.user} />
                </FormControl>
                <Button isLoading={loading} isLoadingText="KAYDI KAPAT" backgroundColor="red" variant="solid" onPress={taskClosed} >
                    KAYDI KAPAT
                </Button>
            </Stack>
        </ScrollView>
    )
}

export default TaskDetail
