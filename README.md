# Real-Time Chat UI (Angular)

This is the frontend part of the **Real-Time Chat Application with Sentiment Analysis** built using **Angular**.  
It connects to the ASP.NET Core backend hosted on Azure and supports real-time messaging using Azure SignalR Service.  
Sentiment analysis results (positive/negative/neutral) are visualized with emojis and label.

## 🌐 Live Demo

[Click here to open deployed Angular app](https://salmon-sand-05cbce20f.6.azurestaticapps.net)  

## 🧩 Features

- Real-time chat using Azure SignalR
- Basic login using Session Storage (no authentication)
- Messages by sentiment:
  - 😊 Positive
  - 😐 Neutral
  - 😠 Negative

## 📦 Technologies Used

- Angular 19
- Tailwind CSS
- Azure SignalR (via backend)
- Azure Cognitive Services (for sentiment, via backend)

## 🧪 Local Development

### Prerequisites

- Node.js & npm
- Angular CLI

### Run Locally

```bash
npm install
ng serve
