import {CREATE_OR_EDIT_TASK} from "./taskTypes";

const initialState = {
    schedule: [
        {
            id: 1,
            title: 'ПН',
            full_title: 'Понедельник',
            tasks: []
        },
        {
            id: 2,
            title: 'ВТ',
            full_title: 'Вторник',
            tasks: []
        },
        {
            id: 3,
            title: 'СР',
            full_title: 'Среда',
            tasks: []
        },
        {
            id: 4,
            title: 'ЧТ',
            full_title: 'Четверг',
            tasks: []
        },
        {
            id: 5,
            title: 'ПТ',
            full_title: 'Пятница',
            tasks: []
        },
        {
            id: 6,
            title: 'СБ',
            full_title: 'Суббота',
            tasks: []
        },
        {
            id: 7,
            title: 'ВС',
            full_title: 'Воскресенье',
            tasks: []
        },
    ]
}
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_OR_EDIT_TASK:
            const newSchedule = [...state.schedule];
            newSchedule.map((item) => {
                if (item.id === action.schedule_id) {
                    if (action.payload?.id) {
                        item.tasks = item.tasks.map((task) => {
                            if (action.payload.id === task.id) {
                                return {
                                    ...action.payload
                                }
                            } else {
                                return task
                            }
                        })
                    } else {
                        const tempTasks = item.tasks;
                        tempTasks.push(action.payload)
                        tempTasks.forEach((temp, i) => {
                            temp.id = item.id.toString() + i + 1;
                        });
                        return {
                            ...item,
                            tasks: tempTasks
                        }
                    }
                }
            })
            return {
                schedule: newSchedule
            };
        default:
            return state;
    }
}
export default taskReducer
