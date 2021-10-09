import React from 'react';
import {Button, Card} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const TaskCard = (props) => {
    let history = useHistory();
    return (
        <div>
            <Card style={{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.topic}
                    </Card.Text>
                    <Button variant="info" onClick={() => {
                        history.push(`/user/${props.userId}/openTask/${props.id}`)
                    }}>Read task</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TaskCard;