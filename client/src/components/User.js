import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {Card, Button, Container, Navbar, Col, Row} from 'react-bootstrap';
import {Context} from "../index";
import TaskCard from "./TaskCard";

const User = () => {
    let {id} = useParams();
    let history = useHistory();
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState({});
    const [userTasks, setUserTasks] = useState([]);
    const [selectedId, setSelectedId] = useState(0);
    const {auth} = useContext(Context);

    const columns = [{
        dataField: 'id',
        text: 'Task number',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'name',
        text: 'Task name',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'topic',
        text: 'Task topic',
        sort: true,
        filter: textFilter()
    }, {
        formatter: (cellContent, row) => {
            return <Button variant="info" onClick={() => openTask(row.id)}>Read task</Button>
        }
    }];

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                setSelectedId(row.id);
            } else {
                setSelectedId([]);
            }
        }
    };

    useEffect(() => {
        Axios.get(`/api/users/${id}`).then(response => {
            setUser(response.data);
            setUserTasks(response.data.tasks)
        })
        Axios.get("/api/tasks").then(response => {
            setTasks(response.data)
        });
    }, [])

    function openTask(taskId) {
        history.push(`/openTask/${taskId}`)
    }

    function addTask() {
        history.push(`/user/${id}/createUpdate`);
    }

    function deleteTask() {
        Axios.delete(`/api/tasks/${selectedId}`).then(res => {
                setUserTasks(userTasks.filter(task => task.id !== selectedId))
                setTasks(tasks.filter(task => task.id !== selectedId));
            }
        );
        Axios.delete(`/api/completeTasks/${selectedId}`).then();
    }

    function updateTask() {
        history.push(`/user/${id}/createUpdate/${selectedId}`)
    }

    return (
        <div className="userInfo">
            <Navbar className="mb-5" bg="light" variant="light">
                <Container>
                    <Button variant="secondary" onClick={() => {
                        history.push(`/admin`)
                    }}>Admin panel</Button>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: {user.name}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Row className="fs-3 justify-content-center">Your tasks</Row>
            <BootstrapTable bootstrap4={true} keyField='id' data={userTasks} columns={columns} filter={filterFactory()}
                            selectRow={selectRow}/>
            <Button style={{margin: "15px"}} variant="primary" onClick={addTask}>Add task</Button>
            <Button style={{margin: "15px"}} variant="danger" onClick={deleteTask}>Delete task</Button>
            <Button style={{margin: "15px"}} variant="warning" onClick={updateTask}>Update task</Button>
            <Card body>Solved tasks: {user.solvedTasks}</Card>
            <Card body>Created tasks: {user.createdTasks}</Card>
            <Row className="fs-3 justify-content-center">All tasks</Row>
            <Row>{tasks.map((value) => {
                return <Col className="mb-3"><TaskCard averageRate={value.average} name={value.name} topic={value.topic}
                                                       id={value.id}/></Col>
            })}
            </Row>
            <Button style={{margin: "15px"}} variant="outline-secondary" onClick={() => auth.signOut()}>Sign
                out</Button>
        </div>
    );
};

export default User;