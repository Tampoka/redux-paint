import {useDispatch, useSelector} from 'react-redux';
import {hide} from './modules/modals/slice';
import {memo, useEffect} from 'react';
import {Project} from './utils/types';
import {projectsListSelector} from './modules/projectsList/selectors';
import {loadProject} from './modules/strokes/loadProject';
import {setStrokes} from './modules/strokes/slice';
import {fetchProjectsList} from './modules/projectsList/fetchProjectsList';
import {deleteProject, } from './modules/projectsList/slice';

export const ProjectsModal = memo(function () {
    const dispatch = useDispatch()
    const projectsList = useSelector(projectsListSelector)

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProjectsList())
    }, [])

    const onLoadProject = (projectId: string) => {
        const projectToLoad = projectsList.projects.find(project => project._id === projectId)
        if (projectToLoad) {
            const {strokes} = projectToLoad
            dispatch(setStrokes(strokes))
        }
        // @ts-ignore
        dispatch(loadProject(projectId))
        dispatch(hide())
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProjectsList())
    }, [])

    const handleDeleteProject = (id: string) => {
        dispatch(deleteProject(id))
    }

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
                        <div key={project._id}
                             onClick={() => onLoadProject(project._id)}
                             className="project-card"
                        >
                            <img src={project.image} alt="thumbnail"/>
                            <div className="title">{project.name}</div>
                            <button
                                aria-label="Close"
                                className="deleteButton"
                                onClick={() => handleDeleteProject(project._id)}
                            >
                                Delete
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
})

