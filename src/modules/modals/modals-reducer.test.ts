import {hide, ModalState, modalVisible, show} from './slice';

describe("modals reducer", () => {
    test('shows correct modal', () => {
        let startState: ModalState = {
            isShown: false,
            modalName: null
        }
        let modalName: string = "PROJECTS_SAVE_MODAL"

        const endState = modalVisible(startState, show(modalName))

        expect(endState.isShown).toBe(true)
        expect(endState.modalName).toBe("PROJECTS_SAVE_MODAL")
    })

    test('hides correct modal', () => {
        let startState: ModalState = {
            isShown: true,
            modalName: "PROJECTS_SAVE_MODAL"
        }
        const endState = modalVisible(startState, hide())

        expect(endState.isShown).toBe(false)
        expect(endState.modalName).toBe(null)
    })
})
