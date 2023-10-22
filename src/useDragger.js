import React, {useEffect, useRef, useState} from "react"

const useDragger = (id) => {
    const isClicked = useRef(false)
    const coords = useRef({startX: 0, startY: 0, lastX: 0, lastY: 0})

   
    useEffect(()=>{
        
        
        const target = document.getElementById(id)
        if (!target) throw new Error("Element with given id doesn't exist")

        const container = target.parentElement
        if (!container) throw new Error("target must have a parent")

        
        const onMouseDown = (e) => {
            console.log("onMouseDown")
            isClicked.current = true
            coords.current.startX = e.clientX
            coords.current.startY = e.clientY
        }
        const onMouseUp = (e) => {
            console.log("onMouseUp")
            isClicked.current = false
            coords.current.lastX = target.offsetLeft
            coords.current.lastY = target.offsetTop
        }
        const onMouseMove = (e) => {
            if (!isClicked.current) return

            console.log("onMouseMove")
            console.log(e.clientX, e.clientY)

            const nextX = e.clientX - coords.current.startX + coords.current.lastX
            const nextY = e.clientY - coords.current.startY + coords.current.lastY
            
            // target.style.top = `${e.clientY}px`
            // target.style.left = `${e.clientX}px`
            
            target.style.top = `${nextY}px`
            target.style.left = `${nextX}px`

        }        

        target.addEventListener('mousedown', onMouseDown)
        target.addEventListener('mouseup', onMouseUp)
        container.addEventListener('mousemove', onMouseMove)
        container.addEventListener('mouseleave', onMouseUp)

        const cleanup = () => {
            target.removeEventListener('mousedown', onMouseDown)
            target.removeEventListener('mouseup', onMouseUp)
            container.removeEventListener('mousemove', onMouseMove)
            container.removeEventListener('mouseleave', onMouseUp)
        }

        return cleanup;

    }, [])



}


export default useDragger