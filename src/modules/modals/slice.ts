import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {Optional} from '../../utils/sharedTypes';

export type ModalState = {
    isShown: boolean
    modalName: Optional<string>
}

const initialState: ModalState = {
    isShown: false,
    modalName: null
};

const slice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        show: (state, action: PayloadAction<string>) => {
            state.isShown = true
            state.modalName = action.payload
        },
        hide: (state) => {
            state.isShown = false
            state.modalName = null
        }
    },
})

export const modalVisible = slice.reducer

export const { show, hide } = slice.actions