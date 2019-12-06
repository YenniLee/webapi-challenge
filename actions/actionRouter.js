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