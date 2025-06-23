<<<<<<< HEAD
import { Injectable } from "@angular/core"
import type { ApiService } from "./api.service"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { tap, delay } from "rxjs/operators"
import type { LoginRequest, LoginResponse, AuthState } from "../../shared/models/auth.model"
import type { Router } from "@angular/router"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  })

  authState$ = this.authStateSubject.asObservable()

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {
    this.loadAuthState()
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // זמנית נחזיר התחברות מדומה
    const mockResponse: LoginResponse = {
      token: "mock-jwt-token-12345",
      user: {
        id: 1,
        firstName: "מנהל",
        lastName: "מערכת",
        email: credentials.email,
        role: "admin",
      },
    }

    return of(mockResponse).pipe(
      delay(1000), // סימולציה של זמן טעינה
      tap((response) => {
        this.setAuthState({
          isAuthenticated: true,
          user: response.user,
          token: response.token,
        })
      }),
    )

    // כאשר השרת יהיה מוכן:
    // return this.apiService.post<LoginResponse>('/auth/login', credentials).pipe(
    //   tap((response) => {
    //     this.setAuthState({
    //       isAuthenticated: true,
    //       user: response.user,
    //       token: response.token
    //     });
    //   })
    // );
  }

  logout(): void {
    localStorage.removeItem("auth")
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null,
    })
    this.router.navigate(["/login"])
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated
  }

  isAdmin(): boolean {
    return this.authStateSubject.value.user?.role === "admin"
  }

  getToken(): string | null {
    return this.authStateSubject.value.token
  }

  private setAuthState(state: AuthState): void {
    localStorage.setItem("auth", JSON.stringify(state))
    this.authStateSubject.next(state)
  }

  private loadAuthState(): void {
    const storedState = localStorage.getItem("auth")
    if (storedState) {
      try {
        const state = JSON.parse(storedState)
        this.authStateSubject.next(state)
      } catch (e) {
        localStorage.removeItem("auth")
      }
    }
  }
}
=======
// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  
  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  authState$ = this.authStateSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadAuthState();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.setAuthState({
            isAuthenticated: true,
            user: response.user,
            token: response.token
          });
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null
    });
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  isAdmin(): boolean {
    return this.authStateSubject.value.user?.role === 'admin';
  }

  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  private setAuthState(state: AuthState): void {
    localStorage.setItem('auth', JSON.stringify(state));
    this.authStateSubject.next(state);
  }

  private loadAuthState(): void {
    const storedState = localStorage.getItem('auth');
    if (storedState) {
      try {
        const state = JSON.parse(storedState);
        this.authStateSubject.next(state);
      } catch (e) {
        localStorage.removeItem('auth');
      }
    }
  }
}
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
