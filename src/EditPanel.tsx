import {useDispatch, useSelector} from 'react-redux';
import {strokesLengthSelector} from './modules/strokes/selectors';
import {historyIndexSelector} from './modules/historyIndex/selectors';
import {RootState} from './utils/types';
import {redo, undo} from './modules/historyIndex/slice';

export const EditPanel = () => {
    const dispatch = useDispatch()
    const undoLimit = useSelector(strokesLengthSelector)
    const historyIndex = useSelector<RootState, RootState["historyIndex"]>(historyIndexSelector)

    const disableUndo = historyIndex >= undoLimit
    const disableRedo = historyIndex===0

    return (
        <div className="window edit">
            <div className="title-bar">
                <div className="title-bar-text">Edit</div>
            </div>
            <div className="window-body">
                <div className="field-row">
                    <button
                        className="button undo"
                        onClick={() => dispatch(undo(undoLimit))}
                        disabled={disableUndo}
                    >
                        Undo
                    </button>
                    <button
                        className="button redo"
                        onClick={() => dispatch(redo())}
                       disabled={disableRedo}
                    >
                        Redo
                    </button>
                </div>
            </div>
        </div>
    );
};

