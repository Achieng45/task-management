import { Component, OnInit, input } from '@angular/core';

import { ChartModule } from 'angular-highcharts';

import { TaskServiceService } from '../../../core/services/task-service.service';
import { Chart } from 'angular-highcharts';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [ChartModule,RouterOutlet,MatToolbarModule,MatIcon],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent implements OnInit {
  tasks: any[] = [];
  piechart: Chart =new Chart();
  barchart:Chart=new Chart();
  areachart:Chart=new Chart();
  boxchart:Chart=new Chart();
  constructor(private taskservice: TaskServiceService) {}
  ngOnInit(): void {
    this.FetchTasks();
  }
  FetchTasks() {
    this.taskservice.getTasks().subscribe((data: any) => {
      this.tasks = data;
      this.generateBarChart();
      this.generatePieChart();
      this.generateAreaChart();
      this.generateWordcloud();
    });
  }
  generateBarChart() {
    const statuses = ['Completed', 'Pending', 'Cancelled'];
    const data = statuses.map((status) => ({
      name: status,
      y: this.tasks.filter((task) => task.status === status).length,
    }));
    this.barchart = new Chart({
      chart: {
        type: 'column', // Use 'column' type for vertical bars
      },
      title: {
        text: 'Task Status',
      },
      xAxis: {
        categories: statuses,
        title: {
          text: 'Task status',
        },
      },
      yAxis: {
        title: {
          text: 'Number of Tasks',
        },
      },
      series: [
        {
          type:'column',
          name: 'Tasks',
          data: data.map(item=>item.y),
        },
      ],
    });
  }

  generatePieChart() {
    const statuses = ['Completed', 'Pending', 'Cancelled'];
    const data = statuses.map((status) => ({
      name: status,
      y: this.tasks.filter((task) => task.status === status).length,
    }));
    this.piechart = new Chart({
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Task Status Distribution',
      },
      series: [
        {
          type: 'pie',
          name: 'Task Status',
          data: data,
        },
      ],
    });
  }

  generateAreaChart() {
    const statuses = ['Completed', 'Pending', 'Cancelled'];
    const data = statuses.map((status) => ({
      name: status,
      y: this.tasks.filter((task) => task.status === status).length,
    }));
    
    this.areachart = new Chart({
      chart: {
        type: 'area',
      },
      title: {
        text: 'Task Status Distribution',
      },
      xAxis:{
           categories:statuses
      },
      yAxis:{
        title:{
          text:'Number of Tasks'
        }
      },
      series: [{
        type:'area',
        name:'Tasks',
        data:data
      }]
    });
  }

  generateWordcloud(): void {
    const wordcloudData = this.tasks.map(task => ({
      name: task.name,
      weight: task.name.length // Adjust the weight as needed
    }));
    this.boxchart = new Chart( {
      chart: {
        type: 'wordcloud'
      },
      title: {
        text: 'Wordcloud of Task Names'
      },
      series: [{
        type: 'wordcloud',
        data: wordcloudData,
        tooltip: {
          headerFormat: '<em>Task</em><br/>',
          pointFormat: 'Name: {point.name}, Length: {point.value}'
        }
      }]
    });
  }
}
