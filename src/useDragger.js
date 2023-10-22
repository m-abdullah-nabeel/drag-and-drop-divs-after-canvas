import React, {useEffect, useRef, useState} from "react"

const useDragger = () => {
    const isClicked = useRef(false)
    const coords = useRef({startX: 0, startY: 0, lastX: 0, lastY: 0})

   
    useEffect(()=>{
        if (!containerRef.current || !boxRef.current) return;

        const box = boxRef.current;
        const container = containerRef.current;

        const onMouseDown = (e) => {
            console.log("onMouseDown")
            isClicked.current = true
            coords.current.startX = e.clientX
            coords.current.startY = e.clientY
        }
        const onMouseUp = (e) => {
            console.log("onMouseUp")
            isClicked.current = false
            coords.current.lastX = box.offsetLeft
            coords.current.lastY = box.offsetTop
        }
        const onMouseMove = (e) => {
            if (!isClicked.current) return

            console.log("onMouseMove")
            console.log(e.clientX, e.clientY)

            const nextX = e.clientX - coords.current.startX + coords.current.lastX
            const nextY = e.clientY - coords.current.startY + coords.current.lastY
            
            // box.style.top = `${e.clientY}px`
            // box.style.left = `${e.clientX}px`
            
            box.style.top = `${nextY}px`
            box.style.left = `${nextX}px`

        }        

        box.addEventListener('mousedown', onMouseDown)
        box.addEventListener('mouseup', onMouseUp)
        container.addEventListener('mousemove', onMouseMove)
        container.addEventListener('mouseleave', onMouseUp)

        const cleanup = () => {
            box.removeEventListener('mousedown', onMouseDown)
            box.removeEventListener('mouseup', onMouseUp)
            container.removeEventListener('mousemove', onMouseMove)
            container.removeEventListener('mouseleave', onMouseUp)
        }

        return cleanup;

    }, [])



}


export default useDragger