import { Injectable } from "@angular/core"
import type { ApiService } from "./api.service"
import type { Observable } from "rxjs"
import type { SystemStats, UserStats } from "../../shared/models/stats.model"
import { HttpParams } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class StatsService {
  constructor(private apiService: ApiService) {}

  getSystemStats(): Observable<SystemStats> {
    return this.apiService.get<SystemStats>("/admin/stats/system")
  }

  getUsersStats(page = 1, limit = 10): Observable<{ stats: UserStats[]; total: number }> {
    const params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

    return this.apiService.get<{ stats: UserStats[]; total: number }>("/admin/stats/users", params)
  }

  getActivityTimeline(days = 30): Observable<any[]> {
    return this.apiService.get<any[]>(`/admin/stats/activity?days=${days}`)
  }

  getStorageUsage(): Observable<any[]> {
    return this.apiService.get<any[]>("/admin/stats/storage")
  }
}
