import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

// Define a type for the slice state
export interface Data {
    salespack: string;
    category:string;
    material: string;
    room: string | null;
    worktype: string | null;
}

// Define the initial state using that type
const initialState: Data =  {
    salespack: "",
    category: "",
    material: "",
    room: null,
    worktype: null,
};

export const dataResponseSlider = createSlice({
  name: 'dataResponse',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Data>) => {
        state.salespack = action.payload.salespack
        state.category = action.payload.category
        state.material = action.payload.material
        state.room = action.payload.room
        state.worktype = action.payload.worktype
        },
  }
})

export const { setData } = dataResponseSlider.actions

export default dataResponseSlider.reducer