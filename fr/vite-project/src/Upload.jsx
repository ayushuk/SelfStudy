import { Button } from '@mui/material';
import React, {useCallback, useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from "axios";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  borderRadius: "10px"
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const API = "http://localhost:3000";

function Upload({ setResults }) {
  const [ tbFile, setTbFile ] = useState();
  const [ sgFile, setSgFile ] = useState();

  const submit = async () => {
    try {
      console.log({tbFile, sgFile})
      const formData = new FormData();
      formData.append("textbook", tbFile, tbFile.name);
      formData.append("study_guide", sgFile, sgFile.name);
      const res = await axios.post(API + "/upload", formData);
      const d = res.data;
      console.log({d});
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div
        style={{
          fontSize: "26px"
        }}
      >
        Upload Course Material
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: "20px",
        fontSize: "18px"
      }}>
        <Dropzone
          title={"Upload Textbook"}
          setFile={setTbFile}
          file={tbFile}
        />

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          style={{ width: 20, height: 20 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        <Dropzone
          title={"Upload Study Guide"}
          setFile={setSgFile}
          file={sgFile}
        />

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          style={{ width: 20, height: 20 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>

        <Button
          variant="outlined"
          size="large"
          onClick={submit}
        >
          Generate Results
        </Button>
      </div>
    </>
  );
}

function Dropzone({
  title,
  file,
  setFile
}) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      setFile(file)
    })
  }, [])

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>{file ? file.name : title}</p>
      </div>
    </div>
  );
}

// function Dropzone() {
//   const [studyFile, setStudyFile] = useState();
//   const [examFile, setExamFile] = useState();

//   // file upload function
//   function studyFileUpload(event) {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       setStudyFile(selectedFile);
//     }
//   }

//   function testFileUpload(event) {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       setExamFile(selectedFile);
//     }
//   }

//   function readFile(file) {
//     return new Promise((res, rej) => {
//       const reader = new FileReader();
//       reader.onload = (evt) => {
//         try {
//           res(evt.target.result)
//         } catch (e) {
//           rej(e)
//         }
//       };
//       reader.readAsText(file);
//     })
//   }

//   // process files function
//   async function processFiles() {
//     if (!studyFile) {
//       console.error('no study file');
//       return;
//     }
//     if (!examFile) {
//       console.error('no test file');
//       return;
//     }

//     const studyTxt = await readFile(studyFile);
//     const examTxt = await readFile(examFile);
//     console.log({
//       studyTxt,
//       examTxt
//     })
//   }

  
//   const { getRootProps, getInputProps } = useDropzone({});
//   return (
//     <div {...getRootProps({ className: "dropzone" })}>
//       <input className="input-zone" {...getInputProps()} />
//       <div className="text-center">
//         <p className="dropzone-content">
//           Drag'n'drop some files here, or click to select files
//         </p>
//       </div>
//     </div>
//   );
// }

export default Upload;