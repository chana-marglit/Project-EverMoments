<<<<<<< HEAD
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-layout',
//   imports: [],
//   templateUrl: './admin-layout.component.html',
//   styleUrl: './admin-layout.component.scss'
// })
// export class AdminLayoutComponent {

// }
import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router"
import type { AuthService } from "../../core/services/auth.service"
import type { Router } from "@angular/router"

@Component({
  selector: "app-admin-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit {
  user: any
  isSidebarOpen = true

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.authState$.subscribe((state) => {
      this.user = state.user
    })
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  logout(): void {
    this.authService.logout()
  }
=======
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  imports: [],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
}
