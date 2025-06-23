import apiClient from "./apiClient"
import type { ImageItem, SaveImageMetadata } from "../types" // ✅ ייבוא מהקובץ המרכזי

// 🖼️ פעולות על תמונות
export const fetchAlbumImages = async (albumId: number): Promise<ImageItem[]> => {
  try {
    const response = await apiClient.get(`/images/album/${albumId}`)
    return response.data || []
  } catch (error) {
    console.error("שגיאה בטעינת תמונות:", error)
    return []
  }
}

export const searchImages = async (albumId: number, searchTerm: string): Promise<ImageItem[]> => {
  try {
    const response = await apiClient.get(
      `/images/search?albumId=${albumId}&searchTerm=${encodeURIComponent(searchTerm)}`,
    )
    return response.data || []
  } catch (error) {
    console.error("שגיאה בחיפוש תמונות:", error)
    return []
  }
}

export const saveImageMetadata = async (metadata: SaveImageMetadata): Promise<ImageItem> => {
  try {
    const response = await apiClient.post("/images/save-metadata", metadata)
    return response.data
  } catch (error) {
    console.error("שגיאה בשמירת metadata של תמונה:", error)
    throw error
  }
}

export const updateImageTags = async (imageId: number, tags: string): Promise<ImageItem> => {
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

export const deleteImage = async (imageId: number): Promise<void> => {
  try {
    await apiClient.delete(`/images/${imageId}`)
  } catch (error) {
    console.error("שגיאה במחיקת תמונה:", error)
    throw error
  }
}

export const analyzeImage = async (imageId: number): Promise<string[]> => {
  try {
    const response = await apiClient.post(`/images/analyze/${imageId}`)
    return response.data || []
  } catch (error) {
    console.error("שגיאה בניתוח תמונה:", error)
    throw error
  }
}

export const searchImagesByTag = async (tag: string): Promise<ImageItem[]> => {
  try {
    const response = await apiClient.get(`/images/search?tag=${encodeURIComponent(tag)}`)
    return response.data || []
  } catch (error) {
    console.error("שגיאה בחיפוש לפי תגית:", error)
    return []
  }
}
