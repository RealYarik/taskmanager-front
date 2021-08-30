import {Component, OnInit} from '@angular/core';
import {Task} from "../../../models/Task";
import {TokenStorageService} from "../../../services/token-storage.service";
import {TaskService} from "../../../services/task.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-task-show',
  templateUrl: './task-show.component.html',
  styleUrls: ['./task-show.component.css']
})
export class TaskShowComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  task: Task;
  taskId: number;
  router: Router;

  constructor(private tokenService: TokenStorageService,
              private taskService: TaskService,
              private route: ActivatedRoute,
              private _router: Router) {
    this.router = _router;
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    this.taskId = Number.parseInt(<string>this.route.snapshot.paramMap.get('id'));

    if (this.isLoggedIn) {
      this.taskService.getSpecificTaskForCurrentAccount(this.taskId)
        .subscribe(data => {
          this.task = data;
          this.isDataLoaded = true;
        });
    }
  }

  navigateToTask() {
    this.router.navigate(['/tasks/' + this.taskId]);
  }
}
