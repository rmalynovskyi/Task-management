import React, {useEffect, useState} from 'react';
import {Form, Button, Container} from "react-bootstrap";
import Axios from "axios";
import {useHistory, useParams} from "react-router-dom";

const CreateUpdateTask = () => {
    const {id, taskId} = useParams();
    let history = useHistory();
    const [taskName, setTaskName] = useState("");
    const [taskTopic, setTaskTopic] = useState("");
    const [taskNameToUpdate, setTaskNameToUpdate] = useState("");
    const [taskTopicToUpdate, setTaskTopicToUpdate] = useState("");

    async function createTask() {
        const newTask = {name: taskName, topic: taskTopic, userId: id}
        await Axios.post("/api/tasks", newTask).then(
            history.push(`/user/${id}`)
        );
    }

    function isUpdate() {
        if (taskId > 0) {
            return true;
        } else {
            return false;
        }
    }

    async function updateTask() {
        const taskToUpdate = {name: taskNameToUpdate, topic: taskTopicToUpdate}
        await Axios.put(`/api/tasks/${taskId}`, taskToUpdate).then(
            history.push(`/user/${id}`)
        );
    }

    useEffect(() => {
        if (isUpdate() === true) {
            Axios.get(`/api/tasks/${taskId}`).then(response => {
                    setTaskNameToUpdate(response.data.name);
                    setTaskTopicToUpdate(response.data.topic);
                }
            );
        }
    }, [])

    return (
        <Form>
            <Container>
                <Form.Group className="mb-3">
                    <Form.Label>Task name</Form.Label>
                    <Form.Control defaultValue={isUpdate() === true ? taskNameToUpdate : ""} onChange={(e) => {
                        if (isUpdate() === true) {
                            setTaskNameToUpdate(e.target.value);
                        }
                        setTaskName(e.target.value)
                    }} type="text" placeholder="Enter task name"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Task topic</Form.Label>
                    <Form.Control as="select"
                                  onChange={(e) => {
                                      if (isUpdate() === true) {
                                          setTaskTopicToUpdate(e.target.value)
                                      }
                                      setTaskTopic(e.target.value)
                                  }} type="text">
                        <option value="">Select task topic</option>
                        <option value="Geometry">Geometry</option>
                        <option value="Number theory">Number theory</option>
                        <option value="Java">Java</option>
                        <option value="Java Script">Java Script</option>
                    </Form.Control>
                </Form.Group>
                <Button onClick={isUpdate() === true ? updateTask : createTask} variant="primary" type="submit">
                    Submit
                </Button>
                <Button style={{margin: "30px"}} onClick={() => {
                    history.push(`/user/${id}`);
                }} variant="secondary" type="submit">
                    Cancel
                </Button>
            </Container>
        </Form>
    );
};

export default CreateUpdateTask;