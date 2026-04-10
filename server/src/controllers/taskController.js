import { prisma } from "../lib/prisma.js";

export const getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: { id: "desc" },
  });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title required" });
  }

  const task = await prisma.task.create({
    data: { title },
  });

  res.json(task);
};

export const toggleTask = async (req, res) => {
  const id = Number(req.params.id);

  const task = await prisma.task.findUnique({ where: { id } });

  const updated = await prisma.task.update({
    where: { id },
    data: { completed: !task.completed },
  });

  res.json(updated);
};

export const deleteTask = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.task.delete({ where: { id } });

  res.json({ message: "Deleted" });
};