import { Injectable } from "@angular/core"
<<<<<<< HEAD
import { type HttpClient, type HttpParams, HttpHeaders } from "@angular/common/http"
import { type Observable, throwError } from "rxjs"
import { catchError, timeout } from "rxjs/operators"
import { environment } from "../../../environments/environment"

=======
import { type HttpClient, HttpParams } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "../../../environments/environment"


>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

<<<<<<< HEAD
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    })
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}${endpoint}`, {
        headers: this.getHeaders(),
        params,
      })
      .pipe(timeout(30000), catchError(this.handleError))
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}${endpoint}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(timeout(30000), catchError(this.handleError))
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}${endpoint}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(timeout(30000), catchError(this.handleError))
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.apiUrl}${endpoint}`, {
        headers: this.getHeaders(),
      })
      .pipe(timeout(30000), catchError(this.handleError))
  }

  private handleError(error: any): Observable<never> {
    console.error("API Error:", error)
    return throwError(() => error)
=======
  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`, { params })
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, body)
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${path}`, body)
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${path}`)
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
  }
}
