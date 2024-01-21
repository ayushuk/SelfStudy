import { Button, Card } from '@mui/material';
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

    const ls = [
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
                    heat: 1,
                }
            ]
        }
    ]

    const getColor = (heat: number) => {
        return heat >= 10 ? "red"
            : heat >= 6 ? "orange"
                : heat >= 3 ? "yellow"
                    : "black"
    };

    return (
        <>
            <div
                style={{
                    fontSize: "30px"
                }}
            >
                Your Results
            </div>

            {ls.map(d => (
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
                                    width: "100%"
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
