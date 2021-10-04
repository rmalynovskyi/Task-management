import React, {useEffect, useState} from 'react';
import {Col, Form} from "react-bootstrap";

const Solutions = (props) => {
    const [solution1, setSolution1] = useState("");
    const [solution2, setSolution2] = useState("");
    const [solution3, setSolution3] = useState("");
    const [solution1ForUpdate, setSolution1ForUpdate] = useState("");
    const [solution2ForUpdate, setSolution2ForUpdate] = useState("");
    const [solution3ForUpdate, setSolution3ForUpdate] = useState("");

    useEffect(() => {
        if (props.isUpdate === true) {
            let str = [solution1ForUpdate, solution2ForUpdate, solution3ForUpdate]
            props.solutionsUpdate(str.join(" "));
        } else {
            let strings = [solution1, solution2, solution3]
            props.solutionsCreate(strings.join(" "));
        }
    }, [solution1, solution2, solution3])

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>
                    Solution 1
                </Form.Label>
                <Col>
                    <Form.Control
                        defaultValue={props.solutionForUpdate ? props.solutionForUpdate.split(' ')[0] : ""}
                        placeholder="Enter solution 1" onChange={(e) => {
                        if (props.isUpdate === true) {
                            setSolution1ForUpdate(e.target.value);
                        }
                        setSolution1(e.target.value);
                    }}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>
                    Solution 2
                </Form.Label>
                <Col>
                    <Form.Control
                        defaultValue={props.solutionForUpdate ? props.solutionForUpdate.split(' ')[1] : ""}
                        placeholder="Enter solution 2" onChange={(e) => {
                        if (props.isUpdate === true) {
                            setSolution2ForUpdate(e.target.value);
                        }
                        setSolution2(e.target.value);
                    }}/>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>
                    Solution 3
                </Form.Label>
                <Col>
                    <Form.Control
                        defaultValue={props.solutionForUpdate ? props.solutionForUpdate.split(' ')[2] : ""}
                        placeholder="Enter solution 3" onChange={(e) => {
                        if (props.isUpdate === true) {
                            setSolution3ForUpdate(e.target.value);
                        }
                        setSolution3(e.target.value);
                    }}/>
                </Col>
            </Form.Group>
        </div>
    );
};

export default Solutions;