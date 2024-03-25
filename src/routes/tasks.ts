import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../prisma";

export const TasksRoutes = async(app: FastifyInstance) => {
  
  app.post('/task', async (req, res) => {

    const taskSchema = z.object({
      name: z.string().min(1, 'Name is required!'),
      createdBy: z.string().uuid().min(1, 'CreatedBy Id is required!'),
      text: z.string().min(3, 'Please, insert min 3 charaters in the task'),
      status: z.boolean().default(false),
      startDate: z.string().transform(date => new Date(date)),
      endDate: z.string().transform(date => new Date(date)),
    })

    const {name, createdBy, text, endDate, startDate, status} = taskSchema.parse(req.body)

    const task = await prisma.task.create({
      data: {
        name,
        text,
        userId: createdBy,
        startDate,
        endDate,
        status
      }
    })
    return task
  })

  app.get('/tasks/:id', async (req) => {
    const taskSchema = z.object({
      id: z.string().uuid()
    })

    const {id} = taskSchema.parse(req.params)

    const tasks = await prisma.task.findMany({
      where: {
        userId: id
      },
      orderBy: {
        startDate: 'asc'
      }
    })

    return tasks
  })

  app.delete('/task/:id', async(req) => {
    const taskSchema = z.object({
      id: z.string().uuid()
    })

    const {id} = taskSchema.parse(req.params)

    const Delete = await prisma.task.delete({
      where: {
        id
      }
    })

    return Delete
  })

  app.put('/task/change-status/:id', async (req) => {
    const taskSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = taskSchema.parse(req.params)

    const checkStatus = await prisma.task.findFirst({
      where: {
        id
      }
    })

    if(checkStatus?.status === true) {
      const update = await prisma.task.update({
        where: {
          id
        },
        data: {
          status: false
        }
      })
      return update
    }

    if(checkStatus?.status === false) {
      const update = await prisma.task.update({
        where: {
          id
        },
        data: {
          status: true
        }
      })
      return update
    }

   

  })

}