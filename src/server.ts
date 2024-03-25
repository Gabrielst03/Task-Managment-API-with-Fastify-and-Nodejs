import fastify from 'fastify'
import { TasksRoutes } from './routes/tasks'
import { userRoutes } from './routes/user'

const app = fastify()

app.get('/', () => {
  return 'Hello World!'
})

app.register(TasksRoutes)
app.register(userRoutes)

app.listen({
  port: 3001
})