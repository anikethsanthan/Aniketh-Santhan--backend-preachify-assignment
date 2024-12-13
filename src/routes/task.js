const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateEditRequest } = require("../utils/validateSignup");

const taskRouter = express.Router();

taskRouter.patch("/task/add", userAuth, async (req, res) => {
  try {
    if (!validateEditRequest(req)) {
      throw new Error("Invalid Edit request");
    }

    const user = req.user;
    const newTask = req.body.task; // Assuming `task` is sent in the request body

    if (!newTask) {
      throw new Error("Task is required");
    }

    // Append the new task to the existing task array
    if (!Array.isArray(user.task)) {
      user.task = []; // Initialize as an array if it's not already
    }

    user.task.push(newTask);

    await user.save();

    res.send(user.firstName + "'s task updated successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

taskRouter.delete("/task/del", userAuth, async (req, res) => {
    try {
      const user = req.user;
      const taskToDelete = req.body.task; // Get the task to delete from the request body
  
      if (!taskToDelete) {
        throw new Error("Task to delete is required");
      }
  
      if (!Array.isArray(user.task)) {
        throw new Error("No tasks found to delete");
      }
  
      // Remove the task from the user's task array
      user.task = user.task.filter((task) => task !== taskToDelete);
  
      await user.save();
  
      res.send("Task deleted successfully");
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });
taskRouter.get("/task", userAuth, async (req, res) => {
    try {
      const user = req.user;
      res.send({ tasks: user.task || [] }); // Send user's task array
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });
    

module.exports = { taskRouter };
