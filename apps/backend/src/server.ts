import 'dotenv/config'
import app from './app'
import { prisma } from './modules/shared/database/prismaClient'

const PORT = process.env.PORT || 3000

const server = app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`
  🚀 Server running
  🌍 Environment: ${process.env.NODE_ENV}
  🔌 Port: ${PORT}
  `)
})

process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received. Shutting down...')
  await prisma.$disconnect()
  server.close(() => {
    console.log('💤 Server closed.')
    process.exit(0)
  })
})