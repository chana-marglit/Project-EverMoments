import axios from 'axios';

// כתובת ה-API של צד השרת (עדכני לפי הפרויקט שלך)
const API_URL = 'VITE_API_BASE/Auth/api';

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterData): Promise<void> => {
  try {
    await axios.post(`${API_URL}/register`, userData);
  } catch (error) {
    console.error('שגיאה בהרשמה:', error);
    throw error;
  }
};

export const loginUser = async (credentials: LoginData): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data.token; // מחזיר את ה-JWT
  } catch (error) {
    console.error('שגיאה בהתחברות:', error);
    throw error;
  }
};
