// import axios from 'axios';

// // כתובת ה-API של צד השרת
// const API_URL = 'VITE_API_BASE/api'; // ודא שהכתובת נכונה

// // יצירת מופע Axios עם הגדרות בסיסיות
// export const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// // פונקציית התחברות
// export const loginUser = async (email: string, password: string) => {
//   try {
//     const response = await apiClient.post('/auth/login', { email, password });
//     return {
//       token: response.data.token,
//       fullName: response.data.fullName, // ודא שזה כלול בתגובה
//     };
//   } catch (error) {
//     console.error('שגיאה בהתחברות:', error);
//     throw error;
//   }
// };

// // פונקציית הרשמה
// export interface RegisterData {
//   fullName: string;
//   address: string;
//   phone: string;
//   email: string;
//   password: string;
// }

// export const registerUser = async (userData: RegisterData): Promise<void> => {
//   try {
//     await apiClient.post('/auth/register', userData);
//   } catch (error) {
//     console.error('שגיאה בהרשמה:', error);
//     throw error;
//   }
// };

// // פונקציית הוספת אלבום
// // export const addAlbum = async (albumData: { name: string; userId: number }) => {
// //   try {
// //     const response = await apiClient.post('/albums', albumData); // הוספת אלבום
// //     return response.data; // מחזיר את האלבום שנוצר
// //   } catch (error) {
// //     console.error('שגיאה בהוספת אלבום:', error);
// //     throw error;
// //   }
// // };
// // export const addAlbum = async (album: { name: string; userId: number }) => {
// //   try {
// //     const response = await apiClient.post('/albums', album);
// //     return response.data;
// //   } catch (error: any) {
// //     console.error("שגיאה בהוספת אלבום:", error.response?.data || error.message);
// //     throw error;
// //   }
// // };
// // פונקציית מחיקת אלבום
// export const deleteAlbumApi = async (albumId: number) => {
//   try {
//     await apiClient.delete(`/albums/${albumId}`);
//   } catch (error) {
//     console.error('שגיאה במחיקת אלבום:', error);
//     throw error;
//   }
// };

// // פונקציית עדכון אלבום
// export const updateAlbumApi = async (album: { id: number; name: string }) => {
//   try {
//     await apiClient.put(`/albums/${album.id}`, album);
//   } catch (error) {
//     console.error('שגיאה בעדכון אלבום:', error);
//     throw error;
//   }
// };

// export const addAlbum = async (album: { name: string; userId: number }) => {
//   // בדיקה אם userId תקין
//   if (!album.userId || album.userId === 0) {
//     console.error("שגיאה: userId אינו תקין!", album.userId);
//     return;
//   }

//   console.log("User ID שנשלח לשרת:", album.userId);

//   try {
//     const response = await apiClient.post('/albums', album);
//     return response.data;
//   } catch (error: any) {
//     console.error("שגיאה בהוספת אלבום:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // בדיקה אם יש משתמש ב-LocalStorage
// export const getStoredUser = () => {
//   const storedUser = localStorage.getItem("user");
//   console.log("User from localStorage:", storedUser);
//   return storedUser ? JSON.parse(storedUser) : null;
// };
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// import axios from 'axios';

// const API_URL = 'http://localhost:5233/api';

// export const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// // ⬅️ Interceptor לשליחת Authorization Header אוטומטית
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // === פונקציות עזר ===
// export const decodeUserIdFromToken = (token: string): number => {
//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return parseInt(payload.sub); // "sub" = userId
//   } catch (e) {
//     console.error('שגיאה בפענוח JWT:', e);
//     return 0;
//   }
// };

// export const loginUser = async (email: string, password: string) => {
//   const response = await apiClient.post('/auth/login', { email, password });

//   const userData = {
//     token: response.data.token,
//     fullName: response.data.fullName,
//   };

//   localStorage.setItem('user', JSON.stringify(userData));

//   return userData;
// };

// export const getStoredUser = () => {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// };

// // === הרשמה ===
// export interface RegisterData {
//   fullName: string;
//   address: string;
//   phone: string;
//   email: string;
//   password: string;
// }

// export const registerUser = async (userData: RegisterData): Promise<void> => {
//   try {
//     const response = await apiClient.post('/auth/register', userData);
//     const token = response.data.token;

//     const user = {
//       fullName: userData.fullName,
//       token,
//       id: decodeUserIdFromToken(token),
//     };

//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));
//   } catch (error) {
//     console.error('שגיאה בהרשמה:', error);
//     throw error;
//   }
// };

// export const addAlbum = async (album: { name: string; Description:string; userId: number }) => {
//   const response = await apiClient.post('/albums', album);
//   return response.data;
// };

// export const updateAlbum = async (albumId: number, newName: string) => {
//   await apiClient.put(`/albums/${albumId}`, { name: newName });
// };

// export const deleteAlbum = async (albumId: number) => {
//   await apiClient.delete(`/albums/${albumId}`);
// };

// export const fetchAlbums = async (userId: number) => {
//   const response = await apiClient.get(`/albums/user/${userId}`);
//   return response.data;
// };


// export const getStoredUser = () => {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// };

// export const loginUser = async (email: string, password: string) => {
//   try {
//     const response = await apiClient.post('/auth/login', { email, password });
//     const token = response.data.token;

//     const user = {
//       fullName: response.data.fullName || 'משתמש',
//       token,
//       id: decodeUserIdFromToken(token),
//     };

//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));

//     return user;
//   } catch (error) {
//     console.error('שגיאה בהתחברות:', error);
//     throw error;
//   }
// };

//------------------------------------------
// import axios from 'axios';

// const API_URL = 'http://localhost:5233/api';

// export const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// });

// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 🧠 מחלץ userId מה-JWT
// export const decodeUserIdFromToken = (token: string): number => {
//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return parseInt(payload.sub); // sub = userId
//   } catch {
//     return 0;
//   }
// };

// // 📥 התחברות
// export const loginUser = async (email: string, password: string) => {
//   const response = await apiClient.post('/auth/login', { email, password });

//   const token = response.data.token;
//   const fullName = response.data.fullName;
//   const userId = decodeUserIdFromToken(token); // 🧠

//   const user = { token, fullName, id: userId };

//   localStorage.setItem('user', JSON.stringify(user));
//   localStorage.setItem('token', token);

//   return user;
// };

// // 📤 הרשמה
// export interface RegisterData {
//   fullName: string;
//   address: string;
//   phone: string;
//   email: string;
//   password: string;
// }

// export const registerUser = async (userData: RegisterData): Promise<void> => {
//   const response = await apiClient.post('/auth/register', userData);
//   const token = response.data.token;
//   const userId = decodeUserIdFromToken(token);
//   const user = { token, fullName: userData.fullName, id: userId };
//   localStorage.setItem('user', JSON.stringify(user));
//   localStorage.setItem('token', token);
// };

// // ⏎ שליפת המשתמש מה־localStorage
// export const getStoredUser = () => {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// };

// // 📁 פעולות על אלבומים
// export const addAlbum = async (album: { name: string; Description: string; userId: number }) => {
//   const response = await apiClient.post('/albums', album);
//   return response.data;
// };

// export const updateAlbum = async (albumId: number, newName: string) => {
//   await apiClient.put(`/albums/${albumId}`, { name: newName });
// };

// export const deleteAlbum = async (albumId: number) => {
//   await apiClient.delete(`/albums/${albumId}`);
// };

// export const fetchAlbums = async (userId: number) => {
//   const response = await apiClient.get(`/albums/user/${userId}`);
//   return response.data;
// };
import axios from "axios"

const API_URL = "http://localhost:5233/api"

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
