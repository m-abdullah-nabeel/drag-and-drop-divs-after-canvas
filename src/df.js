import { Container, Box, Button, TextField } from "@mui/material"
import { useState, useRef, useEffect } from "react"
import DrawCx from "./sd"


const Dragdiv = () => {
    const containerRef = useRef(null)
    const boxRef = useRef(null)

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
    


    return (
        <main>
            <div ref={containerRef} className="container" style={{height: '80vh', width: '90vw', margin: 'auto', backgroundColor: 'gray', position: 'relative', overflow: 'hidden'}}>
                <div ref={boxRef} className="box" style={{height: '50px', width: '50px', border: '1px solid black', position: 'absolute', cursor: 'pointer'}}></div>
            </div>
        </main>
    )
}




// const Dragdiv = () => {
//     return (
//         <Container sx={{
//             my: 2, p:2,
//             border: '1px solid gray'
//         }}>
//             <SlabContainer/>
//             <RectCreator/>
//             <DrawCx/>
//         </Container>
//     )
// }


const RectCreator = () => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    return (
        <Box sx={{
            width: '50vw',
            border: '2px solid black',
            display: 'flex',
            flexDirection: "column",
            p: 5, 
        }}>
            <TextField id="box-width" label="Box Width" variant="standard" onChange={(e)=>setWidth(e.target.value)}/>
            <TextField id="box-height" label="Box Height" variant="standard" onChange={(e)=>setHeight(e.target.value)}/>
            <Button onClick={()=>{alert(`Div data recieved, ${width}, ${height}`)}}
             variant="outlined">Outlined</Button>
        </Box>

    )
}

const Slab = (props) => {
    console.log(props.w)
    console.log(props.h)
    console.log(props.k)

    return (
        <div 
            style={{
                width: `${props.w}px`, height: `${props.h}px`, 
                backgroundColor: 'pink', border: '2px solid black'
            }}>
                Drag Me
            </div>  
    )
}

const SlabContainer = () => {
    return (
        <Box id='mui-rect-container' sx={{border: '1px solid gray'}}>
            <div style={{width: '100%'}}>
                <Slab w='100' h='100' k='red'/>
                <Slab w='100' h='100' k='red'/>
                <Slab w='100' h='100' k='red'/>
                <Slab w='100' h='100' k='red'/>
            </div>            
        </Box>
    )
}
export default Dragdiv
