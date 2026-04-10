import { prisma } from "../lib/prisma.js";

// GET
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { id: "desc" },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// POST
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = await prisma.task.create({
      data: { title },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// PATCH
export const toggleTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// DELETE
export const deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};