import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";

// FIXME: If there is enough time, display decoded message as dialog 
export default function DisplayDecodedMessage({ info, handleClose, open }) {

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const url = 'https://school-encryption-api.herokuapp.com/api/v1/'
    const [ decoded, setDecoded ] = useState("")

    async function getDecoded() {
        const { data:response } = await axios.post(url + "decode", {
            content: info.content,
            flag: info.flag
        })

        console.log("LOL" + response.content)
        return response.content
    }
    
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Message from: {info.from} to: {info.to}</DialogTitle>
                <DialogContent>
                    <p>Content: {getDecoded()}</p>
                </DialogContent>
            </Dialog>
        </div>
    )
}