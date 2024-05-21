import { Routes } from '@angular/router';
import { TaskEndpointsComponent } from './features/Task-management/task-endpoints/task-endpoints.component';
import { AnalyticsComponent } from './features/Task-management/analytics/analytics.component';
import { AppComponent } from './app.component';
import { TaskbarComponent } from './features/Task-management/taskbar/taskbar.component';


export const routes: Routes = [
  {path:'',component:TaskbarComponent},
   {path:'charts',component:AnalyticsComponent},
   {path:'endpoints',component:TaskEndpointsComponent},
  {path:'dashboard',loadChildren:()=>import('./features/Task-management/dashboard.module').then(m=>m.DashboardModule)}
   
];
