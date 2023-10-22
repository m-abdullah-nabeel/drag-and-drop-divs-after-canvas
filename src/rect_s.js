import { Container, Box, Button, TextField } from "@mui/material"
import { useState, useRef, useEffect } from "react"
import useDragger from "./useDragger"


const TestRectS = () => {

    useDragger("TestRectS")

    return (
        <div id="TestRectS" className="box" style={{height: '130px', width: '20px', backgroundColor: 'pink', border: '1px solid black', position: 'absolute', cursor: 'pointer'}}></div>
    )
}

export default TestRectS;