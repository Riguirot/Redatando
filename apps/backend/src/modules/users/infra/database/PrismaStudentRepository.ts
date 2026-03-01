import { prisma } from "../../../shared/database/prismaClient"
import { Student } from "../../domain/entities/Student"
import { StudentRepository } from "../../ports/StudentRepository"

export class PrismaStudentRepository implements StudentRepository {
  async findById(id: string): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: { id }
    })

    if (!student) return null

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      createdAt: student.createdAt
    }
  }
}