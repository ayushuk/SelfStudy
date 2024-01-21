import React, { useState, ChangeEvent } from 'react';
import './App.css';
import { Grid, Button, Box, InputProps } from '@mui/material';
import { Heatmap } from './Heatmap';
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';

function App() {

  const [studyFile, setStudyFile] = useState<File | undefined>(undefined);
  const [examFile, setExamFile] = useState<File | undefined>(undefined);

  // file upload function
  function studyFileUpload(acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setStudyFile(selectedFile);
    }
  }

  function testFileUpload(acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) {
    const selectedFile = acceptedFiles[0];
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
      reader.readAsText(file);
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
    console.log({
      studyTxt,
      examTxt
    })
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "20px"
      }}
    >
      <Grid container className='grid' spacing={2}>
        <Grid item xs={4}>
          <Box className='gridBox'>
            <div>Upload Study Materials</div>
            <Dropzone onDrop={studyFileUpload} >
              {({ getRootProps, getInputProps }) => (
                <Box className='uploadBox' {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>{studyFile ? 'File Uploaded' : '+'}</p>
                </Box>
              )}
            </Dropzone>
            <Box className='uploadButtonBox'>
              <Button variant="contained" >Upload</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className='gridBox'>
            <div>Upload Exam</div>
            <Dropzone onDrop={testFileUpload}>
              {({ getRootProps, getInputProps }) => (
                <Box className='uploadBox' {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>{examFile ? 'File Uploaded' : '+'}</p>
                </Box>
              )}
            </Dropzone>
            <Box className='uploadButtonBox'>
              <Button variant="contained" >Upload</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Heatmap inputFile={studyFile} />
    </div>
  );
}

export default App;
