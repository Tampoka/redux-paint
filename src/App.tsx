import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearCanvas, drawStroke, setCanvasSize} from './utils/canvasUtils';
import {strokesSelector} from './modules/strokes/selectors';
import {currentStrokeSelector} from './modules/currentStroke/selectors';
import {historyIndexSelector} from './modules/historyIndex/selectors';
import {useCanvas} from './CanvasContext';
import {FilePanel} from './shared/FilePanel';
import {endStroke} from './modules/sharedActions';
import {ColorPanel} from './shared/ColorPanel';
import {EditPanel} from './shared/EditPanel';
import {beginStroke, updateStroke} from './modules/currentStroke/slice';
import {ModalLayer} from './ModalLayer';
import {fetchProjectsList} from './modules/projectsList/fetchProjectsList';

const WIDTH = 1024
const HEIGHT = 768

function App() {
    const dispatch = useDispatch()
    const canvasRef = useCanvas()
    const historyIndex = useSelector(historyIndexSelector)
    const strokes = useSelector(strokesSelector)
    const currentStroke = useSelector(currentStrokeSelector)
    const isDrawing = !!currentStroke.points.length

    const getCanvasWithContext = (canvas = canvasRef.current) => {
        return {canvas, context: canvas?.getContext("2d")}
    }

    const startDrawing = ({
                              nativeEvent
                          }: React.MouseEvent<HTMLCanvasElement>) => {
        const {offsetX, offsetY} = nativeEvent
        dispatch(beginStroke({x: offsetX, y: offsetY}))
    }

    useEffect(() => {
        const {context} = getCanvasWithContext()
        if (!context) {
            return
        }
        requestAnimationFrame(() =>
            drawStroke(context, currentStroke.points, currentStroke.color)
        )
    }, [currentStroke])

    useEffect(() => {
        const {canvas, context} = getCanvasWithContext()
        if (!context || !canvas) {
            return
        }
        requestAnimationFrame(() => {
            clearCanvas(canvas)

            strokes
                .slice(0, strokes.length - historyIndex)
                .forEach((stroke) => {
                    drawStroke(context, stroke.points, stroke.color)
                })
        })
    }, [historyIndex, strokes])

    const endDrawing = () => {
        if (isDrawing) {
            dispatch(endStroke({stroke: currentStroke, historyIndex}))
        }
    }

    const draw = ({
                      nativeEvent
                  }: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) {
            return
        }
        const {offsetX, offsetY} = nativeEvent

        dispatch(updateStroke({x: offsetX, y: offsetY}))
    }

    useEffect(() => {
        const {canvas, context} = getCanvasWithContext()
        if (!canvas || !context) {
            return
        }

        setCanvasSize(canvas, WIDTH, HEIGHT)

        context.lineJoin = "round"
        context.lineCap = "round"
        context.lineWidth = 5
        context.strokeStyle = "black"

        clearCanvas(canvas)
    }, [])


    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProjectsList())
    }, [dispatch])

    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">Redux Paint</div>
                <div className="title-bar-controls">
                    <button
                        aria-label="Close"
                    />
                </div>
            </div>
            <ColorPanel/>
            <EditPanel/>
            <FilePanel/>
            <ModalLayer/>
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

export default App
