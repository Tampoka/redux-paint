import {hide} from './modules/modals/slice';
import {useDispatch} from 'react-redux';
import {ChangeEvent, useEffect, useState} from 'react';
import {useCanvas} from './CanvasContext';
import {getCanvasImage} from './utils/canvasUtils';
import {getBase64Thumbnail} from './utils/scaler';
import {Project} from './utils/types';
import {v1} from 'uuid';
import {addProject, getProjectsList} from './modules/projectsList/slice';

export const ProjectSaveModal = () => {
    const [projectName, setProjectName] = useState("")
    const dispatch = useDispatch()
    const canvasRef = useCanvas()

    const onProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value)
    }

    const onProjectSave = async () => {
        const file = await getCanvasImage(canvasRef.current)
        if (!file) {
            return
        }
        const thumbnail = await getBase64Thumbnail({file, scale: 0.1})
        const newProject = {
            name: projectName,
            image: thumbnail,
            id: v1()
        }
        dispatch(addProject(newProject))
        const projectsAsString = localStorage.getItem("drawings")
        if (projectsAsString) {
            const projects = JSON.parse(projectsAsString)
            const updatedProjects = [...projects, newProject]
            localStorage.setItem("drawings", JSON.stringify(updatedProjects))
        }
        setProjectName("")
        dispatch(hide())
    }

    useEffect(() => {
        const projectsAsString = localStorage.getItem("drawings")
        if (projectsAsString) {
            const projects = JSON.parse(projectsAsString)
            dispatch(getProjectsList(projects))
        }

    }, [])
    return (
        <div className="window modal-panel">
            <div className="title-bar">
                <div className="title-bar-text">Save</div>
            </div>
            <div className="window-body">
                <div className="field-row-stacked">
                    <label htmlFor="projectName">Project name</label>
                    <input
                        id="projectName"
                        onChange={onProjectNameChange}
                        type="text"
                    />
                </div>
                <div className="field-row">
                    <button onClick={onProjectSave}>Save</button>
                    <button onClick={() => dispatch(hide())}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

