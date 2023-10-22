import { Container, Box, Button, TextField } from "@mui/material"
import { useState, useRef, useEffect } from "react"
import useDragger from "./useDragger"


const TestRect = () => {

    useDragger("TestRect")

    return <div id="TestRect" className="box" style={{height: '30px', width: '90px', backgroundColor: 'pink', border: '1px solid black', position: 'absolute', cursor: 'pointer'}}></div>
}

export default TestRect;