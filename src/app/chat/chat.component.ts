import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignaLRService } from '../services/signa-lr.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor } from '@angular/common';
import { ChatService } from './service/chat.service';
import { AuthService } from '../services/auth.service';
import { IChatMessage } from './models/chat.message';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, NgFor, DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})


export class ChatComponent implements OnInit {

  // Variables for username, current message, and chat history
  userName: string = '';
  message: string = '';
  messages: IChatMessage[] = [];

  // Injecting required services for authentication, SignalR, and chat API
  constructor(private router: Router, private authService: AuthService, private signalRService: SignaLRService, private chatService: ChatService) { }

  // Logout method: logs the user out and redirects to login page
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Lifecycle method to initialize the component
  ngOnInit() {

    // Get the username from authentication service
    this.userName = this.authService.getUserName();

    // Start SignalR connection for real-time communication
    this.signalRService.startConnection();

    // Add listener for receiving messages through SignalR
    this.signalRService.addMessageListener();

    // Subscribe to the SignalR messageReceived observable to handle new messages
    this.signalRService.messageReceived.subscribe((msg: IChatMessage) => {
      this.messages.push(msg);
    });

    // Fetch chat history from the API and display it
    this.chatService.getChatHistory().subscribe(
      (history: IChatMessage[]) => {
        this.messages = history;
        console.log(this.messages);
      },
      (error) => {
        console.error('Error getting chat history:', error);
      }
    );
  }

  // Method to send a message to the SignalR server
  sendMessage() {
    this.signalRService.sendMessage(this.userName, this.message);
    this.message = '';
  }

  // Method to clear the entire chat history by calling the chat service
  clearHistory() {
    this.chatService.clearHistory().subscribe({
      next: () => {
        console.log('Chat history cleared successfully');
        this.messages = [];
      },
      error: (error) => {
        console.error('Error while clearing chat history:', error);
      }
    });
  }
}

