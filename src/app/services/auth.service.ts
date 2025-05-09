import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Method to log the user in by saving token and username to session storage
  login(token: string, userName: string) {
    sessionStorage.setItem('token', token); // Save the token in sessionStorage
    sessionStorage.setItem('userName', userName); // Save the username in sessionStorage
  }

  // Method to retrieve the username from session storage
  getUserName(): string {
    return sessionStorage.getItem('userName') || ''; // Return the username or an empty string if not found
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token'); // Return true if token exists, false otherwise
  }

  // Method to log the user out by removing token and username from session storage
  logout() {
    sessionStorage.removeItem('token');  // Remove the token from sessionStorage
    sessionStorage.removeItem('userName'); // Remove the username from sessionStorage
  }
}