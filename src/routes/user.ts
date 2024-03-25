import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../prisma";
import { hash } from "bcryptjs";

export const userRoutes = async (app: FastifyInstance) => {



  app.post('/user', async (req, res) => {

    const userSchema = z.object({
      name: z.string().min(1, 'Name is required!'),
      email: z.string().min(1, 'Email is required').email('Please insert a valid email!'),
      password: z.string().min(6, 'Required min 6 characters for our password!')
    })

    const {name, email, password} = userSchema.parse(req.body)

    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user

  })

  app.get('/users', async(req) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    return users
  })

  app.get('/users/:id', async (req) => {

    const userSchema = z.object({
      id: z.string().uuid()
    })

    const {id} = userSchema.parse(req.params)
    
    const user = await prisma.user.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    return user

  })


}