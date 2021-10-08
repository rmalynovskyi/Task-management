import React, {useEffect} from 'react';
import Axios from "axios";
import {useHistory} from "react-router-dom";

const Login = (props) => {
    let history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            Axios.get("api/users/byName", {params: {name: props.userName}}).then(res => {
                    history.push(`user/${res.data.id}`)
                }
            )
        }, 1000);
    }, [])

    return (
        <div>
            Logging In....
        </div>
    );
};

export default Login;