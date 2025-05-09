import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IChatMessage } from '../models/chat.message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Base URL for the API endpoints
  private BaseUrl = "https://chat-server-e9a7fnh4d5anhpcc.canadacentral-01.azurewebsites.net";

  constructor(private http: HttpClient) { }

  // Method to get the full chat history from the API
  getChatHistory(): Observable<IChatMessage[]> {
    // Sending GET request to the endpoint and handling any errors
    return this.http.get<IChatMessage[]>(`${this.BaseUrl}/api/Chat/history`).pipe(
      catchError(error => {
        console.error('Error fetching chat history:', error);
        return throwError(error);
      })
    );
  }

  // Method to clear the entire chat history from the API
  clearHistory(): Observable<void> {
    // Sending DELETE request to the endpoint and handling any errors
    return this.http.delete<void>(`${this.BaseUrl}/api/Chat/delete/history`).pipe(
      catchError(error => {
        console.error('Error deleting chat history.', error);
        return throwError(error);
      })
    );
  }
}