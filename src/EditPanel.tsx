
export  const EditPanel = () => {
    return (
        <div className="window edit">
            <div className="title-bar">
                <div className="title-bar-text">Edit</div>
            </div>
            <div className="window-body">
                <div className="field-row">
                    <button
                        className="button redo"
                    >
                        Undo
                    </button>
                    <button
                        className="button undo"
                    >
                        Redo
                    </button>
                </div>
            </div>
        </div>
    );
};

