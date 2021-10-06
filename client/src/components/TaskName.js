import React from 'react';
import {Form} from 'react-bootstrap';

const TaskName = (props) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Task name</Form.Label>
            <Form.Control defaultValue={props.isUpdating() === true ? props.nameToUpdate : ""} onChange={(e) => {
                if (props.isUpdating() === true) {
                    props.nameUpdate(e.target.value);
                }
                props.name(e.target.value);
            }} type="text" placeholder="Enter task name"/>
        </Form.Group>
    );
};

export default TaskName;