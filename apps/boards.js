import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";

const boardRouter = Router();

// Fetching all boards data
boardRouter.get("/", async (req, res) => {
  const collection = db.collection("boards");
  const board = await collection.find({}).limit(10).toArray();

  return res.json({
    message: "Fetching all questions successfully",
    data: board,
  });
});

// Fetching specific board id
boardRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = db.collection("boards");
  const board = await collection.findOne({ _id: new ObjectId(id) });

  return res.json({
    message: `Fetching question ${id} successfully`,
    data: board,
  });
});

// Create new question
boardRouter.post("/", async (req, res) => {
  const collection = db.collection("boards");
  const boardData = { ...req.body };
  const board = await collection.insertOne(boardData);

  return res.json({
    message: `New question ${board.insertedId} has been created successfully`,
    data: boardData,
  });
});

// Update a question
boardRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = db.collection("boards");
  const newBoardData = { ...req.body };

  await collection.updateOne(
    {
      _id: new ObjectId(id),
    },
    { $set: newBoardData }
  );

  return res.json({
    message: `${id} has been updated successfully`,
    data: newBoardData,
  });
});

// Delete a question
boardRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = db.collection("boards");

  await collection.deleteOne({
    _id: new ObjectId(id),
  });

  return res.json({
    message: `${id} has been deleted successfully`,
  });
});

export default boardRouter;
