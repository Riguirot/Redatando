import { StudentRepository } from "../ports/StudentRepository"
import { AppError } from "../../shared/errors/AppError"
import { Student } from "../domain/entities/Student"

export class GetUserByIdUseCase {
  constructor(private repository: StudentRepository) {}

  async execute(id: string): Promise<Student> {
    const student = await this.repository.findById(id)

    if (!student) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND")
    }

    return student
  }
}
