import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TaskEndpointsComponent } from "../task-endpoints/task-endpoints.component";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [TaskEndpointsComponent,MatSidenavModule,MatToolbar,MatIconModule,MatSidenav]
})
export class NavbarComponent {
  showfilterdrawer:boolean=false;
  @Input() showFilter: boolean=false;
  @Output() toggle = new EventEmitter<void>();

  togglefilter() {
    this.toggle.emit();
  }

  
}
