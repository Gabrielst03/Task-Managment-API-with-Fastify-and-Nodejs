import fastify from 'fastify'
import { TasksRoutes } from './routes/tasks'

const app = fastify()

app.get('/', () => {
  return 'Hello World!'
})

app.register(TasksRoutes)

app.listen({
  port: 3001
})