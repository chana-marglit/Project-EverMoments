import apiClient from "./apiClient"
import type { User, ImageItem } from "../types"

export interface SharedImage {
  id: number
  imageId: number
  sharedByUserId: number
  sharedWithUserId: number
  sharedAt: string
  isActive: boolean
  image?: ImageItem
  sharedByUser?: User
  sharedWithUser?: User
}

export interface ShareImageRequest {
  userIds: number[]
}

// 🤝 פעולות שיתוף
export const shareImageWithUsers = async (imageId: number, userIds: number[]): Promise<void> => {
  try {
    console.log(`Sharing image ${imageId} with users:`, userIds)

    const response = await apiClient.post(`/share/image/${imageId}`, {
      userIds: userIds,
    })

    console.log("Share response:", response.data)
    return response.data
  } catch (error: any) {
    console.error("שגיאה בשיתוף תמונה:", error)
    console.error("Error details:", error.response?.data)
    throw error
  }
}

export const unshareImage = async (imageId: number, userId: number): Promise<void> => {
  try {
    const response = await apiClient.delete(`/share/image/${imageId}/user/${userId}`)
    return response.data
  } catch (error) {
    console.error("שגיאה בביטול שיתוף תמונה:", error)
    throw error
  }
}

export const getMySharedImages = async (): Promise<ImageItem[]> => {
  try {
    const response = await apiClient.get("/share/my-shared-images")
    return response.data || []
  } catch (error) {
    console.error("שגיאה בטעינת תמונות משותפות:", error)
    return []
  }
}

export const getImageShares = async (imageId: number): Promise<SharedImage[]> => {
  try {
    const response = await apiClient.get(`/share/image/${imageId}/shares`)
    return response.data || []
  } catch (error) {
    console.error("שגיאה בטעינת שיתופי תמונה:", error)
    return []
  }
}
