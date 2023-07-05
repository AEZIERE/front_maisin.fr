import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { dataResponseSlider } from './redux/data/data'

const rootReducer = combineReducers({
    dataResponse: dataResponseSlider.reducer
  });


export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store