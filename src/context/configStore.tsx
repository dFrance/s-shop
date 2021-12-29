import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'
import storeReducer from './store'


const store = configureStore({
    reducer: {
        store: storeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store