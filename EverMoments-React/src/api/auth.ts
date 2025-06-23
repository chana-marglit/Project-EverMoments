import apiClient from "./apiClient"
import type { RegisterData } from "../types" // ✅ ייבוא מהקובץ המרכזי

// 🧠 מחלץ userId מה-JWT
export const decodeUserIdFromToken = (token: string): number => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return Number.parseInt(payload.sub)
  } catch {
    return 0
  }
}

// 📥 התחברות
export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password })

  const token = response.data.token
  const fullName = response.data.fullName
  const userId = decodeUserIdFromToken(token)

  const user = { token, fullName, id: userId }

  localStorage.setItem("user", JSON.stringify(user))
  localStorage.setItem("token", token)

  return user
}

// 📤 הרשמה
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
  try {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  } catch (error) {
    console.error("שגיאה בקריאת נתוני משתמש:", error)
    return null
  }
}

// 🚪 התנתקות
export const logoutUser = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}
