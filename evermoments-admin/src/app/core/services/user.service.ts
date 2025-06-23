<<<<<<< HEAD
// import { Injectable } from "@angular/core"
// import type { ApiService } from "./api.service"
// import type { Observable } from "rxjs"
// import type { User, UserCreate, UserUpdate } from "../../shared/models/user.model"
// import { HttpParams } from "@angular/common/http"

// @Injectable({
//   providedIn: "root",
// })
// export class UserService {
//   constructor(private apiService: ApiService) {}

//   getUsers(page = 1, limit = 10): Observable<{ users: User[]; total: number }> {
//     const params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

//     return this.apiService.get<{ users: User[]; total: number }>("/admin/users", params)
//   }

//   getUserById(id: number): Observable<User> {
//     return this.apiService.get<User>(`/admin/users/${id}`)
//   }

//   createUser(user: UserCreate): Observable<User> {
//     return this.apiService.post<User>("/admin/users", user)
//   }

//   updateUser(user: UserUpdate): Observable<User> {
//     return this.apiService.put<User>(`/admin/users/${user.id}`, user)
//   }

//   deleteUser(id: number): Observable<void> {
//     return this.apiService.delete<void>(`/admin/users/${id}`)
//   }

//   getUserStats(userId: number): Observable<any> {
//     return this.apiService.get<any>(`/admin/users/${userId}/stats`)
//   }
// }
// src/app/core/services/user.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User, UserCreate, UserUpdate } from '../../shared/models/user.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
=======
import { Injectable } from "@angular/core"
import type { ApiService } from "./api.service"
import type { Observable } from "rxjs"
import type { User, UserCreate, UserUpdate } from "../../shared/models/user.model"
import { HttpParams } from "@angular/common/http"

@Injectable({
  providedIn: "root",
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
})
export class UserService {
  constructor(private apiService: ApiService) {}

<<<<<<< HEAD
  getUsers(page = 1, limit = 10, searchTerm = ''): Observable<{ users: User[]; total: number; totalPages: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.apiService.get<{ users: User[]; total: number; totalPages: number }>('/admin/users', params);
  }

  getUserById(id: number): Observable<User> {
    return this.apiService.get<User>(`/admin/users/${id}`);
  }

  createUser(user: UserCreate): Observable<User> {
    return this.apiService.post<User>('/admin/users', user);
  }

  updateUser(user: UserUpdate): Observable<User> {
    return this.apiService.put<User>(`/admin/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.apiService.delete<void>(`/admin/users/${id}`);
  }

  getUserStats(userId: number): Observable<any> {
    return this.apiService.get<any>(`/admin/users/${userId}/stats`);
  }
}
=======
  getUsers(page = 1, limit = 10): Observable<{ users: User[]; total: number }> {
    const params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

    return this.apiService.get<{ users: User[]; total: number }>("/admin/users", params)
  }

  getUserById(id: number): Observable<User> {
    return this.apiService.get<User>(`/admin/users/${id}`)
  }

  createUser(user: UserCreate): Observable<User> {
    return this.apiService.post<User>("/admin/users", user)
  }

  updateUser(user: UserUpdate): Observable<User> {
    return this.apiService.put<User>(`/admin/users/${user.id}`, user)
  }

  deleteUser(id: number): Observable<void> {
    return this.apiService.delete<void>(`/admin/users/${id}`)
  }

  getUserStats(userId: number): Observable<any> {
    return this.apiService.get<any>(`/admin/users/${userId}/stats`)
  }
}
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
