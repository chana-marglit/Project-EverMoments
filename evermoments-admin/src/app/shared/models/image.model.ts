export interface Image {
    id: number
    userId: number
    albumId?: number
    fileUrl: string
    fileType: string
    fileName?: string
    fileSize?: number
    tags?: string
    createdAt: Date
  }