import { Component } from '@angular/core';
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.css'
})
export class PendingComponent {

  pendingTasks: any[] = [];
  filteredPendingTasks: any[] = [];
  selectedStatus: string = 'Pending';

  constructor(private taskService: TaskServiceService) { }

  ngOnInit(): void {
    this.loadPendingTasks();
  }

  loadPendingTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: any) => {
        this.pendingTasks = data;
        this.applyFilter();
      },
      (error: any) => {
        console.error('Error fetching pending tasks:', error);
      }
    );
  }

  applyFilter(): void {
    if (this.selectedStatus === 'Pending') {
      this.filteredPendingTasks = this.pendingTasks.filter(task => task.status === this.selectedStatus);
    } else {
      this.filteredPendingTasks = [];
    }
  }
}
