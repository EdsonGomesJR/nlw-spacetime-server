import fastify from 'fastify'
import {PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(memoriesRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server Running on PORT:3333')
})