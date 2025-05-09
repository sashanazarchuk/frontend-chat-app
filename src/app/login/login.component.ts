import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userName = '';

  // Constructor injection of dependencies for routing and authentication service
  constructor(private router: Router, private authService: AuthService) { }

  // Method to handle the login process
  login() {

    // Check if the user has entered a username
    if (this.userName) {
      // Call the login method of the AuthService with a dummy token and username
      this.authService.login('dummyToken', this.userName);
      // After login, navigate to the chat page
      this.router.navigate(['/chat']);
    }
  }
}