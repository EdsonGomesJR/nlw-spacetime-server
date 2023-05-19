import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import {z} from 'zod'


export async function memoriesRoutes(app : FastifyInstance) {
  
  // Todas as memórias
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })

    return memories.map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...')
      }
    })
 //lorem?
  })

//Memoria especifica

app.get('/memories/:id', async (request) => {
  // const {id} = request.params
//Valida pelo zod o id pego pelo params, pois pode ser nulo
  const paramsSchema = z.object({
    id: z.string().uuid()
  })
 const {id} = paramsSchema.parse(request.params)
 
 const memory = await prisma.memory.findUniqueOrThrow({
  where: {
    id
  }
 })
 return memory
})

//Criar memoria
app.post('/memories', async (request) => {
  const bodySchema = z.object({
    content : z.string(),
    coverUrl : z.string(),
    isPublic : z.coerce.boolean().default(false),
  })
  const {content, coverUrl, isPublic} = bodySchema.parse(request.body)

  const memory = await prisma.memory.create({
    data: {
      content,
      coverUrl,
      isPublic,
      userId: 'd94cfdd2-cb89-4bd6-953f-6d76dc393159'
    },
  })

  return memory

})

//Atualizar memoria
app.put('/memories/:id', async (request) => {
  const paramsSchema = z.object({
    id: z.string().uuid()
  })

 const {id} = paramsSchema.parse(request.params)
  const bodySchema = z.object({
    content : z.string(),
    coverUrl : z.string(),
    isPublic : z.coerce.boolean().default(false),
  })
  const {content, coverUrl, isPublic} = bodySchema.parse(request.body)

  const memory = await prisma.memory.update({
    where: {
      id,
    },
    data: {
      content,
      coverUrl,
      isPublic
    }
  })
  return memory
  })




//deletar memoria

app.delete('/memories/:id', async (request) => {
  const paramsSchema = z.object({
    id: z.string().uuid()
  })
 const {id} = paramsSchema.parse(request.params)
 
 await prisma.memory.delete({
  where: {
    id
  }
 })

})

}