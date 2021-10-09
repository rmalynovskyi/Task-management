import React from 'react';
import ReactStars from "react-rating-stars-component";

const AverageRate = (props) => {
    return (
        <div className="rating">
            <ReactStars
                count={5}
                value={props.rate}
                isHalf={true}
                edit={false}
                size={24}
                activeColor="#ffd700"
            />
        </div>
    );
};

export default AverageRate;