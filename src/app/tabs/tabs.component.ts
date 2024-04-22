import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  output,
} from '@angular/core';
import {
  MatTab,
  MatTabChangeEvent,
  MatTabsModule,
} from '@angular/material/tabs';
import { PendingComponent } from '../pending/pending.component';
import { TaskEndpointsComponent } from '../task-endpoints/task-endpoints.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventEmitter } from 'stream';
import { TaskServiceService } from '../task-service.service';
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule, FormsModule, CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent implements OnInit {
  @Input() selectedStatus: string = '';
  @ViewChild(TaskEndpointsComponent) taskEndpoints!: TaskEndpointsComponent;

  tasks: any[] = [];

  constructor(private taskService: TaskServiceService) {}
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: any) => {
        this.tasks = data;
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  onTabClick(event: MatTabChangeEvent): void {
    console.log('Tab clicked:', event.tab.textLabel);
    console.log(event.index);
    switch (event.index) {
      case 0:
        this.selectedStatus = '';
        break;
      case 1:
        this.selectedStatus = 'Completed';
        break;
      case 2:
        this.selectedStatus = 'Pending';
        break;
      case 3:
        this.selectedStatus = 'Cancelled';
        break;
      default:
        break;
    }
    console.log('Selected status:', this.selectedStatus);
    if (this.taskEndpoints) {
      this.taskEndpoints.applyFilter(this.selectedStatus);
    }
  }
}
