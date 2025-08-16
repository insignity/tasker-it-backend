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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create task" });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            include: { client: { select: { id: true, name: true } } }
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};
