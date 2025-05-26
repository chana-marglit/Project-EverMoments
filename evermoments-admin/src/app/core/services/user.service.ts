import { Injectable } from "@angular/core"
import type { ApiService } from "./api.service"
import type { Observable } from "rxjs"
import type { User, UserCreate, UserUpdate } from "../../shared/models/user.model"
import { HttpParams } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private apiService: ApiService) {}

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
