export interface LoginRequest {
<<<<<<< HEAD
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
  }
}

export interface AuthState {
  isAuthenticated: boolean
  user: any | null
  token: string | null
}
=======
    email: string
    password: string
  }
  
  export interface LoginResponse {
    token: string
    user: {
      id: number
      firstName: string
      lastName: string
      email: string
      role: string
    }
  }
  
  export interface AuthState {
    isAuthenticated: boolean
    user: any | null
    token: string | null
  }
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
