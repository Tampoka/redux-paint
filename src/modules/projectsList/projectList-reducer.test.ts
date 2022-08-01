import {v1} from "uuid";
import {projectsList, ProjectsListState} from './slice';
import {removeProject} from './removeProject';

let projectId1: string
let projectId2: string
let projectId3: string

let startState: ProjectsListState = {
    error: null,
    pending: false,
    projects: []
}

beforeEach(() => {
    projectId1 = v1()
    projectId2 = v1()
    projectId3 = v1()
    startState = {
        error: null,
        pending: false,
        projects:
            [{
                "_id": projectId1,
                "image": "data:image/png;base64,iVBORw0",
                "name": "Boy",
                "strokes": [{
                    "points": [{
                        "x": 278,
                        "y": 258,
                    }, {"x": 279, "y": 258}, {
                        "x": 280,
                        "y": 259,
                    }, {"x": 283, "y": 267}, {
                        "x": 287,
                        "y": 277,
                    }, {"x": 290, "y": 287}, {
                        "x": 294,
                        "y": 298
                    }],
                    "color": "#000"
                }
                ]
            },
                {
                    "_id":
                    projectId2,
                    "image":
                        "data:image/png;base64,iVBORw0",
                    "name":
                        "Girl",
                    "strokes":
                        [{
                            "points": [{
                                "x": 278,
                                "y": 258,
                            }, {"x": 279, "y": 258}, {
                                "x": 280,
                                "y": 259,
                            }, {"x": 283, "y": 267}, {
                                "x": 287,
                                "y": 277,
                            }, {"x": 290, "y": 287}, {
                                "x": 294,
                                "y": 298,
                            }],
                            "color": "#000"
                        }
                        ]
                }
                ,
                {
                    "_id":
                    projectId3,
                    "image":
                        "data:image/png;base64,iVBORw0",
                    "name":
                        "House",
                    "strokes":
                        [{
                            "points": [{
                                "x": 278,
                                "y": 258,
                            }, {"x": 279, "y": 258}, {
                                "x": 280,
                                "y": 259,
                            }, {"x": 283, "y": 267}, {
                                "x": 287,
                                "y": 277,
                            }, {"x": 290, "y": 287}, {
                                "x": 294,
                                "y": 298,
                            }],
                            "color": "#000"
                        }
                        ]
                }
            ]
    }
})
    test('correct project should be removed', () => {
        let payload = {id: projectId2};
        const endState = projectsList(startState, removeProject.fulfilled(payload, 'requestId', payload))

        expect(endState.projects.length).toBe(2)
        expect(endState.projects[1]._id).toBe(projectId3)
    })
