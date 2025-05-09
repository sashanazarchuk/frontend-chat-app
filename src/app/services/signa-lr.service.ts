import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { IChatMessage } from '../chat/models/chat.message';

@Injectable({
  providedIn: 'root'
})

export class SignaLRService {

  private hubConnection!: signalR.HubConnection; // SignalR connection instance
  public messageReceived = new Subject<IChatMessage>(); // Observable to emit received messages

  constructor() { }

  // Method to start a SignalR connection to the chat hub
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://chat-server-e9a7fnh4d5anhpcc.canadacentral-01.azurewebsites.net/chathub') // Set the SignalR hub URL
      .build(); // Build the connection

    // Start the connection and log success or error
    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection started'))
      .catch(err => console.log('Error establishing SignalR connection: ' + err));
  }


  // Method to listen for incoming messages from the hub
  public addMessageListener() {

    // Listen to the 'ReceiveMessage' event from SignalR
    this.hubConnection.on('ReceiveMessage', (data: any) => {

      // Create a chat message object from the received data
      const chatMessage: IChatMessage = {
        userName: data.userName,
        message: data.message,
        time: data.time,
        sentiment: {
          label: data.sentiment.label,
          emoji: data.sentiment.emoji
        }
      };
      // Emit the received message to subscribers
      this.messageReceived.next(chatMessage);
    });
  }

  // Method to send a message to the SignalR hubА
  public sendMessage(user: string, message: string) {
    this.hubConnection.invoke('SendMessage', user, message) // Invoke the SendMessage method on the hub
      .catch(err => console.error('Error sending message:', err)); // Log any errors
  }
}