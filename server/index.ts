
import * as express from "express"
import * as cors from "cors"
import FileSync = require('lowdb/adapters/FileSync');
import * as bodyParser from 'body-parser';
import {nanoid} from 'nanoid';
import lowdb = require('lowdb/lib/main');

let db = lowdb(new FileSync<{ projects: Project[] }>("db.json"))

db.defaults({
    projects: [
        {
            id: nanoid(),
            name: "Test Project",
            image: "http://placekitten.com/100/100"
        }
    ]
}).write()

interface Project {
    id: string
    name: string
    strokes: Stroke[]
    image: string
}

interface Stroke {
    point: Point[]
}

interface Point {
    x: number
    y: number
}

const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = 4000

app.get("/projects", (req, res) => {
    const data = db.get("projects").value()
    const projects = data.map((project: Project) => ({
        name: project.name,
        image: project.image,
        id: project.id
    }))
    return res.json(projects)
})

app.post("/projects/new", (req, res) => {
    db.get("projects")
        .push({...req.body, id: nanoid()})
        .write()
    res.json({success: true})
})

app.get("/projects/:projectId", (req, res) => {
    const {projectId} = req.params
    const project = db.get("projects").find({id: projectId}).value()

    if (project) {
        return res.json({
            success: true,
            project
        })
    } else {
        return res.json({
            success: false
        })
    }
})

app.listen(port, () =>
    console.log(`Backend running on http://localhost:${port}!`)
)