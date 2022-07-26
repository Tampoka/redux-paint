import { RootState } from "../../utils/types"

export const modalVisibleSelector = (state: RootState) =>
    state.modalVisible.isShown

export const modalNameSelector = (state: RootState) =>
    state.modalVisible.modalName