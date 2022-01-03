import { CREATE_OR_EDIT_TASK } from "./taskTypes"

export const createOrEditTask = (id, task) => ({
    type: CREATE_OR_EDIT_TASK,
    payload: task,
    schedule_id: id
})
