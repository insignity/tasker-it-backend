import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createTask = async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        clientId: req.user.id
      }
    });
    res.json(task);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getTasks = async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: { select: { id: true, name: true } } }
    });
  res.json(tasks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};
