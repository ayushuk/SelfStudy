import React, { useEffect, useState } from 'react';
import './App.css';
import { Heatmap } from './Heatmap';
import Upload from "./Upload";

function App() {
  const [results, setResults] = useState();

  useEffect(() => {
    setResults([
      {
        question: "this is question",
        results: [
          {
            text: "this is text.",
            source: "page 10",
            heat: 10,
          },
          {
            text: "this is text.",
            source: "page 10",
            heat: 1,
          }
        ]
      },
      {
        question: "this is question",
        results: [
          {
            text: "this is text.",
            source: "page 10",
            heat: 10,
          },
          {
            text: "this is text.",
            source: "page 10",
            heat: 6,
          }
        ]
      }
    ])
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "20px"
      }}
    >
      <div style={{
        textAlign: "center",
        fontSize: "36px",
        fontWeight: "600",
        color: "#1976d2"
      }}>
        StudyBuddy.AI
      </div>
      <Upload setResults={setResults} />
      <Heatmap results={results} />
    </div>
  );
}

export default App