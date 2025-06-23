// // import { Injectable } from "@angular/core"
// // import type { ApiService } from "./api.service"
// // import type { Observable } from "rxjs"
// // import type { SystemStats, UserStats } from "../../shared/models/stats.model"
// // import { HttpParams } from "@angular/common/http"

// // @Injectable({
// //   providedIn: "root",
// // })
// // export class StatsService {
// //   constructor(private apiService: ApiService) {}

// //   getSystemStats(): Observable<SystemStats> {
// //     return this.apiService.get<SystemStats>("/admin/stats/system")
// //   }

// //   getUsersStats(page = 1, limit = 10): Observable<{ stats: UserStats[]; total: number }> {
// //     const params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

// //     return this.apiService.get<{ stats: UserStats[]; total: number }>("/admin/stats/users", params)
// //   }

// //   getActivityTimeline(days = 30): Observable<any[]> {
// //     return this.apiService.get<any[]>(`/admin/stats/activity?days=${days}`)
// //   }

// //   getStorageUsage(): Observable<any[]> {
// //     return this.apiService.get<any[]>("/admin/stats/storage")
// //   }
// // }
// // src/app/core/services/stats.service.ts
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ApiService } from './api.service';
// import { SystemStats, UserStats } from '../../shared/models/stats.model';
// import { HttpParams } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class StatsService {
//   constructor(private apiService: ApiService) {}

//   getSystemStats(): Observable<SystemStats> {
//     return this.apiService.get<SystemStats>('/admin/stats/system');
//   }

//   getUsersStats(page = 1, limit = 10): Observable<{ stats: UserStats[]; total: number; totalPages: number }> {
//     const params = new HttpParams()
//       .set('page', page.toString())
//       .set('limit', limit.toString());

//     return this.apiService.get<{ stats: UserStats[]; total: number; totalPages: number }>('/admin/stats/users', params);
//   }

//   getActivityTimeline(days = 30): Observable<any[]> {
//     const params = new HttpParams().set('days', days.toString());
//     return this.apiService.get<any[]>('/admin/stats/activity', params);
//   }

//   getStorageUsage(): Observable<any[]> {
//     return this.apiService.get<any[]>('/admin/stats/storage');
//   }
// }
import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import { delay } from "rxjs/operators"
import type { ApiService } from "./api.service"
import type { SystemStats, UserStats } from "../../shared/models/stats.model"
import { HttpParams } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class StatsService {
  constructor(private apiService: ApiService) {}

  getSystemStats(): Observable<SystemStats> {
    // זמנית נחזיר נתונים מדומים עד שהשרת יהיה מוכן
    const mockStats: SystemStats = {
      totalUsers: 1250,
      totalAlbums: 3420,
      totalImages: 15680,
      totalStorage: 2147483648, // 2GB
      newUsersToday: 12,
      newImagesThisWeek: 234,
    }

    // כאשר השרת יהיה מוכן, החלף את זה ב:
    // return this.apiService.get<SystemStats>('/admin/stats/system');

    return of(mockStats).pipe(delay(1000)) // סימולציה של קריאת API
  }

  getUsersStats(page = 1, limit = 10): Observable<{ stats: UserStats[]; total: number; totalPages: number }> {
    const params = new HttpParams().set("page", page.toString()).set("limit", limit.toString())

    // זמנית נתונים מדומים
    const mockUserStats = {
      stats: [
        {
          userId: 1,
          userName: "יוסי כהן",
          albumCount: 5,
          imageCount: 120,
          storageUsed: 52428800, // 50MB
          lastActive: new Date(),
        },
        {
          userId: 2,
          userName: "שרה לוי",
          albumCount: 8,
          imageCount: 200,
          storageUsed: 104857600, // 100MB
          lastActive: new Date(),
        },
      ],
      total: 1250,
      totalPages: 125,
    }

    // כאשר השרת יהיה מוכן:
    // return this.apiService.get<{ stats: UserStats[]; total: number; totalPages: number }>('/admin/stats/users', params);

    return of(mockUserStats).pipe(delay(800))
  }

  getActivityTimeline(days = 30): Observable<any[]> {
    const params = new HttpParams().set("days", days.toString())

    // נתונים מדומים לגרף פעילות
    const mockActivity = [
      { label: "ב׳", value: 45 },
      { label: "ג׳", value: 67 },
      { label: "ד׳", value: 23 },
      { label: "ה׳", value: 89 },
      { label: "ו׳", value: 34 },
      { label: "ש׳", value: 78 },
      { label: "א׳", value: 56 },
    ]

    // כאשר השרת יהיה מוכן:
    // return this.apiService.get<any[]>('/admin/stats/activity', params);

    return of(mockActivity).pipe(delay(600))
  }

  getStorageUsage(): Observable<any[]> {
    // נתונים מדומים לגרף אחסון
    const mockStorage = [
      { category: "תמונות", size: 1073741824, color: "#3f51b5" }, // 1GB
      { category: "וידאו", size: 536870912, color: "#f44336" }, // 512MB
      { category: "מסמכים", size: 268435456, color: "#4caf50" }, // 256MB
      { category: "אחר", size: 134217728, color: "#ff9800" }, // 128MB
    ]

    // כאשר השרת יהיה מוכן:
    // return this.apiService.get<any[]>('/admin/stats/storage');

    return of(mockStorage).pipe(delay(700))
  }
}
