import './App.css';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {currentStrokeSelector} from './selectors';
import {beginStroke, endStroke, updateStroke} from './actions';

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const currentStroke = useSelector(currentStrokeSelector)
    const dispatch = useDispatch()
    const isDrawing = !!currentStroke.points.length

    const startDrawing = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
        const {offsetX, offsetY} = nativeEvent
        dispatch(beginStroke(offsetX, offsetY))
    }

    const endDrawing = () => {
        if (isDrawing) {
            dispatch(endStroke())
        }
    }
    const draw = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) {
            return
        }
        const {offsetX, offsetY} = nativeEvent
        dispatch(updateStroke(offsetX, offsetY))
    }
    return (
        <canvas
            onMouseDown={startDrawing}
            onMouseUp={endDrawing}
            onMouseOut={endDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
    )
}

export default App;
