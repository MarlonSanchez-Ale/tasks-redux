import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        editTask: (state, action) => {
            const { id, title, description } = action.payload

            const foundTask = state.find(task => task.id === id)

            if (foundTask) {
                foundTask.title = title
                foundTask.description = description

            }
        },
        editState: (state, action) => {
            const foundTask = state.find(task => task.id === action.payload)

            if (foundTask) {
                foundTask.status = !foundTask.status
            }
        },
        deleteTask: (state, action) => {
            const taskFound = state.find(task => task.id === action.payload)
            if (taskFound) {
                state.splice(state.indexOf(taskFound), 1)
            }
        },
        deleteAll: (state, action) => {
            state.splice(0, state.length)
        }
    }
})

export const { addTask, editTask, editState, deleteTask, deleteAll } = taskSlice.actions
export default taskSlice.reducer 