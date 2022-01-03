import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, ScrollView} from "react-native";
import {
    Text
} from "react-native-rapi-ui";
import {size} from "../utils/font-size";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch} from "react-redux";
import {createOrEditTask} from "../store/taskAction";
import {getParsedTime} from "../utils/time";

export default function ({route, navigation}) {
    const dispatch = useDispatch()

    const item = route.params;

    const [title, setTitle] = useState(item?.title ? item.title : '');
    const [description, setDescription] = useState(item?.description ? item.description : '');
    const [runtime, setRuntime] = useState(item?.runtime ? item.runtime : '');
    const [start, setStart] = useState(item?.start ? new Date(item.start) : new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || start;
        setShow(Platform.OS === 'ios');
        setStart(currentDate);
    };

    const checkTextInput = () => {
        let isValid = true;
        if (!title.trim()) {
            alert('Пожалуйста, введите название');
            isValid = false;
        }
        if (!description.trim()) {
            alert('Пожалуйста, введите описание');
            isValid = false;
        }
        if (!runtime.trim()) {
            alert('Пожалуйста, введите время на задание');
            isValid = false;
        }
        return isValid;
    };

    const save = () => {
        if (checkTextInput()) {
            dispatch(createOrEditTask(item.schedule_id, {
                id: item.id,
                title,
                description,
                runtime,
                start
            }))
            navigation.navigate('Home')
        }
    }

    return (
        <ScrollView style={styles.whiteBg}>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={"padding"}
                keyboardVerticalOffset={-1000}
            >
                <Text style={styles.header}>{item.full_title}</Text>

                <View style={{flex: 1}}>
                    <Text style={styles.label}>Название</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}
                        placeholder="Введите название"
                    />
                </View>

                <View style={{flex: 1}}>
                    <Text style={styles.label}>Описание</Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        onChangeText={setDescription}
                        value={description}
                        multiline
                        numberOfLines={6}
                        placeholder="Введите описание"
                    />
                </View>

                <View style={{alignItems: 'baseline'}}>
                    <Text style={styles.label}>Время начала</Text>
                    <View style={[styles.input, styles.time]}>
                        <Text onPress={() => setShow(true)}>
                            {getParsedTime(start)}
                        </Text>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={start}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>

                <View style={{alignItems: 'baseline'}}>
                    <Text style={styles.label}>Время на задание (минуты)</Text>
                    <TextInput
                        style={[styles.input, {alignSelf: 'center'}]}
                        keyboardType='numeric'
                        onChangeText={(text) => setRuntime(text.replace(/[^0-9]/g, ''))}
                        value={runtime}
                        placeholder="Введите время"
                        maxLength={3}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Назад</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={save} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Сохранить</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>

    );
}
const styles = StyleSheet.create({
    whiteBg: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
    },
    header: {
        fontSize: size(40),
        textAlign: 'center',
        marginTop: 20,
        color: '#a07afe'
    },
    label: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: size(30),
        marginBottom: 20,
        alignItems: 'center',
        alignSelf: 'center',
    },
    input: {
        borderColor: '#000',
        borderWidth: 2,
        padding: 10,
    },
    textarea: {
        textAlignVertical: 'top'
    },
    time: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonsContainer: {
        marginVertical: 40,
        flex: 1,
        flexDirection: 'row',
    },
    saveButton: {
        backgroundColor: '#00d586',
        borderRadius: 10,
        borderColor: '#00d586',
        borderWidth: 2,
        flex: 1,
        marginLeft: 5
    },
    saveButtonText: {
        color: '#fff',
        paddingVertical: 10,
        textAlign: 'center'
    },
    backButton: {
        backgroundColor: '#dadada',
        borderRadius: 10,
        borderColor: '#ec2f62',
        borderWidth: 2,
        flex: 1,
        marginRight: 5
    },
    backButtonText: {
        color: '#ec2f62',
        paddingVertical: 10,
        textAlign: 'center'
    },
});
