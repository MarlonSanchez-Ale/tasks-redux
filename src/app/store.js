import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../features/tasks/taskSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['taskManager']
}

const rootReducer = combineReducers({
    taskManager: taskReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})



