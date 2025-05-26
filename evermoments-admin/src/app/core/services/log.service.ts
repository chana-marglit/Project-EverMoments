import { Injectable } from "@angular/core"
import type { ApiService } from "./api.service"
import type { Observable } from "rxjs"
import type { Log } from "../../shared/models/log.model"
import { HttpParams } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class LogService {
  constructor(private apiService: ApiService) {}

  getLogs(page = 1, limit = 20): Observable<{ logs: Log[]; total: number }> {
    const params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

    return this.apiService.get<{ logs: Log[]; total: number }>("/admin/logs", params)
  }

  getUserLogs(userId: number, page = 1, limit = 20): Observable<{ logs: Log[]; total: number }> {
    const params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

    return this.apiService.get<{ logs: Log[]; total: number }>(`/admin/logs/user/${userId}`, params)
  }
}
