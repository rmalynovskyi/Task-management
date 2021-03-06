import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import firebase from "../config/firebase.config";
import {facebookProvider, githubProvider, twitterProvider} from "../config/authMethod";
import Axios from "axios";
import TaskCard from "./TaskCard";

const MainPage = () => {
    const [lastAdded, setLastAdded] = useState([]);
    const [higherRateTasks, setHigherRateTasks] = useState([]);
    useEffect(() => {
        Axios.get("api/tasks/new").then(res => {
            setLastAdded(res.data)
        });
        Axios.get("api/tasks/higher").then(res => {
            setHigherRateTasks(res.data)
        });
    }, [])

    const socialMediaAuth = (provider) => {
        firebase.auth().signInWithPopup(provider).then(res => {
            const user = {name: res.user.displayName}
            Axios.get("api/users/byName", {params: {name: res.user.displayName}}).then(res => {
                if (res.data === null) {
                    Axios.post("api/users", user).then()
                }
            });
        }).catch((error) => {
            console.log(error)
            return error;
        });
    }

    const handleOnClick = async (provider) => {
        await socialMediaAuth(provider)
    }

    return (
        <Container>
            <Row className="mb-5">
                <Col className="mt-2">
                    <a className="btn btn-block btn-social btn-facebook"
                       onClick={() => handleOnClick(facebookProvider)}>
                        <i className="fa fa-facebook"/>Sign in with Facebook
                    </a>
                </Col>
                <Col className="mt-2">
                    <a className="btn btn-block btn-social btn-twitter" onClick={() => handleOnClick(twitterProvider)}>
                        <i className="fa fa-twitter"/> Sign in with Twitter
                    </a>
                </Col>
                <Col className="mt-2">
                    <a onClick={() => handleOnClick(githubProvider)} className="btn btn-block btn-social btn-github">
                        <i className="fa fa-github"/> Sign in with Github
                    </a>
                </Col>
            </Row>
            <Row className="fs-3 justify-content-center">Latest added tasks:</Row>
            <Row>{lastAdded.map((value, index) => {
                return <Col className="mb-3"><TaskCard averageRate={value.average} name={value.name} topic={value.topic}
                                                       id={value.id}/></Col>
            })}
            </Row>
            <Row className="fs-3 justify-content-center">Most highly rated tasks:</Row>
            <Row>{higherRateTasks.map((value, index) => {
                return <Col className="mb-3"><TaskCard averageRate={value.average} name={value.name} topic={value.topic}
                                                       id={value.id}/></Col>
            })}
            </Row>
        </Container>
    );
}

export default MainPage;