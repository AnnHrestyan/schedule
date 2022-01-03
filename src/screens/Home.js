import React, {useEffect, useState} from "react";
import {View, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {
    Layout,
    Text
} from "react-native-rapi-ui";
import {size} from "../utils/font-size";
import {useSelector} from 'react-redux'
import {getParsedDate, getParsedTime} from "../utils/time";

export default function ({navigation}) {
    const schedule = useSelector(state => state.schedule)

    const curr = new Date;
    const firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    const lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));

    const [timerCount, setTimer] = useState(60)
    const [isViewed, setIsViewed] = useState([])

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval)
                return lastTimerCount - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, []);

    useEffect(() => {
        schedule.forEach((item) => {
            item.tasks.forEach((task) => {
                let msDiff = new Date(task.start).getTime() - new Date().getTime();
                let daysTill30June2035 = Math.floor(msDiff / (1000 * 60));
                console.log(daysTill30June2035);
                if (daysTill30June2035 <= 5) {
                    if (!isViewed.includes(task.id)) {
                        alert(`До начала выполнения задачи "${task.title}" осталось 5 минут`)
                        setIsViewed(oldArray => [...oldArray, task.id]);
                    }
                }
            })
        })
    }, [timerCount, schedule])


    const Task = ({item, id, full_title}) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('EditScreen', {...item, schedule_id: id, full_title})}>
                <View style={styles.taskContainer}>
                    <View>
                        <Text style={styles.taskTitleText}>{item.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.taskTimeStartText}>{getParsedTime(item.start)} - {getParsedTime(new Date(item.start.getTime() + (item.runtime * 60 * 1000)))}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const Item = ({title, tasks, id, full_title}) => (
        <View style={styles.item}>
            <View style={styles.dayContainer}>
                <Text>{title}</Text>
            </View>
            <View style={styles.itemMainContainer}>
                {
                    tasks.map((item) => {
                        return <Task item={item} id={id} full_title={full_title}/>
                    })
                }
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('EditScreen', {schedule_id: id, full_title })}
                                      style={{flexDirection: 'column', justifyContent: 'center', margin: 'auto'}}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderItem = ({item}) => (
        <Item title={item.title} tasks={item.tasks} id={item.id} full_title={item.full_title}/>
    );

    return (
        <Layout style={styles.layout}>
            <Text style={styles.header}>Расписание</Text>
            <View style={styles.dateContainer}>
                <Text style={styles.date}>{getParsedDate(firstDay)}-{getParsedDate(lastDay)}</Text>
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    data={schedule}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </Layout>
    );
}
const styles = StyleSheet.create({
    layout: {
        paddingHorizontal: 1
    },
    header: {
        fontSize: size(40),
        textAlign: 'center',
        marginTop: 20,
        color: '#a07afe'
    },
    dateContainer: {
        backgroundColor: '#a200e6',
        borderWidth: 2,
        borderColor: '#000',
    },
    date: {
        paddingVertical: 10,
        fontSize: size(18),
        textAlign: 'center'
    },
    contentContainer: {
        backgroundColor: '#9a6ffe',
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#000'
    },
    itemMainContainer: {
        flex: 1
    },
    dayContainer: {
        padding: 20,
        borderRightColor: '#000',
        borderRightWidth: 2,
        alignItems: 'baseline',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    taskContainer: {
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingHorizontal: 10,
        paddingTop: 20
    },
    taskTitleText: {
        fontSize: size(18),
        textAlign: 'center'
    },
    taskTimeStartText: {
        textAlign: 'right',
        marginBottom: 4
    },
    addButtonText: {
        textAlign: 'right',
        marginTop: 10,
        marginRight: 4,
        fontSize: size(40)
    }
});
