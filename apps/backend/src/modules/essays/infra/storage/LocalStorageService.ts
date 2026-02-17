import { StorageService } from '../../ports/StorageService'
import fs from 'fs/promises'
import path from 'path'

export class LocalStorageService implements StorageService {
  async store(input: {
    file: Buffer
    filename: string
  }): Promise<{ url: string }> {
    const uploadsDir = path.resolve('uploads')

    await fs.mkdir(uploadsDir, { recursive: true })

    const filePath = path.join(uploadsDir, input.filename)

    await fs.writeFile(filePath, input.file)

    return {
      url: `/uploads/${input.filename}`,
    }
  }
}
