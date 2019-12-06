import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProjectCard from './Project'

export default function ProjectList() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/projects')
            .then(res => {
                console.log(res);
                setProjects(res.data);
            })
            .catch(err => console.log(err))
    })
    return (
        <div>
            <h3>Projects</h3>
            {projects.map(project => {
                return (
                    <ProjectCard key={project.id} name={project.name} description={project.description} />
                )
            })}
        </div>
    )
}