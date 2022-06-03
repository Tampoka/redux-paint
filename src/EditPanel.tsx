import {useDispatch} from 'react-redux';

export  const EditPanel = () => {
    const dispatch=useDispatch()
    return (
        <div className="window edit">
            <div className="title-bar">
                <div className="title-bar-text">Edit</div>
            </div>
            <div className="window-body">
                <div className="field-row">
                    <button
                        className="button redo"
                        onClick={()=>dispatch(redo())}
                    >
                        Undo
                    </button>
                    <button
                        className="button undo"
                        onClick={()=>dispatch(undo())}
                    >
                        Redo
                    </button>
                </div>
            </div>
        </div>
    );
};

