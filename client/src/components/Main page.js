import React from "react";
import {Col, Row} from "react-bootstrap";
import firebase from "../config/firebase.config";
import {facebookProvider, twitterProvider} from "../config/authMethod";
import Axios from "axios";

const MainPage = () => {

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
        <Row>
            <Col className="mt-2">
                <a className="btn btn-block btn-social btn-facebook" onClick={() => handleOnClick(facebookProvider)}>
                    <i className="fa fa-facebook"/>Sign in with Facebook
                </a>
            </Col>
            <Col className="mt-2">
                <a className="btn btn-block btn-social btn-twitter" onClick={() => handleOnClick(twitterProvider)}>
                    <i className="fa fa-twitter"/> Sign in with Twitter
                </a>
            </Col>
        </Row>
    );
}

export default MainPage;