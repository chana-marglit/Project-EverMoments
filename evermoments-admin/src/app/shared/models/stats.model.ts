export interface SystemStats {
    totalUsers: number
    totalAlbums: number
    totalImages: number
    totalStorage: number // בבייטים
    newUsersToday: number
    newImagesThisWeek: number
  }
  
  export interface UserStats {
    userId: number
    userName: string
    albumCount: number
    imageCount: number
    storageUsed: number // בבייטים
    lastActive: Date
  }
  