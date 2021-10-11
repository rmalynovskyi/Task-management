import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Axios from 'axios';
import {Button, FormControl, InputGroup} from 'react-bootstrap';
import AlertSolution from './AlertSolution';
import DescriptionMarkdown from './DescriptionMarkdown';
import ImagesUploader from "./ImagesUploader";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import Rating from "./Rating";

const Task = (props) => {
    let history = useHistory();
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    const {taskId} = useParams();
    const [task, setTask] = useState({});
    const [solved, setSolved] = useState(false);
    const [solution, setSolution] = useState("");
    const [enter, setEnter] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if (user !== null) {
            Axios.get("/api/users/byName", {params: {name: props.userName}}).then(response => {
                setCurrentUser(response.data);
            })
        }
        Axios.get(`/api/tasks/${taskId}`).then(response => setTask(response.data));
    }, []);

    function checkSolution() {
        setEnter(true);
        let array = task.solutions.split(' ');
        for (let i = 0; i < array.length; i++) {
            if (solution && array[i].toLowerCase() === solution.toLowerCase().trim()) {
                const solvedTask = {taskId: taskId, solution: solution, userId: currentUser.id}
                Axios.get("/api/completeTasks", {params: {taskId: taskId, userId: currentUser.id}}).then(response => {
                    if (response.data === null) {
                        Axios.post(`/api/completeTasks`, solvedTask).then()
                        Axios.put(`/api/users/${currentUser.id}`, {solvedTasks: currentUser.solvedTasks + 1}).then()
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
                <div className="p-5 mb-4 rounded-3">
                    <div className="container-fluid py-5">
                        <h3 className="display-5">{task.topic}</h3>
                        <p className="col-md-12 fs-4">
                            <DescriptionMarkdown text={task.description}/></p>
                        {user ? <ImagesUploader/> : ""}
                        {enter === true ? <AlertSolution class={correct} solved={solved}/> : ""}
                        {user ? <InputGroup className="mt-5">
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
                        </InputGroup> : ""}
                        <Button className="mt-3" variant="outline-secondary"
                                onClick={() => history.push(user !== null ? `/user/${currentUser.id}` : "/")}>Exit
                        </Button>
                    </div>
                    {user ? <Rating userId={currentUser.id} taskId={taskId}/> : ""}
                </div>
            </div>
        </div>
    );
}

export default Task;