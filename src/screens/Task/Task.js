import React, {useState} from 'react'
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

const Task = () => {
    let [language, setLanguage] = React.useState("")
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
                            selectedValue={language}
                            minWidth={200}
                            accessibilityLabel="Select your favorite programming language"
                            placeholder="Select your favorite programming language"
                            onValueChange={(itemValue) => setLanguage(itemValue)}
                            _selectedItem={{
                                bg: "cyan.600",
                                endIcon: <CheckIcon size={4} />,
                            }}
                        >
                            <Select.Item label="JavaScript" value="js" />
                            <Select.Item label="TypeScript" value="ts" />
                            <Select.Item label="C" value="c" />
                            <Select.Item label="Python" value="py" />
                            <Select.Item label="Java" value="java" />
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
