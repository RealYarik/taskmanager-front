import {Component, OnInit} from '@angular/core';
import {Task} from "../../../models/Task";
import {TokenStorageService} from "../../../services/token-storage.service";
import {TaskService} from "../../../services/task.service";
import {TimeService} from "../../../services/time.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TaskNewComponent} from "../task-new/task-new.component";
import {AccountService} from "../../../services/account.service";
import {Account} from "../../../models/Account";

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.css']
})
export class TaskIndexComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  isRolesLoaded = false;
  isNoData = true;
  tasks: Task[];
  logins: string[];
  account: Account;
  roles: string[];

  constructor(private tokenService: TokenStorageService,
              private taskService: TaskService,
              private accountService: AccountService,
              public timeService: TimeService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if (this.isLoggedIn) {
      this.taskService.getTasksForCurrentAccount()
        .subscribe(data => {
          this.tasks = data;
          this.isDataLoaded = true;
          if (data.length == 0) {
            this.isNoData = false;
          }
        });

      this.accountService.getCurrentAccount().subscribe(data => {
        this.roles = data.roles;
        this.isRolesLoaded = true;
      });
    }
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';

    this.dialog.open(TaskNewComponent, dialogConfig);
  }
}
