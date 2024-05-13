import { Routes } from '@angular/router';
import { TaskEndpointsComponent } from './task-endpoints/task-endpoints.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {path:'',component:TaskbarComponent},
   {path:'charts',component:AnalyticsComponent,canActivate: [authGuard] },
   {path:'endpoints',component:TaskEndpointsComponent},
   {path:'auth',component:AuthGuardComponent}
   
   // {path:'taskbar',component:TaskbarComponent}
   
];
