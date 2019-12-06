const express = requiree("express");

const actionRouter = require("./actions/actionRouter.js");
const projectRouter = require("./projects/projectRouter.js");

const server = express();

server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from server!" })
});

module.exports = server;