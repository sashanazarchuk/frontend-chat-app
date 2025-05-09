import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './services/auth.guard';

// Routing to different components
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
