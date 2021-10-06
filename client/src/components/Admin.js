import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Row, Col, ListGroup} from 'react-bootstrap'
import {useHistory} from 'react-router-dom';

const Admin = () => {
    const [users, setUsers] = useState([]);
    let history = useHistory();

    useEffect(() => {
        Axios.get("/api/users").then(response => setUsers(response.data))
    }, [])

    return (
        <div className="admin">
            <ListGroup>
                {users.map((value, index) => {
                    return <ListGroup.Item key={value.id} action onClick={() => {
                        history.push(`/user/${value.id}`)
                    }}>
                        <Row><Col>{value.name}</Col></Row>
                    </ListGroup.Item>
                })}
            </ListGroup>
        </div>
    );
};

export default Admin;