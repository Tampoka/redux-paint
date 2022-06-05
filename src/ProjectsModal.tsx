import {useDispatch, useSelector} from 'react-redux';
import {hide} from './modules/modals/slice';
import {useEffect} from 'react';
import {Project} from './utils/types';
import {projectsListSelector} from './modules/projectsList/selectors';
import {deleteProject, getProjectsList} from './modules/projectsList/slice';
import {loadProject} from './modules/strokes/loadProject';

export const ProjectsModal = () => {
    const dispatch = useDispatch()
    const projectsList = useSelector(projectsListSelector)

    const onLoadProject = (projectId: string) => {
        // dispatch(loadProject(projectId))
        // dispatch(hide())
    }

    // useEffect(() => {
    //     // @ts-ignore
    //     dispatch(getProjectsList())
    // }, [])
    const handleDeleteProject = (id: string) => {

        const projectsAsString = localStorage.getItem("drawings")
        if (projectsAsString) {
            const projects: Project[] = JSON.parse(projectsAsString)
            const updatedProjects = projects.filter(project => project.id !== id)
            localStorage.setItem("drawings", JSON.stringify(updatedProjects))
        }
        dispatch(deleteProject(id))
    }
    useEffect(() => {
        const projectsAsString = localStorage.getItem("drawings")
        if (projectsAsString) {
            const projects = JSON.parse(projectsAsString)
            // @ts-ignore
            dispatch(getProjectsList(projects))
        }

    }, [])

    return (
        <div className="window modal-panel">
            <div className="title-bar">
                <div className="title-bar-text">Your saved drawings</div>
                <div className="title-bar-controls">
                    <button
                        aria-label="Close"
                        onClick={() => dispatch(hide())}
                    />
                </div>
            </div>
            <div className="projects-container">
                {(projectsList.projects || []).map((project: Project) => {
                    return (
                        <div
                            key={project.id}
                            onClick={() => onLoadProject(project.id)}
                            className="project-card"
                        >
                            <img src={project.image} alt="thumbnail"/>
                            <div>{project.name}
                            </div>
                            <button
                                aria-label="Close"
                                className="deleteButton"
                                onClick={() => handleDeleteProject(project.id)}
                            >
                                Delete
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

