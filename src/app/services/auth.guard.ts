import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  // Constructor injection of dependencies for authentication service and routing
  constructor(private authService: AuthService, private router: Router) { }

  // CanActivate method checks if the user is authenticated
  canActivate(): boolean {

    // If the user is logged in, allow access to the route
    if (this.authService.isLoggedIn()) {
      return true;
    }
    // If not logged in, redirect to login page and deny access to the route
    this.router.navigate(['/login']);
    return false;
  }
}