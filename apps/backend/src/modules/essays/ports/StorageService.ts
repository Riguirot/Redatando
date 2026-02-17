export type StoreFileInput = {
  file: Buffer
  filename: string
}

export type StoredFile = {
  url: string
}

export interface StorageService {
  store(input: StoreFileInput): Promise<StoredFile>
}
