import React, { useState } from 'react';
import './App.css';
import { Grid, Button, Box, InputProps } from '@mui/material';
import { Heatmap } from './Heatmap';

function App() {

  const [studyFile, setStudyFile] = useState<File | undefined>(undefined);
  const [examFile, setExamFile] = useState<File | undefined>(undefined);

  // file upload function
  function studyFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setStudyFile(selectedFile);
    }
  }

  function testFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setExamFile(selectedFile);
    }
  }

  function readFile(file: File) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (evt: ProgressEvent<FileReader>) => {
        try {
          res(evt.target!.result)
        } catch (e) {
          rej(e)
        }
      };
      const text = reader.readAsText(file);
    })
  }

  // process files function
  async function processFiles() {
    if (!studyFile) {
      console.error('no study file');
      return;
    }
    if (!examFile) {
      console.error('no test file');
      return;
    }

    const studyTxt = await readFile(studyFile);
    const examTxt = await readFile(examFile);
  }

  return (
    <div>
      <Grid container className='grid' spacing={2}>
        <Grid item xs={4}>
          <Box className='gridBox'>
            <Box className='uploadBox'><input type='file' onChange={studyFileUpload}></input></Box>
            <Box className='uploadButtonBox'>
              <Button variant="contained" >Upload Study Materials</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className='gridBox'>
            <Box className='uploadBox'><input type='file' onChange={testFileUpload}></input></Box>
            <Box className='uploadButtonBox'>
              <Button variant="contained">Upload Practice Exam</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className='gridBox'>
            <Box className='uploadBox'><input type='file'></input></Box>
            <Box className='uploadButtonBox'>
              <Button variant="contained" onClick={processFiles}>Download result</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Heatmap inputFile={studyFile} />
    </div>
  );
}

export default App;
