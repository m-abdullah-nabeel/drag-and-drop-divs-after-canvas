import { Container, Box, Button, TextField } from "@mui/material"
import { useState, useRef, useEffect } from "react"
import DrawCx from "./sd"
import useDragger from "./useDragger"
import TestRect from "./rect_t"
import TestRectS from "./rect_s"

const Dragdiv = () => {

    useDragger("pinkBox")

    return (
        <main>
            <div className="container" style={{height: '80vh', width: '90vw', margin: 'auto', backgroundColor: 'gray', position: 'relative', overflow: 'hidden'}}>
                <div id="pinkBox" className="box" style={{height: '50px', width: '50px', border: '1px solid black', position: 'absolute', cursor: 'pointer'}}></div>
                <TestRect/>
                <TestRectS/>
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
