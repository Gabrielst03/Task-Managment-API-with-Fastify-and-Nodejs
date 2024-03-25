import fastify, { FastifyInstance } from "fastify";
import { parse } from "path";
import z from "zod";

export const TasksRoutes = async(app: FastifyInstance) => {

  const taskSchema = z.object({
    name: z.string().min(1, 'Name is required!'),
    createdBy: z.string().uuid().min(1, 'CreatedBy Id is required!'),
    text: z.string().min(3, 'Please, insert min 3 charaters in the task'),
    status: z.boolean().default(false),
    startDate: z.date(),
    endDate: z.date()
  })

  app.post('/task', (req, res) => {

    const {name, createdBy, text, endDate, startDate, status} = taskSchema.parse(req.body)

    const task
    

  })

}