import React from 'react';
import {Button, Card} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import AverageRate from "./AverageRate";

const TaskCard = (props) => {
    let history = useHistory();

    /* function calculateAverage(data) {
         let sum = 0;
         let count = 0;
         if (data.length === 0) {
             return 0
         } else {
             for (let i = 0; i < data.length; i++) {
                 sum += data[i].value;
                 count++;
             }
             return sum / count;
         }
     }*/

    return (
        <div>
            <Card style={{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>  {props.name} <AverageRate
                        rate={props.averageRate}/>
                    </Card.Title>
                    <Card.Text>
                        {props.topic}
                    </Card.Text>
                    <Button variant="info" onClick={() => {
                        history.push(`/openTask/${props.id}`)
                    }}>Read task</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TaskCard;