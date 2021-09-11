import {Component, Inject, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {SolutionService} from "../../services/solution.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Solution} from "../../models/Solution";
import {DOCUMENT} from "@angular/common";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SolutionNewComponent} from "./solution-new/solution-new.component";
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/Task";

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {

  taskId: number;
  isLoggedIn = false;
  isDataLoaded = false;
  isTaskLoaded = false;
  solutions: Solution[];
  task: Task;

  constructor(
    @Inject(DOCUMENT) private document,
    private tokenService: TokenStorageService,
    private solutionService: SolutionService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    this.taskId = Number.parseInt(<string>this.route.snapshot.paramMap.get('id'));


    if (this.isLoggedIn) {
      this.solutionService.getSolutionsBySpecificTaskId(this.taskId)
        .subscribe(data => {
          this.solutions = data;
          this.isDataLoaded = true;
        });

      this.taskService.getSpecificTask(this.taskId)
        .subscribe(data => {
          this.task = data;
          this.isTaskLoaded = true;
        });
    }
  }

  ngOnDestroy() {
    // @ts-ignore
    document.getElementById('solutions').remove();
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = this.taskId;

    this.dialog.open(SolutionNewComponent, dialogConfig);
  }

}
