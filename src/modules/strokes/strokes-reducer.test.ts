import {setStrokes, strokes} from './slice';
import {RootState} from '../../utils/types';
import {endStroke} from './actions';

let startState: RootState["strokes"] = []

describe("strokes reducer", () => {
    test('sets strokes for loading project', () => {
        const strokesToLoad = [
            {
                "color": "#000",
                "points": [
                    {
                        "x": 226,
                        "y": 236
                    },
                    {
                        "x": 226,
                        "y": 235
                    }
                ]
            },
            {
                "color": "#000",
                "points": [
                    {
                        "x": 100,
                        "y": 100
                    },
                    {
                        "x": 100,
                        "y": 100
                    }
                ]
            }
        ]
        const endState = strokes(startState, setStrokes(strokesToLoad))

        expect(endState.length).toBe(2)
        expect(endState).toEqual(strokesToLoad)
    })
    describe("for stroke ending", () => {
        test('if historyIndex=0, adds ended stroke to the end', () => {
            const startState = [
                {
                    "color": "#000",
                    "points": [
                        {
                            "x": 226,
                            "y": 236
                        },
                        {
                            "x": 226,
                            "y": 235
                        }
                    ]
                },
                {
                    "color": "#000",
                    "points": [
                        {
                            "x": 100,
                            "y": 100
                        },
                        {
                            "x": 100,
                            "y": 100
                        }
                    ]
                }
            ]

            const lastStroke = {
                    "color": "#000",
                    "points": [
                        {
                            "x": 300,
                            "y": 236
                        },
                        {
                            "x": 300,
                            "y": 235
                        }
                    ]
                }
            const endState = strokes(startState, endStroke({historyIndex: 0, stroke:lastStroke}))

            expect(endState.length).toBe(3)
            expect(endState[2]).toEqual(lastStroke)
        })
        test('if historyIndex>0, adds ended stroke instead of "redone" strokes', () => {
            const startState = [
                {
                    "color": "#000",
                    "points": [
                        {
                            "x": 226,
                            "y": 236
                        },
                        {
                            "x": 226,
                            "y": 235
                        }
                    ]
                },
                {
                    "color": "#000",
                    "points": [
                        {
                            "x": 100,
                            "y": 100
                        },
                        {
                            "x": 100,
                            "y": 100
                        }
                    ]
                }
            ]
            const lastStroke = {
                "color": "#000",
                "points": [
                    {
                        "x": 300,
                        "y": 236
                    },
                    {
                        "x": 300,
                        "y": 235
                    }
                ]
            }
            const endState = strokes(startState, endStroke({historyIndex: 2, stroke:lastStroke}))

            expect(endState.length).toBe(1)
            expect(endState[0]).toEqual(lastStroke)
        })
    })

})
