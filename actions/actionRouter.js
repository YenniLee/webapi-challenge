const express = require("express");
const Action = require('../data/helpers/actionModel.js');

const router = express.Router();

module.exports = router;

router.get("/", (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ message: `Unable to retrieve actions. ${err}` });
        })
});

router.get("/:id", validateId, (req, res) => {
    res.status(200).json(req.action);
});

router.post("/", validateId, validateAction, (req, res) => {
    Action.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction);
        })
        .catch(err => {
            res.status(500).json({ message: `Error adding action. ${err}` })
        })
});

router.delete("/:id", validateId, (req, res) => {
    const { id } = req.params;
    Action.remove(id)
        .then(actionToDelete => {
            res.status(204).json(req.action);
        })
        .catch(err => {
            res.status(500).json({ message: `Unable to delete action. ${err}` })
        })
});

router.put("/:id", validateId, validateAction, (req, res) => {
    const { id } = req.params;
    Action.update(id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(500).json({ message: `Unable to edit action. ${err}` })
        })
});




// middleware 

function validateId(req, res, next) {
    const { id } = req.params;
    Action.get(id)
        .then(action => {
            if(action) {
                req.action = action;
                next();
            } else {
                res.status(404).json({ message: "ID is invalid." });
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Unable to get actions from the database. ${err}` })
        })
};

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;

    if(Object.entries(req.body).length === 0) {
        res.status(400).json({ message: "No body data." });
    } else if(!project_id || !description || !notes) {
        res.status(400).json({ message: "Please input project_id, description, and notes." })
    } else {
        next();
    }
};
