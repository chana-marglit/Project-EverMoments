<<<<<<< HEAD
// import { Component, type OnInit } from "@angular/core"
// import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
// import type { Router, ActivatedRoute } from "@angular/router"

// import { finalize } from "rxjs/operators"
// import { AuthService } from "../../../core/services/auth.service"

// @Component({
//   selector: "app-login",
//   templateUrl: "./login.component.html",
//   styleUrls: ["./login.component.scss"],
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup
//   loading = false
//   error = ""
//   returnUrl = ""

//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private authService: AuthService,
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.formBuilder.group({
//       email: ["", [Validators.required, Validators.email]],
//       password: ["", Validators.required],
//     })

//     // קבלת URL להחזרה לאחר התחברות מוצלחת
//     this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/dashboard"
//   }

//   onSubmit(): void {
//     if (this.loginForm.invalid) {
//       return
//     }

//     this.loading = true
//     this.error = ""

//     this.authService
//       .login(this.loginForm.value)
//       .pipe(finalize(() => (this.loading = false)))
//       .subscribe({
//         next: () => {
//           this.router.navigate([this.returnUrl])
//         },
//         error: (err) => {
//           this.error = err.error?.message || "התחברות נכשלה. אנא בדוק את פרטי ההתחברות שלך."
//         },
//       })
//   }
// }
import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import type { Router, ActivatedRoute } from "@angular/router"
import { CommonModule } from "@angular/common"
import type { AuthService } from "../../../core/services/auth.service"
import { finalize } from "rxjs/operators"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
=======
import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { Router, ActivatedRoute } from "@angular/router"

import { finalize } from "rxjs/operators"
import { AuthService } from "../../../core/services/auth.service"

@Component({
  selector: "app-login",
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  loading = false
  error = ""
  returnUrl = ""

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    })

    // קבלת URL להחזרה לאחר התחברות מוצלחת
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/dashboard"
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return
    }

    this.loading = true
    this.error = ""

    this.authService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl])
        },
<<<<<<< HEAD
        error: (err: any) => {
=======
        error: (err) => {
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
          this.error = err.error?.message || "התחברות נכשלה. אנא בדוק את פרטי ההתחברות שלך."
        },
      })
  }
}
