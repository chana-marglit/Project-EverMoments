import apiClient from "./apiClient"
import type { Album, CreateAlbumData } from "../types" // ✅ ייבוא מהקובץ המרכזי

// 📁 פעולות על אלבומים
export const addAlbum = async (album: CreateAlbumData): Promise<Album> => {
  const response = await apiClient.post("/albums", album)
  return response.data
}

export const updateAlbum = async (albumId: number, newName: string, description?: string): Promise<Album> => {
  try {
    const currentAlbumResponse = await apiClient.get(`/albums/${albumId}`)
    const currentAlbum = currentAlbumResponse.data

    const updatedAlbum = {
      ...currentAlbum,
      name: newName,
      Description: description || currentAlbum.Description,
      updatedAt: new Date().toISOString(),
    }

    const response = await apiClient.put(`/albums/${albumId}`, updatedAlbum)
    return response.data
  } catch (error) {
    console.error("שגיאה בעדכון אלבום:", error)
    throw error
  }
}

export const deleteAlbum = async (albumId: number): Promise<void> => {
  await apiClient.delete(`/albums/${albumId}`)
}

export const fetchAlbums = async (userId: number): Promise<Album[]> => {
  const response = await apiClient.get(`/albums/user/${userId}`)
  return response.data
}

export const fetchAlbumById = async (albumId: number): Promise<Album> => {
  const response = await apiClient.get(`/albums/${albumId}`)
  return response.data
}
