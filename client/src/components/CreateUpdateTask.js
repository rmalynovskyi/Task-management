import React, {useEffect, useState} from 'react';
import {Form, Button, Container, Col} from "react-bootstrap";
import Axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import Solutions from "./Solutions";

const CreateUpdateTask = () => {
    const {id, taskId} = useParams();
    let history = useHistory();
    const [currentUser, setCurrentUser] = useState({});
    const [taskName, setTaskName] = useState("");
    const [taskTopic, setTaskTopic] = useState("");
    const [solutions, setSolutions] = useState("");
    const [solutionsToUpdate, setSolutionsToUpdate] = useState("");
    const [taskNameToUpdate, setTaskNameToUpdate] = useState("");
    const [taskTopicToUpdate, setTaskTopicToUpdate] = useState("");

    function createTask() {
        const newTask = {name: taskName, topic: taskTopic, solutions: solutions, userId: id}
        Axios.post("/api/tasks", newTask).then();
        Axios.put(`/api/users/${id}`, {createdTasks: currentUser.createdTasks + 1}).then()
        history.push(`/user/${id}`)
    }

    function isUpdating() {
        if (taskId > 0) {
            return true;
        } else {
            return false;
        }
    }

    async function updateTask() {
        const taskToUpdate = {name: taskNameToUpdate, topic: taskTopicToUpdate, solutions: solutionsToUpdate}
        await Axios.put(`/api/tasks/${taskId}`, taskToUpdate).then(
            history.push(`/user/${id}`)
        );
    }

    function getSolutionsCreate(data) {
        setSolutions(data);
    }

    function getSolutionsUpdate(data) {
        setSolutionsToUpdate(data);
    }

    useEffect(() => {
        if (isUpdating() === true) {
            Axios.get(`/api/tasks/${taskId}`).then(response => {
                    setTaskNameToUpdate(response.data.name);
                    setTaskTopicToUpdate(response.data.topic);
                    setSolutionsToUpdate(response.data.solutions);
                }
            );
        }
        Axios.get(`/api/users/${id}`).then(response => {
            setCurrentUser(response.data);
        })
    }, [])

    return (
        <Form>
            <Container>
                <Form.Group className="mb-3">
                    <Form.Label>Task name</Form.Label>
                    <Form.Control defaultValue={isUpdating() === true ? taskNameToUpdate : ""} onChange={(e) => {
                        if (isUpdating() === true) {
                            setTaskNameToUpdate(e.target.value);
                        }
                        setTaskName(e.target.value)
                    }} type="text" placeholder="Enter task name"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Task topic</Form.Label>
                    <Form.Control as="select" onChange={(e) => {
                        if (isUpdating() === true) {
                            setTaskTopicToUpdate(e.target.value);
                        }
                        setTaskTopic(e.target.value);
                    }} type="text">
                        <option value="">Select task topic</option>
                        <option value="Geometry">Geometry</option>
                        <option value="Number theory">Number theory</option>
                        <option value="Java">Java</option>
                        <option value="Java Script">Java Script</option>
                    </Form.Control>
                </Form.Group>
                <Solutions solutionsCreate={(data) => getSolutionsCreate(data)}
                           solutionForUpdate={solutionsToUpdate} solutionsUpdate={(data) => getSolutionsUpdate(data)}
                           isUpdate={isUpdating()}/>
                <Button onClick={isUpdating() === true ? updateTask : createTask} variant="primary" type="submit">
                    Submit
                </Button>
                <Button style={{margin: "30px"}} onClick={() => {
                    history.push(`/user/${id}`)
                }} variant="secondary" type="submit">
                    Cancel
                </Button>
            </Container>
        </Form>
    );
};

export default CreateUpdateTask;