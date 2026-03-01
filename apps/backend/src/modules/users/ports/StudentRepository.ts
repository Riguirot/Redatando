import { Student } from "../domain/entities/Student"

export interface StudentRepository {
  findById(id: string): Promise<Student | null>
}
