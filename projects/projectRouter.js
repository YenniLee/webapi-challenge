const express = require("express");
const Project = require('../data/helpers/projectModel.js');

const router = express.Router();

module.exports = router;

router.get("/", (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ message: `Unable to get projects from database. ${err}` })
        })
});

router.get("/:id", validateId,  (req, res) => {
    res.status(200).json(req.project);
});

router.post("/", validateProject, (req, res) => {
    Project.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({ message: `Unable to add project. ${err}` })
        })
});

router.delete("/:id", validateId, (req, res) => {
    const { id } = req.params;
    Project.remove(id)
        .then(projectToDelete => {
            res.status(204).json(req.project);
        })
        .catch(err => {
            res.status(500).json({ message: `Unable to remove project. ${err}` })
        })
});

router.put("/:id", validateId, validateProject, (req, res) => {
    const { id } = req.params;
    Project.update(id, req.body) 
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({ message: `Unable to update project. ${err}` })
        })
});

// part 2/2 of MVP
router.get("/:id/actions", validateId, (req, res) => {
    const { id } = req.params;
    Project.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ message: `Unable to get actions for specified project. ${err}` })
        })
});



// middleware 

function validateId(req, res, next) {
    const { id } = req.params;
    Project.get(id)
        .then(project => {
            if(project) {
                req.project = project;
                next();
            } else {
                res.status(404).json({ message: `No project with id of ${id} found.` })
            }
        }) 
        .catch(err => {
            res.status(500).json({ message: `Unable to get project. ${err}` })
        })
};

function validateProject(req, res, next) {
    const { name, description } = req.body;
    if(Object.entries(req.body).length === 0) {
        res.status(400).json({ message: "No body data." })
    } else if(!name || !description) {
        res.status(400).json({ message: "Missing required fields." })
    } else {
        next();
    }
};