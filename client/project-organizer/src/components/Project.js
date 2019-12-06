import React from 'react';

const ProjectCard = props => {
    return (
        <div>
            <div key={props.id}>
                <h3>Name: {props.name}</h3>
                <p>Description: {props.description}</p>
            </div>
        </div>
    )
};

export default ProjectCard;