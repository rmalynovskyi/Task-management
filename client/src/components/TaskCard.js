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
                    <Button variant="primary" onClick={() => {
                        history.push(`/user/${props.userId}/openTask/${props.id}`)
                        console.log("userId: " + props.userId)
                        console.log("taskId: " + props.id)
                    }}>Read task</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TaskCard;