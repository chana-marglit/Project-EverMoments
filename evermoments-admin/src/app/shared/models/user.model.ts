export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    role: "user" | "admin"
    createdAt: Date
    updatedAt?: Date
  }
  
  export interface UserCreate {
    firstName: string
    lastName: string
    email: string
    password: string
    role: "user" | "admin"
  }
  
  export interface UserUpdate {
    id: number
    firstName?: string
    lastName?: string
    email?: string
    role?: "user" | "admin"
    password?: string
  }