import {useDispatch, useSelector} from 'react-redux';
import {hide} from './modules/modals/slice';
import {memo, useEffect} from 'react';
import {Project} from './utils/types';
import {projectsSelector} from './modules/projectsList/selectors';
import {fetchProjectsList} from './modules/projectsList/fetchProjectsList';
import {removeProject} from './modules/projectsList/removeProject';

export const ProjectsModal = memo(function () {
    const dispatch = useDispatch()
    const projectsList = useSelector(projectsSelector)

/*    const onLoadProject = (projectId: string) => {
        const projectToLoad = projectsList.projects.find(project => project._id === projectId)
        if (projectToLoad) {
            const {strokes} = projectToLoad
            dispatch(setStrokes(strokes))
        }
        // @ts-ignore
        dispatch(loadProject(projectId))
        dispatch(hide())
    }*/

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProjectsList())
        console.log("useeffect from projectModal")
    }, [dispatch])

    const handleDeleteProject = (id: string) => {
        // @ts-ignore
        dispatch(removeProject(id))
    }

    console.log("rendering projectModal")

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
                {(projectsList || []).map((project: Project) => {
                    return (
                        <div key={project._id}
                             // onClick={() => onLoadProject(project._id)}
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

