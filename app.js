import express from "express";
import { client } from "./utils/db.js";
import boardRouter from "./apps/boards.js";

async function init() {
  const app = express();
  const port = 4000;

  await client.connect();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/questions", boardRouter);

  app.get("/", (req, res) => {
    return res.json("Hello Skill Checkpoint #2");
  });

  app.get("*", (req, res) => {
    return res.status(404).json("Not found");
  });

  // app.get("/questions", (req, res) => {});
  // app.get("/questions/:id", (req, res) => {});
  // app.post("/questions", (req, res) => {});
  // app.put("/questions/:id", (req, res) => {});
  // app.delete("/questions/:id", (req, res) => {});

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
