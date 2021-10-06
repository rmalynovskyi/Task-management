import React from 'react';
import {Alert} from "react-bootstrap";

const AlertSolution = (props) => {
    return (
        props.solved === true ? <Alert variant="info">
                You have already solved this task!
            </Alert> :
            <Alert variant={props.class === true ? "success" : "danger"}>
                This is {props.class === true ? "correct" : "wrong"} solution!
            </Alert>
    );
};

export default AlertSolution;