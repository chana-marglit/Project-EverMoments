
import axios from "axios"

const API_URL = import.meta.env.VITE_API_BASE + "/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 🧠 מחלץ userId מה-JWT
export const decodeUserIdFromToken = (token: string): number => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return Number.parseInt(payload.sub) // sub = userId
  } catch {
    return 0
  }
}

// 📥 התחברות
export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password })

  const token = response.data.token
  const fullName = response.data.fullName
  const userId = decodeUserIdFromToken(token) // 🧠

  const user = { token, fullName, id: userId }

  localStorage.setItem("user", JSON.stringify(user))
  localStorage.setItem("token", token)

  return user
}

// 📤 הרשמה
export interface RegisterData {
  fullName: string
  address: string
  phone: string
  email: string
  password: string
}

export const registerUser = async (userData: RegisterData): Promise<void> => {
  const response = await apiClient.post("/auth/register", userData)
  const token = response.data.token
  const userId = decodeUserIdFromToken(token)
  const user = { token, fullName: userData.fullName, id: userId }
  localStorage.setItem("user", JSON.stringify(user))
  localStorage.setItem("token", token)
}

// ⏎ שליפת המשתמש מה־localStorage
export const getStoredUser = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

// 📁 פעולות על אלבומים
export const addAlbum = async (album: { name: string; Description: string; userId: number }) => {
  const response = await apiClient.post("/albums", album)
  return response.data
}

// עדכון פונקציית updateAlbum בקובץ api.ts
export const updateAlbum = async (albumId: number, newName: string, description?: string) => {
  try {
    // קבל את האלבום הנוכחי כדי לשמור על שדות אחרים
    const currentAlbumResponse = await apiClient.get(`/albums/${albumId}`)
    const currentAlbum = currentAlbumResponse.data

    // עדכן עם הערכים החדשים
    const updatedAlbum = {
      ...currentAlbum,
      name: newName,
      Description: description || currentAlbum.Description,
      updatedAt: new Date().toISOString(),
    }

    await apiClient.put(`/albums/${albumId}`, updatedAlbum)
    return updatedAlbum
  } catch (error) {
    console.error("שגיאה בעדכון אלבום:", error)
    throw error
  }
}

export const deleteAlbum = async (albumId: number) => {
  await apiClient.delete(`/albums/${albumId}`)
}

export const fetchAlbums = async (userId: number) => {
  const response = await apiClient.get(`/albums/user/${userId}`)
  return response.data
}

// פונקציות חדשות לטיפול בתמונות
export const fetchAlbumImages = async (albumId: number) => {
  try {
    const response = await apiClient.get(`/images/album/${albumId}`)
    return response.data
  } catch (error) {
    console.error("שגיאה בטעינת תמונות:", error)
    return []
  }
}

export const searchImages = async (albumId: number, searchTerm: string) => {
  try {
    const response = await apiClient.get(
      `/images/search?albumId=${albumId}&searchTerm=${encodeURIComponent(searchTerm)}`,
    )
    return response.data
  } catch (error) {
    console.error("שגיאה בחיפוש תמונות:", error)
    return []
  }
}

export const saveImageToAlbum = async (fileUrl: string, albumId: number, fileName: string, fileType: string) => {
  try {
    const response = await apiClient.post("/images/save", {
      fileUrl,
      albumId,
      fileName,
      fileType,
    })
    return response.data
  } catch (error) {
    console.error("שגיאה בשמירת תמונה:", error)
    throw error
  }
}


export const updateImageTags = async (imageId: number, tags: string) => {
  try {
    const response = await apiClient.put(`/images/${imageId}/tags`, JSON.stringify(tags), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("שגיאה בעדכון תגיות:", error)
    throw error
  }
}

export const deleteImage = async (imageId: number) => {
  try {
    await apiClient.delete(`/images/${imageId}`)
  } catch (error) {
    console.error("שגיאה במחיקת תמונה:", error)
    throw error
  }
}

export const getUploadUrl = async (fileName: string) => {
  try {
    const response = await apiClient.get(`/upload/generate-url?fileName=${encodeURIComponent(fileName)}`)
    return response.data
  } catch (error) {
    console.error("שגיאה בקבלת URL להעלאה:", error)
    throw error
  }
}

export const shareImage = async (imageId: number, userIds: number[]) => {
  return apiClient.post(`/images/share/${imageId}`, userIds)
}

