import { useEffect, useRef, useState } from "react"

const DrawCx = () => {

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const [isDrawing, setIsDrawing] = useState(false)
    const [active, setActive] = useState(false)
    const changeMode = () => {
        setIsDrawing(!isDrawing)
    }

    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width =  window.innerWidth * 2 
        canvas.height = window.innerHeight * 2

        canvas.style.width =  `${window.innerWidth - 100}px`
        canvas.style.height = `${window.innerHeight -100 }px`
        canvas.style.border = '2px solid black'

        const context = canvas.getContext('2d')
        context.scale(2, 2)
        context.linCap = 'round'
        context.strokeStyle = "orange"
        context.lineWidth = 5
        contextRef.current = context
    }, [])

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setActive(true)
    }
    const stopDrawing = ({nativeEvent}) => {
        contextRef.current.closePath()
        setActive(false)
    }
    const draw = ({nativeEvent}) => {
        if (active && isDrawing) {
            const {offsetX, offsetY} = nativeEvent;
            contextRef.current.lineTo(offsetX, offsetY)
            contextRef.current.stroke()
        } 
        if (active && !isDrawing) {
            const {offsetX, offsetY} = nativeEvent;
            contextRef.current.rect(offsetX, offsetY, 100, 80)
            // contextRef.current.fill()
            contextRef.current.stroke()

        }
    }
    return (
        <div>
            <button onClick={changeMode}>Switch mode to {isDrawing?"Rectangles": "Drawing"}</button>
            <p>You are in {isDrawing?"Drawing": "Rectangle"} Mode</p>
            <canvas style={{position: 'absolute', left: 50, bottom: 10}}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </div>
    )
}

export default DrawCx