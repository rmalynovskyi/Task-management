import React from 'react';
import {Form} from 'react-bootstrap';

const TaskTopic = (props) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Task topic</Form.Label>
            <Form.Control as="select" onChange={(e) => {
                if (props.isUpdating() === true) {
                    props.topicUpdate(e.target.value);
                }
                props.topic(e.target.value);
            }} type="text">
                <option value="">Select task topic</option>
                <option value="Geometry">Geometry</option>
                <option value="Number theory">Number theory</option>
                <option value="Java">Java</option>
                <option value="Java Script">Java Script</option>
            </Form.Control>
        </Form.Group>
    );
};

export default TaskTopic;