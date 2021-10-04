import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Axios from "axios";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import AlertSolution from "./AlertSolution";

const Task = () => {
    const {id, taskId} = useParams();
    const [task, setTask] = useState({});
    const [solution, setSolution] = useState("");
    const [enter, setEnter] = useState(false);
    const [correct, setCorrect] = useState(false);

    useEffect(() => {
        Axios.get(`/api/tasks/${taskId}`).then(response => {
            setTask(response.data);
        })
    }, []);

    function checkSolution() {
        setEnter(true);
        let array = task.solutions.split(' ');
        for (let i = 0; i < array.length; i++) {
            if (array[i].toLowerCase() === solution.toLowerCase().trim()) {
                setCorrect(true);
                return;
            }
        }
        setCorrect(false);
    }

    return (
        <div>
            <div className="container py-4">
                <header className="pb-3 mb-4 border-bottom">
                    <span className="fs-4 fw-bold">{task.name}</span>
                </header>

                <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <h3 className="display-5">{task.topic}</h3>
                        <p className="col-md-12 fs-4">Some say thy fault is youth, some wantonness; Some say thy grace
                            is youth and gentle sport; Both grace and faults are lov'd of more and less: Thou mak'st
                            faults graces that to thee resort. As on the finger of a throned queen The basest jewel will
                            be well esteem'd, So are those errors that in thee are seen To truths translated, and for
                            true things deem'd.
                            How many lambs might the stern wolf betray, If like a lamb he could his looks translate!</p>
                        {enter === true ? <AlertSolution class={correct}/> : ""}
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Enter solution"
                                aria-describedby="basic-addon2"
                                onChange={(e) => {
                                    setSolution(e.target.value)
                                }}
                            />
                            <Button variant="success" onClick={() => checkSolution()}>
                                Check solution
                            </Button>
                        </InputGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;