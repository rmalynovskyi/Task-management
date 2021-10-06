import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Axios from 'axios';
import {Button, FormControl, InputGroup} from 'react-bootstrap';
import AlertSolution from './AlertSolution';
import DescriptionMarkdown from './DescriptionMarkdown';

const Task = () => {
    const {id, taskId} = useParams();
    const [task, setTask] = useState({});
    const [solved, setSolved] = useState(false);
    const [solution, setSolution] = useState("");
    const [enter, setEnter] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        Axios.get(`/api/users/${id}`).then(response => {
            setCurrentUser(response.data);
            getUserTask(response.data.tasks);
        })
    }, []);

    function getUserTask(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id.toString() === taskId.toString()) {
                setTask(data[i])
            }
        }
    }

    function checkSolution() {
        setEnter(true);
        let array = task.solutions.split(' ');
        for (let i = 0; i < array.length; i++) {
            if (solution && array[i].toLowerCase() === solution.toLowerCase().trim()) {
                const solvedTask = {taskId: taskId, solution: solution, userId: id}
                Axios.get("/api/completeTasks", {params: {taskId: taskId, userId: id}}).then(response => {
                    if (response.data === null) {
                        Axios.post(`/api/completeTasks`, solvedTask).then()
                        Axios.put(`/api/users/${id}`, {solvedTasks: currentUser.solvedTasks + 1}).then()
                    } else {
                        setSolved(true);
                    }
                })
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
                        <p className="col-md-12 fs-4">
                            <DescriptionMarkdown text={task.description}/></p>
                        {enter === true ? <AlertSolution class={correct} solved={solved}/> : ""}
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
}

export default Task;