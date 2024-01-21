import { Button } from '@mui/material';
import React from 'react';

interface Props {
    inputFile: File | undefined;
}

export function Heatmap({ inputFile }: Props) {
    function readFile(file: File | undefined) {
        if (!file) {
            console.error('no file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (evt: ProgressEvent<FileReader>) => {
            console.log(evt.target!.result);
        };
        const text = reader.readAsText(file);
        console.log(text)
    }

    return (
        <div>
            <h1>Heatmap</h1>
            {<Button variant='contained' onClick={() => { readFile(inputFile!) }}>Generate</Button>}
        </div>
    )
}
