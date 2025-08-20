const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const server = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/api", router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/api`);
});
