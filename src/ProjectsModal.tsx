import {useDispatch} from 'react-redux';
import {hide} from './modules/modals/slice';
import {useEffect} from 'react';
import {Project} from './utils/types';
import {getProjectsList} from './modules/projectsList/getProjectsList';
import {loadProject} from './modules/strokes/loadProject';

export const ProjectsModal = () => {
    const dispatch = useDispatch()
    const projectsList: any = []

    const onLoadProject = (projectId: string) => {
        // @ts-ignore
        dispatch(loadProject(projectId))
        dispatch(hide())
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(getProjectsList())
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
                            <div>{project.name}</div>

                            Using Redux and TypeScript 406

                        </div>
                    )
                })}
            </div>
        </div>
    );
};

