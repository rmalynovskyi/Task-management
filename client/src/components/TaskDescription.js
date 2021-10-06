import React from 'react';
import {Form} from 'react-bootstrap';

const TaskDescription = (props) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Task description</Form.Label>
            <Form.Control defaultValue={props.isUpdating() === true ? props.descriptionToUpdate : ""} onChange={(e) => {
                if (props.isUpdating() === true) {
                    props.descriptionUpdate(e.target.value);
                }
                props.description(e.target.value);
            }} type="text" placeholder="Enter task description"/>
        </Form.Group>
    );
};

export default TaskDescription;