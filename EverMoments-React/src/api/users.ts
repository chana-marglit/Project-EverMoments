import apiClient from "./apiClient"
import type { User } from "../types"

// 👥 פעולות על משתמשים
export const getUsersList = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get("/users")
    return response.data || []
  } catch (error) {
    console.error("שגיאה בטעינת משתמשים:", error)
    return []
  }
}

export const getUserById = async (userId: number): Promise<User> => {
  try {
    const response = await apiClient.get(`/users/${userId}`)
    return response.data || null
  } catch (error) {
    console.error("שגיאה בטעינת משתמש:", error)
    throw error
  }
}

