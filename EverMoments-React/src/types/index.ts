// קובץ מרכזי לכל הטיפוסים
export interface ImageItem {
    id: number
    fileUrl: string
    fileName?: string
    fileType?: string
    fileSize?: number
    tags?: string
    albumId: number
    userId: number
    createdAt: string
  }
  
  export interface User {
    id: number
    fullName: string
    email: string
    phone?: string
    address?: string
    createdAt: string
  }
  
  export interface Album {
    id: number
    name: string
    description: string
    userId: number
    createdAt: string
    updatedAt?: string
  }
  
  export interface SaveImageMetadata {
    fileName: string
    fileType: string
    fileSize: number
    albumId: string | number
    s3Key: string
    userId: number
    tags?: string
  }
  
  export interface UploadUrlResponse {
    url: string
    key: string
  }
  
  export interface RegisterData {
    fullName: string
    address: string
    phone: string
    email: string
    password: string
  }
  
  export interface CreateAlbumData {
    name: string
    description: string
    userId: number
  }
 
  