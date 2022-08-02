import {beginStroke, currentStroke, setStrokeColor, updateStroke} from './slice';
import {RootState} from '../../utils/types';
import {endStroke} from './actions';

let startState: RootState["currentStroke"] = {color: "#000", points: []}

describe("currentStroke reducer", () => {
    test('sets correct stroke color', () => {
        const strokeColor = "#ff0080"
        const endState = currentStroke(startState, setStrokeColor(strokeColor))

        expect(endState.color).toBe(strokeColor)
    })

    test('adds correct point object to points array on stroke beginning', () => {
        const startPoints = {x: 4, y: 10}
        const endState = currentStroke(startState, beginStroke(startPoints))

        expect(endState.points.length).toBe(1)
        expect(endState.points[0]).toEqual(startPoints)
    })
    test('updates points array with new point object on next stroke', () => {
        startState = {color: "#000", points: [{x: 4, y: 10}]}
        const currentPoints = {x: 10, y: 40}
        const endState = currentStroke(startState, updateStroke(currentPoints))

        // expect(endState.points.length).toBe(2)
        expect(endState.points[1]).toEqual(currentPoints)
    })
    test('makes points empty on stroke end', () => {
        startState = {color: "#000", points: [{x: 4, y: 10}, {x: 10, y: 40}]}
        const lastStroke = {color: "#fff", points: [{x: 1, y: 1}]}
        const endState = currentStroke(startState, endStroke({
            stroke: lastStroke,
            historyIndex: 3
        }))

        expect(endState.points).toEqual([])
    })
})
