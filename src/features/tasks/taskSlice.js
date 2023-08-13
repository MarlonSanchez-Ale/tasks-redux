import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        id: "1",
        title: "Task 1",
        description: "Task 1 description",
        status: "ABIERTO"
    },
    {
        id: "2",
        title: "Task 2",
        description: "Task 2 description",
        status: "ABIERTO"
    },
    {
        id: "3",
        title: "Task 3",
        description: "Task 3 description",
        status: "ABIERTO"
    }
]

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        editTask: (state, action) => {
            const {id, title, description} = action.payload

            const foundTask = state.find(task => task.id === id)

            if (foundTask) {
                foundTask.title = title
                foundTask.description = description
            }
        },
        deleteTask : (state, action) => {
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

export const { addTask, editTask, deleteTask, deleteAll } = taskSlice.actions

export default taskSlice.reducer 