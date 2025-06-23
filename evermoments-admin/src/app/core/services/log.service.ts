<<<<<<< HEAD
// import { Injectable } from "@angular/core"
// import type { ApiService } from "./api.service"
// import type { Observable } from "rxjs"
// import type { Log } from "../../shared/models/log.model"
// import { HttpParams } from "@angular/common/http"

// @Injectable({
//   providedIn: "root",
// })
// export class LogService {
//   constructor(private apiService: ApiService) {}

//   getLogs(page = 1, limit = 20): Observable<{ logs: Log[]; total: number }> {
//     const params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

//     return this.apiService.get<{ logs: Log[]; total: number }>("/admin/logs", params)
//   }

//   getUserLogs(userId: number, page = 1, limit = 20): Observable<{ logs: Log[]; total: number }> {
//     const params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

//     return this.apiService.get<{ logs: Log[]; total: number }>(`/admin/logs/user/${userId}`, params)
//   }
// }
// src/app/core/services/log.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Log } from '../../shared/models/log.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
=======
import { Injectable } from "@angular/core"
import type { ApiService } from "./api.service"
import type { Observable } from "rxjs"
import type { Log } from "../../shared/models/log.model"
import { HttpParams } from "@angular/common/http"

@Injectable({
  providedIn: "root",
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
})
export class LogService {
  constructor(private apiService: ApiService) {}

<<<<<<< HEAD
  getLogs(page = 1, limit = 20, searchTerm = '', actionFilter = ''): Observable<{ logs: Log[]; total: number; totalPages: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    
    if (actionFilter) {
      params = params.set('action', actionFilter);
    }

    return this.apiService.get<{ logs: Log[]; total: number; totalPages: number }>('/admin/logs', params);
  }

  getLogById(id: number): Observable<Log> {
    return this.apiService.get<Log>(`/admin/logs/${id}`);
  }

  getUserLogs(userId: number, page = 1, limit = 20): Observable<{ logs: Log[]; total: number; totalPages: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.apiService.get<{ logs: Log[]; total: number; totalPages: number }>(`/admin/logs/user/${userId}`, params);
  }
}
=======
  getLogs(page = 1, limit = 20): Observable<{ logs: Log[]; total: number }> {
    const params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

    return this.apiService.get<{ logs: Log[]; total: number }>("/admin/logs", params)
  }

  getUserLogs(userId: number, page = 1, limit = 20): Observable<{ logs: Log[]; total: number }> {
    const params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

    return this.apiService.get<{ logs: Log[]; total: number }>(`/admin/logs/user/${userId}`, params)
  }
}
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
