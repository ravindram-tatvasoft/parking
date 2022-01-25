import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SlotListType } from '../../types/slot-list-tyle'

export interface CounterState {
  totalParking: number
  slotList: SlotListType[]
}

const initialState: CounterState = {
    totalParking: 0,
    slotList: []
}

export const parkingSlotSlice = createSlice({
  name: 'parkingSlot',
  initialState,
  reducers: {
    setTotalParking: (state, action) => {
      state.totalParking = action.payload
    },
    setParkingSlotList: (state, action) => {
      state.slotList = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTotalParking, setParkingSlotList  } = parkingSlotSlice.actions

export default parkingSlotSlice.reducer