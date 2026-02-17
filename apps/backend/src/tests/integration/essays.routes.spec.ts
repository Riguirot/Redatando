import request from 'supertest'
import app from '../../app'
import { prisma } from '../../modules/shared/database/prismaClient'
import { EssayStatus } from '../../modules/essays/domain/valueObjects/EssayStatus'

function auth(userId: string) {
  return `Bearer test-token-${userId}`
}

describe('Essays Routes (integration)', () => {
  const studentId = 'student-id-1'
  const otherStudentId = 'other-student'
  const essayId = 'essay-id-123'

  beforeAll(async () => {
    await prisma.essay.deleteMany()

    await prisma.essay.create({
      data: {
        id: essayId,
        studentId,
        theme: 'Tema integração',
        fileUrl: 'file.pdf',
        status: EssayStatus.SUBMITTED,
      },
    })
  })

  afterAll(async () => {
    await prisma.essay.deleteMany()
    await prisma.$disconnect()
  })

  it('GET /api/essays/:id should return essay details', async () => {
    const response = await request(app)
      .get(`/api/essays/${essayId}`)
      .set('Authorization', auth(studentId))

    expect(response.status).toBe(200)
    expect(response.body.data).toEqual({
      id: essayId,
      theme: 'Tema integração',
      status: EssayStatus.SUBMITTED,
      fileUrl: 'file.pdf',
      createdAt: expect.any(String),
    })
  })

  it('GET /api/essays/:id should return 403 if essay does not belong to student', async () => {
    const response = await request(app)
      .get(`/api/essays/${essayId}`)
      .set('Authorization', auth(otherStudentId))

    expect(response.status).toBe(403)
  })

  it('GET /api/essays/:id should return 404 if essay does not exist', async () => {
    const response = await request(app)
      .get('/api/essays/non-existing-id')
      .set('Authorization', auth(studentId))

    expect(response.status).toBe(404)
  })
})
