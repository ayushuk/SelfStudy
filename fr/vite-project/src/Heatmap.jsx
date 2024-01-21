import React from 'react';
import { Card } from '@mui/material';

export function Heatmap({ results }) {
    const getColor = (heat) => {
        return heat >= 10 ? "rgba(255,0,0)"
            : heat >= 5 ? "rgba(255,120,25)"
                : "rgb(255,255,50)"
    };
    const getBgColor = (heat) => {
        return heat >= 10 ? "rgba(255,0,0,0.1)"
            : heat >= 5 ? "rgba(255,120,25,0.15)"
                : "rgb(255,255,50,0.2)"
    };

    return (
        <>
            <div
                style={{
                    fontSize: "26px"
                }}
            >
                See Your Results
            </div>

            {!results && <div>Please upload course material and click generate to view results</div>}

            {results?.map(d => (
                <Card
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "30px"
                    }}
                >
                    <div style={{
                        width: "25%"
                    }}>
                        <div style={{
                            fontSize: "22px",
                            marginBottom: "10px"
                        }}>
                            Question
                        </div>

                        {d.question}
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        alignItems: "start",
                        width: "75%",
                    }}>
                        <div style={{
                            fontSize: "22px",
                            marginBottom: "10px"
                        }}>
                            Results
                        </div>

                        {d.results.map(r => (
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
                                        border: "2px solid " + getColor(r.heat),
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
                                        - {r.source}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            ))}
        </>
    )
}
