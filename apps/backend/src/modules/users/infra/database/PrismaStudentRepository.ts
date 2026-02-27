import { PrismaClient } from "@prisma/client";
import { Student } from "../../domain/entities/Student";
import { StudentRepository } from "../../ports/StudentRepository";

export class PrismaStudentRepository implements StudentRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Student | null> {
    const student = await this.prisma.student.findUnique({
      where: { id }
    });

    if (!student) return null;

    return new Student(
      student.id,
      student.name,
      student.email,
      student.credits,
      student.createdAt
    );
  }

  async create(student: Student): Promise<void> {
    await this.prisma.student.create({
      data: {
        id: student.id,
        name: student.name,
        email: student.email,
        credits: student.credits,
        createdAt: student.createdAt
      }
    });
  }
}