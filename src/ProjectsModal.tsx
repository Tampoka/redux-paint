import {useDispatch, useSelector} from 'react-redux';
import {hide} from './modules/modals/slice';
import {memo} from 'react';
import {Project, RootState} from './utils/types';
import {projectsSelector} from './modules/projectsList/selectors';
import {removeProject} from './modules/projectsList/removeProject';
import {loadProject} from './modules/strokes/loadProject';
import {setStrokes} from './modules/strokes/slice';

export const ProjectsModal = memo(function () {
    const dispatch = useDispatch()
    const projectsList = useSelector(projectsSelector)
    const isLoading = useSelector<RootState, boolean>(state => state.projectsList.pending)

    const onLoadProject = (projectId: string) => {
        const projectToLoad = projectsList.find(project => project._id === projectId)
        if (projectToLoad) {
            const {strokes} = projectToLoad
            dispatch(setStrokes(strokes))
        }
        dispatch(hide())
    }

    const handleDeleteProject = (id: string) => {
        // @ts-ignore
        dispatch(removeProject({id}))
    }

    return (
        <div className="window modal-panel">
            ( <div className="title-bar">
            <div className="title-bar-text">Your saved drawings</div>
            <div className="title-bar-controls">
                <button
                    aria-label="Close"
                    onClick={() => dispatch(hide())}
                />
            </div>
        </div>
            <div className="projects-container">
                {isLoading
                    ? <div className="loading-message">Loading your projects....</div>
                    :
                    (projectsList || []).map((project: Project) => {
                        return (
                            <div key={project._id}
                                 className="project-card"
                            >
                                <img src={project.image}
                                     alt="thumbnail"
                                     onClick={() => onLoadProject(project._id)}/>
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

