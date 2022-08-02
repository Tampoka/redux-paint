import {historyIndex, redo, undo} from './slice';

describe("historyIndex reducer", () => {
    test('undoes current stroke', () => {
        let startState:number=0
        let undoLimit: number = 5

        const endState = historyIndex(startState, undo(undoLimit))

        expect(endState).toBe(1)
    })

    test('redoes previous stroke', () => {
        let startState:number=10
        const endState = historyIndex(startState, redo())

        expect(endState).toBe(9)
    })
})
