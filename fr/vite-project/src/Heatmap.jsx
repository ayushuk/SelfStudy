import React from 'react';
import { Button, Card } from '@mui/material';

export function Heatmap({ results }) {
    const getColor = (heat) => {
        return heat >= .96 ? "rgba(255,0,0)"
            : heat >= .93 ? "rgba(255,120,25)"
                : "rgb(255,255,50)"
    };
    const getBgColor = (heat) => {
        return heat >= .96 ? "rgba(255,0,0,0.1)"
            : heat >= .93 ? "rgba(255,120,25,0.15)"
                : "rgb(255,255,50,0.2)"
    };

    return (
        <>
            <div
                style={{
                    fontSize: "26px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <div>
                    See Your Results
                </div>
                <Button
                    variant="contained"
                    onClick={() => {
                        window.open(results?.annotated_textbook)
                    }}
                    disabled={!results}
                >
                    Download Annotated Textbook
                </Button>
            </div>

            {!results && <div>Please upload course material and click generate to view results</div>}

            {results?.list.map(r => (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                background: getBgColor(r.heat),
                                borderRadius: "8px"
                            }}
                        >
                            <div
                                style={{
                                    border: "3px solid " + getColor(r.heat),
                                    borderRadius: "2px"
                                }}
                            />

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                alignItems: "start",
                                padding: "10px 20px",
                                width: "100%"
                            }}>
                                <div>
                                    {r.text}
                                </div>
                                
                                <div
                                    style={{
                                        alignSelf: "end"
                                    }}
                                >
                                    Source:{" "}
                                    <a
                                        href={results.annotated_textbook + "#page=" + r.source}
                                        target="_blank"
                                    >
                                        Page {r.source}
                                    </a>
                                </div>
                            </div>
                        </div>
            ))}
        </>
    )
}
