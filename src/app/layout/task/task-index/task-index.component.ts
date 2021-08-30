import {Component, OnInit} from '@angular/core';
import {Task} from "../../../models/Task";
import {TokenStorageService} from "../../../services/token-storage.service";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.css']
})
export class TaskIndexComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  tasks: Task[];

  constructor(private tokenService: TokenStorageService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      this.taskService.getTasksForCurrentAccount()
        .subscribe(data => {
          this.tasks = data;
          this.isDataLoaded = true;
        });
    }
  }
}
