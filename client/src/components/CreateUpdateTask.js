import React, {useEffect, useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import Axios from 'axios';
import {useHistory, useParams} from 'react-router-dom';
import Solutions from './Solutions';
import TaskName from './TaskName';
import TaskDescription from './TaskDescription';
import TaskTopic from './TaskTopic';

const CreateUpdateTask = () => {
    const {id, taskId} = useParams();
    let history = useHistory();
    const [currentUser, setCurrentUser] = useState({});

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [topic, setTopic] = useState("");
    const [solutions, setSolutions] = useState("");

    const [nameToUpdate, setNameToUpdate] = useState("");
    const [descriptionToUpdate, setDescriptionToUpdate] = useState("");
    const [topicToUpdate, setTopicToUpdate] = useState("");
    const [solutionsToUpdate, setSolutionsToUpdate] = useState("");

    useEffect(() => {
        Axios.get(`/api/users/${id}`).then(response => {
            setCurrentUser(response.data);
        });
        if (isUpdating() === true) {
            Axios.get(`/api/tasks/${taskId}`).then(response => {
                    setNameToUpdate(response.data.name);
                    setDescriptionToUpdate(response.data.description);
                    setTopicToUpdate(response.data.topic);
                    setSolutionsToUpdate(response.data.solutions);
                }
            );
        }
    }, []);


    function createTask() {
        const newTask = {
            name: name,
            description: description,
            topic: topic,
            solutions: solutions,
            userId: id
        }
        Axios.post("/api/tasks", newTask).then();
        Axios.put(`/api/users/${id}`, {createdTasks: currentUser.createdTasks + 1}).then();
        history.push(`/user/${id}`);
    }

    async function updateTask() {
        const taskToUpdate = {
            name: nameToUpdate,
            description: descriptionToUpdate,
            topic: topicToUpdate,
            solutions: solutionsToUpdate
        }
        await Axios.put(`/api/tasks/${taskId}`, taskToUpdate).then(
            history.push(`/user/${id}`)
        );
    }

    function isUpdating() {
        if (taskId > 0) {
            return true;
        } else {
            return false;
        }
    }

    function getName(data) {
        setName(data);
    }

    function getNameToUpdate(data) {
        setNameToUpdate(data);
    }

    function getDescription(data) {
        setDescription(data);
    }

    function getDescriptionToUpdate(data) {
        setDescriptionToUpdate(data);
    }

    function getTopic(data) {
        setTopic(data);
    }

    function getTopicToUpdate(data) {
        setTopicToUpdate(data);
    }


    function getSolutionsCreate(data) {
        setSolutions(data);
    }

    function getSolutionsUpdate(data) {
        setSolutionsToUpdate(data);
    }

    return (
        <Form>
            <Container>
                <TaskName name={(data) => getName(data)}
                          nameUpdate={(data) => getNameToUpdate(data)}
                          isUpdating={isUpdating}
                          nameToUpdate={nameToUpdate}/>
                <TaskDescription description={(data) => getDescription(data)}
                                 descriptionUpdate={(data) => getDescriptionToUpdate(data)}
                                 isUpdating={isUpdating}
                                 descriptionToUpdate={descriptionToUpdate}/>
                <TaskTopic topic={(data) => getTopic(data)}
                           topicUpdate={(data) => getTopicToUpdate(data)}
                           isUpdating={isUpdating}
                           topicToUpdate={topicToUpdate}/>
                <Solutions solutionsCreate={(data) => getSolutionsCreate(data)}
                           solutionForUpdate={solutionsToUpdate} solutionsUpdate={(data) => getSolutionsUpdate(data)}
                           isUpdating={isUpdating()}/>
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