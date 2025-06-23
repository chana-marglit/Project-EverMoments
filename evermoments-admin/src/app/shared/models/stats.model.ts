export interface SystemStats {
<<<<<<< HEAD
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
=======
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
  
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
