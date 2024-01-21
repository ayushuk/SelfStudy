import React, { useEffect, useState } from 'react';
import './App.css';
import { Heatmap } from './Heatmap';
import Upload from "./Upload";

function App() {
  const [results, setResults] = useState();

  useEffect(() => {
    setResults(
      {
        annotated_textbook: "https://google.com",
        list: [
              {
                text: "this is text.",
                source: 10,
                heat: 0.8,
              },
              {
                text: "this is text.",
                source: 11,
                heat: 0.9,
              },
              {
                text: "this is text.",
                source: 101,
                heat: 1,
              },
              {
                text: "this is text.",
                source: 130,
                heat: 6,
              }
        ]
      }
    )
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