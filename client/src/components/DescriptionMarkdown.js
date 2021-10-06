import React from 'react';
import ReactMarkdown from 'react-markdown';

const DescriptionMarkdown = (props) => {
    return (
        <ReactMarkdown>{props.text}</ReactMarkdown>
    );
};

export default DescriptionMarkdown;