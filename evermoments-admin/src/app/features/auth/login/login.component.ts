import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { Router, ActivatedRoute } from "@angular/router"

import { finalize } from "rxjs/operators"
import { AuthService } from "../../../core/services/auth.service"

@Component({
  selector: "app-login",
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
        error: (err) => {
          this.error = err.error?.message || "התחברות נכשלה. אנא בדוק את פרטי ההתחברות שלך."
        },
      })
  }
}
