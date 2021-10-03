import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import Axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {Card, Button} from "react-bootstrap";

const User = () => {
    let {id} = useParams();
    let history = useHistory();
    const [user, setUser] = useState({});
    const [userTasks, setUserTasks] = useState([]);
    const [selectedId, setSelectedId] = useState(0);

    const columns = [{
        dataField: 'id',
        text: 'Task number'
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
            return <Button variant="info" onClick={() => openTask(row.id)}>Open task</Button>
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
    }, [])

    function openTask(taskId) {
        history.push(`/user/${id}/openTask/${taskId}`)
    }

    function addTask() {
        history.push(`/user/${id}/createUpdate`);
    }

    async function deleteTask() {
        await Axios.delete(`/api/tasks/${selectedId}`).then(
            setUserTasks(userTasks.filter(user => user.id !== selectedId))
        )
    }

    function updateTask() {
        history.push(`/user/${id}/createUpdate/${selectedId}`)
    }

    return (
        <div className="userInfo">
            <BootstrapTable bootstrap4={true} keyField='id' data={userTasks} columns={columns}
                            filter={filterFactory()} selectRow={selectRow}/>
            <Button style={{margin: "15px"}} variant="primary" onClick={addTask}>Add task</Button>
            <Button style={{margin: "15px"}} variant="danger" onClick={deleteTask}>Delete task</Button>
            <Button style={{margin: "15px"}} variant="warning" onClick={updateTask}>Update task</Button>
            <Card body>Solved tasks: {user.solvedTasks}</Card>
            <Card body>Created tasks: {user.createdTasks}</Card>
        </div>
    );
};

export default User;