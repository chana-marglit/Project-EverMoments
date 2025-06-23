import { bootstrapApplication } from "@angular/platform-browser"
import { provideRouter } from "@angular/router"
import { provideHttpClient, withInterceptors } from "@angular/common/http"
import { AppComponent } from "./app/app.component"
import { routes } from "./app/app.routes"
import { provideAnimations } from "@angular/platform-browser/animations"
import { httpErrorInterceptor } from "./app/core/interceptors/http-error.interceptor"
import { authInterceptor } from "./app/core/interceptors/auth.interceptor"

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor, httpErrorInterceptor])),
  ],
}).catch((err) => console.error(err))
