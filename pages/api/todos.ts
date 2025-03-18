import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const todos = await prisma.todo.findMany();
            res.status(200).json(todos);
            break;
        case "POST":
            const { title } = req.body;
            const newTodo = await prisma.todo.create({
                data: { title, completed: false },
            });
            res.status(201).json(newTodo);
            break;
        case "PUT":
            const { id, title: updatedTitle } = req.body;
            const updatedTodo = await prisma.todo.update({
                where: { id },
                data: { title:updatedTitle },
            });
            res.status(200).json(updatedTodo);
            break;
        case "DELETE":
            const { id: deleteId } = req.body;
            await prisma.todo.delete({ where: { id: deleteId } });
            res.status(204).end();
            break;
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    }
}