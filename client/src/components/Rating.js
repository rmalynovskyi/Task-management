import React from 'react';
import ReactStars from "react-rating-stars-component";
import Axios from "axios";

const Rating = (props) => {

    const ratingChanged = (newRating) => {
        console.log(props.userName);
        Axios.get("/api/ratings/byTaskIdAndUserId/", {
            params: {
                taskId: props.taskId,
                userId: props.userId
            }
        }).then(res => {
            if (res.data.length === 0) {
                const rating = {value: newRating, userId: parseInt(props.userId), taskId: props.taskId}
                Axios.post("/api/ratings/", rating).then();
            }
        })
    };

    return (
        <div className="rating">
            Rate this task: <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
            filledIcon={3}
        />
        </div>
    );
};

export default Rating;