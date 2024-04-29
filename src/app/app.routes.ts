import { Routes } from '@angular/router';
import { TaskEndpointsComponent } from './task-endpoints/task-endpoints.component';
import { AnalyticsComponent } from './analytics/analytics.component';


export const routes: Routes = [
 {path:'',component:TaskEndpointsComponent},
   {path:'charts',component:AnalyticsComponent},
   
   // {path:'taskbar',component:TaskbarComponent}
   
];
