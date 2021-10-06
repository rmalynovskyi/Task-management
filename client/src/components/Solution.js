import React from 'react';
import {Col, Form} from 'react-bootstrap';

const Solution = (props) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>
                Solution {props.number}
            </Form.Label>
            <Col>
                <Form.Control
                    defaultValue={props.solutionForUpdate ? props.solutionForUpdate.split(' ')[props.index] : ""}
                    placeholder={"Enter solution " + props.number} onChange={(e) => {
                    if (props.isUpdating === true) {
                        props.solutionToUpdate(e.target.value);
                    }
                    props.solution(e.target.value);
                }}/>
            </Col>
        </Form.Group>
    );
};

export default Solution;