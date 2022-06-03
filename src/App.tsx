import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {currentStrokeSelector} from './selectors';
import {beginStroke, endStroke, updateStroke} from './actions';
import {drawStroke} from './canvasUtils';
import {ColorPanel} from './ColorPanel';
import './index.css';

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const getCanvasWithContext = (canvas = canvasRef.current) => {
        return {canvas, context: canvas?.getContext("2d")}
    }

    const currentStroke = useSelector(currentStrokeSelector)
    const dispatch = useDispatch()
    const isDrawing = !!currentStroke.points.length

    const startDrawing = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
        const {offsetX, offsetY} = nativeEvent
        dispatch(beginStroke(offsetX, offsetY))
    }

    useEffect(() => {
        const {context} = getCanvasWithContext()
        if (!context) {
            return
        }
        requestAnimationFrame(() => {
            drawStroke(context, currentStroke.points, currentStroke.color)
        })
    }, [currentStroke])

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
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">Redux Paint</div>
                <div className="title-bar-controls">
                    <button aria-label="Close"/>
                </div>
            </div>
            <ColorPanel/>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseOut={endDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </div>
    )
}

export default App;
