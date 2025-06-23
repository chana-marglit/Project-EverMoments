import apiClient from "./apiClient"
import type { UploadUrlResponse } from "../types" // ✅ ייבוא מהקובץ המרכזי

export const getUploadUrl = async (fileName: string, contentType?: string): Promise<UploadUrlResponse> => {
  try {
    const params = new URLSearchParams({ fileName })
    if (contentType) {
      params.append("contentType", contentType)
    }

    const response = await apiClient.get(`/upload/generate-url?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("שגיאה בקבלת URL להעלאה:", error)
    throw error
  }
}
