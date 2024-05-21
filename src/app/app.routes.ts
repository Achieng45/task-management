import { Routes } from '@angular/router';
import { TaskEndpointsComponent } from './task-endpoints/task-endpoints.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AppComponent } from './app.component';
import { TaskbarComponent } from './taskbar/taskbar.component';


export const routes: Routes = [
  {path:'',component:TaskbarComponent},
   {path:'charts',component:AnalyticsComponent},
   {path:'endpoints',component:TaskEndpointsComponent},
  {path:'dashboard',loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)}
   
];
