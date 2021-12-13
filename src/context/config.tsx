import { Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import storeReducer from './store'

const store = configureStore({
    reducer: {
        store: storeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
// export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store