import './App.css';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {currentStrokeSelector} from './selectors';
import {beginStroke} from './actions';

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const currentStroke = useSelector(currentStrokeSelector)
    const dispatch = useDispatch()

    const startDrawing = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
        const {offsetX, offsetY} = nativeEvent
        dispatch(beginStroke(offsetX, offsetY))
    }

    const endDrawing = () => {
    }
    const draw = () => {
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
