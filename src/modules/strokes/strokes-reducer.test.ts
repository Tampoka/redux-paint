import {setStrokes, strokes} from './slice';
import {RootState} from '../../utils/types';
import {endStroke} from './actions';

let startState: RootState["strokes"] = []

describe("strokes reducer", () => {
    test('sets strokes for loading project', () => {
        let startState: RootState["strokes"] = []
        // const endState = strokes(startState, setStrokes(strokeColor))
        //
        // expect(endState.color).toBe(strokeColor)
    })


})
